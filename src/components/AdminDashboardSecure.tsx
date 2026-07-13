import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { useAdminAuth } from "../hooks/useAdminAuth";
import SecureAdminLogin from "./SecureAdminLogin";
import { 
  LogOut, Search, Clock, CheckCircle, AlertTriangle, FileText, Download, 
  Trash2, Bookmark, Calendar, RefreshCw, Shield, Users, TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";

export default function AdminDashboardSecure() {
  const { user, isAdmin, loading: authLoading, error: authError } = useAdminAuth();
  
  // Firestore inquiries states
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  
  // Selected inquiry for details
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [updatingTicket, setUpdatingTicket] = useState<string | null>(null);

  // Real-time Firestore sync
  useEffect(() => {
    if (!user || !isAdmin) return;
    
    setLoadingInquiries(true);

    const qInquiries = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
      const inquiriesList: any[] = [];
      snapshot.forEach((doc) => {
        inquiriesList.push({ 
          id: doc.id, 
          ...doc.data(),
          collectionType: 'inquiry'
        });
      });

      const qCallbacks = query(collection(db, "callbacks"), orderBy("createdAt", "desc"));
      const unsubCallbacks = onSnapshot(qCallbacks, (snapshot) => {
        const callbacksList: any[] = [];
        snapshot.forEach((doc) => {
          callbacksList.push({ 
            id: doc.id, 
            ...doc.data(),
            collectionType: 'callback'
          });
        });

        const merged = [...inquiriesList, ...callbacksList].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });

        setInquiries(merged);
        setLoadingInquiries(false);
      });

      return () => unsubCallbacks();
    });

    return () => unsubInquiries();
  }, [user, isAdmin]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSelectedInquiry(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (inquiry: any, nextStatus: string) => {
    setUpdatingTicket(inquiry.id);
    try {
      const collectionName = inquiry.collectionType === 'callback' ? 'callbacks' : 'inquiries';
      const docRef = doc(db, collectionName, inquiry.id);
      await updateDoc(docRef, {
        status: nextStatus,
        updatedAt: new Date().toISOString()
      });

      if (selectedInquiry && selectedInquiry.id === inquiry.id) {
        setSelectedInquiry((prev: any) => ({ ...prev, status: nextStatus }));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingTicket(null);
    }
  };

  const handleDeleteInquiry = async (inquiry: any) => {
    if (!window.confirm(`Are you sure you want to delete this ${inquiry.collectionType}?`)) return;
    
    try {
      const collectionName = inquiry.collectionType === 'callback' ? 'callbacks' : 'inquiries';
      await deleteDoc(doc(db, collectionName, inquiry.id));
      if (selectedInquiry?.id === inquiry.id) {
        setSelectedInquiry(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Statistics
  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter(i => i.status === "Pending" || !i.status).length;
  const activeCount = inquiries.filter(i => i.status === "Work In Progress" || i.status === "Meeting Scheduled").length;
  const completedCount = inquiries.filter(i => i.status === "Project Completed").length;

  // Filtering
  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = 
      (i.fullName || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (i.ticketNo || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (i.email || "").toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    const matchesType = typeFilter === "All" || 
                       (typeFilter === "Inquiries" && i.collectionType === "inquiry") ||
                       (typeFilter === "Callbacks" && i.collectionType === "callback");
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Ticket", "Name", "Email", "Phone", "Status", "Date", "Type"];
    const rows = filteredInquiries.map(inq => [
      inq.ticketNo || inq.id,
      inq.fullName || "",
      inq.email || "",
      inq.phone || "",
      inq.status || "Pending",
      inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "",
      inq.collectionType || "inquiry"
    ]);

    const csvString = [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\r\n");
    const blob = new Blob(["\ufeff" + csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MemoirTale_Data_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D1B36] via-[#1B101E] to-[#2D1B36] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-[#D4AF37] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  // Not logged in or not admin
  if (!user || !isAdmin) {
    return <SecureAdminLogin onLoginSuccess={() => {}} />;
  }

  // Auth error
  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D1B36] via-[#1B101E] to-[#2D1B36] flex items-center justify-center p-4">
        <div className="bg-[#1B101E] border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-bold text-white mb-2">Access Denied</h2>
          <p className="text-red-200 mb-6">{authError}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Main Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0F0C09] text-white font-sans">
      
      {/* Header */}
      <header className="bg-[#1B101E] border-b border-[#D4AF37]/20 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-white">MemoirTale</h1>
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-xs text-white/60">Logged in as</p>
              <p className="text-xs font-mono text-[#D4AF37] font-bold">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#2D1B36] hover:bg-red-900/50 border border-white/10 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="bg-[#1B101E]/50 border-b border-[#D4AF37]/10 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#2D1B36] border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-[#D4AF37]" />
              <p className="text-xs text-white/60 uppercase tracking-wider">Total</p>
            </div>
            <p className="text-2xl font-bold text-white">{totalCount}</p>
          </div>

          <div className="bg-[#2D1B36] border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              <p className="text-xs text-white/60 uppercase tracking-wider">Pending</p>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
          </div>

          <div className="bg-[#2D1B36] border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <p className="text-xs text-white/60 uppercase tracking-wider">Active</p>
            </div>
            <p className="text-2xl font-bold text-blue-400">{activeCount}</p>
          </div>

          <div className="bg-[#2D1B36] border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <p className="text-xs text-white/60 uppercase tracking-wider">Completed</p>
            </div>
            <p className="text-2xl font-bold text-green-400">{completedCount}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Filters & List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="bg-[#1B101E] border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 bg-[#2D1B36] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/60"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 mb-4">
              {["All", "Inquiries", "Callbacks"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    typeFilter === type
                      ? "bg-[#D4AF37] text-[#1A1410]"
                      : "bg-[#2D1B36] text-white/60 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Work In Progress", "Project Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                    statusFilter === status
                      ? "bg-[#D4AF37] text-[#1A1410]"
                      : "bg-[#2D1B36] text-white/60 border border-white/10 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Export */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={exportToCSV}
                className="w-full px-4 py-2 bg-[#2D1B36] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="h-4 w-4" />
                Export CSV ({filteredInquiries.length})
              </button>
            </div>
          </div>

          {/* List */}
          <div className="bg-[#1B101E] border border-[#D4AF37]/20 rounded-xl p-4 max-h-[600px] overflow-y-auto">
            <h3 className="font-bold text-sm mb-4 text-[#D4AF37]">Submissions ({filteredInquiries.length})</h3>
            <div className="space-y-2">
              {loadingInquiries ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-6 w-6 text-[#D4AF37] animate-spin mx-auto" />
                </div>
              ) : filteredInquiries.length === 0 ? (
                <p className="text-white/40 text-sm text-center py-8">No submissions found</p>
              ) : (
                filteredInquiries.map((inq) => (
                  <button
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedInquiry?.id === inq.id
                        ? "bg-[#D4AF37]/20 border-2 border-[#D4AF37]"
                        : "bg-[#2D1B36] border border-white/10 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <p className="font-bold text-sm text-white truncate">{inq.fullName || "No name"}</p>
                    <p className="text-xs text-white/60 truncate">{inq.email || inq.phone}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        inq.collectionType === 'callback' 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {inq.collectionType === 'callback' ? '📞 Call' : '📋 Inquiry'}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <div className="bg-[#1B101E] border border-[#D4AF37]/20 rounded-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-1">{selectedInquiry.fullName}</h2>
                  <p className="text-sm text-[#D4AF37]">
                    {selectedInquiry.collectionType === 'callback' ? '📞 Callback Request' : '📋 Contact Inquiry'}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteInquiry(selectedInquiry)}
                  className="px-3 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 rounded-lg text-red-300 text-sm font-bold flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Email */}
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider">Email Address</label>
                  <p className="text-white">{selectedInquiry.email || 'N/A'}</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider">Phone Number</label>
                  <p className="text-white">{selectedInquiry.phone || 'N/A'}</p>
                </div>

                {/* City / State */}
                {selectedInquiry.cityState && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">City / State</label>
                    <p className="text-white">{selectedInquiry.cityState}</p>
                  </div>
                )}

                {/* Service */}
                {selectedInquiry.service && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Memoir Service Interested In</label>
                    <p className="text-white font-semibold text-[#D4AF37]">{selectedInquiry.service}</p>
                  </div>
                )}

                {/* About Whom */}
                {selectedInquiry.aboutWhom && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">About Whom Is This Book?</label>
                    <p className="text-white">{selectedInquiry.aboutWhom}</p>
                  </div>
                )}

                {/* Brief Story */}
                {selectedInquiry.briefStory && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Brief Outline / Stories to Preserve</label>
                    <p className="text-white bg-[#2D1B36] border border-white/10 rounded-lg p-4 whitespace-pre-wrap">
                      {selectedInquiry.briefStory}
                    </p>
                  </div>
                )}

                {/* Preferred Time */}
                {selectedInquiry.preferredTime && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Preferred Contact Time</label>
                    <p className="text-white">{selectedInquiry.preferredTime}</p>
                  </div>
                )}

                {/* Callback Time (for callback requests) */}
                {selectedInquiry.callbackTime && !selectedInquiry.preferredTime && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Callback Time</label>
                    <p className="text-white">{selectedInquiry.callbackTime}</p>
                  </div>
                )}

                {/* Message (for callback requests) */}
                {selectedInquiry.message && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Message</label>
                    <p className="text-white bg-[#2D1B36] border border-white/10 rounded-lg p-4">
                      {selectedInquiry.message}
                    </p>
                  </div>
                )}

                {/* Attachments */}
                {selectedInquiry.attachments && selectedInquiry.attachments.length > 0 && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider block mb-2">
                      Attached Files ({selectedInquiry.attachments.length})
                    </label>
                    <div className="space-y-2">
                      {selectedInquiry.attachments.map((file: any, idx: number) => (
                        <div key={idx} className="bg-[#2D1B36] border border-white/10 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-[#D4AF37]" />
                            <div>
                              <p className="text-white text-sm font-semibold">{file.name}</p>
                              <p className="text-white/60 text-xs">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          {file.url && (
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 rounded-lg text-[#D4AF37] text-xs font-bold transition-all"
                            >
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ticket Number */}
                {selectedInquiry.ticketNo && (
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Ticket Number</label>
                    <p className="text-[#D4AF37] font-mono font-bold">{selectedInquiry.ticketNo}</p>
                  </div>
                )}

                {/* Submitted Date */}
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider">Submitted</label>
                  <p className="text-white">
                    {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <label className="text-xs text-white/60 uppercase tracking-wider block mb-3">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {["Pending", "Meeting Scheduled", "Work In Progress", "Project Completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedInquiry, status)}
                      disabled={updatingTicket === selectedInquiry.id}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        selectedInquiry.status === status
                          ? "bg-[#D4AF37] text-[#1A1410]"
                          : "bg-[#2D1B36] text-white hover:bg-[#D4AF37]/20 border border-white/10"
                      }`}
                    >
                      {updatingTicket === selectedInquiry.id ? "..." : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1B101E] border border-[#D4AF37]/20 rounded-xl p-12 text-center">
              <Bookmark className="h-16 w-16 text-[#D4AF37]/30 mx-auto mb-4" />
              <p className="text-white/40">Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
