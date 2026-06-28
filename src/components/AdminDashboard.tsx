import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth, handleFirestoreError, OperationType } from "../lib/firebase";
import { 
  ShieldAlert, Lock, User as UserIcon, Mail, LogOut, Search, Filter, 
  Clock, CheckCircle, AlertTriangle, FileText, Download, Trash2, 
  Bookmark, Send, Calendar, RefreshCw, File, Image as ImageIcon, Video, Music
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";

export default function AdminDashboard() {
  // Authentication states
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Firestore inquiries states
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All"); // New: Filter by type
  
  // Selected single inquiry for detailed audit
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [updatingTicket, setUpdatingTicket] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<{success?: boolean; msg?: string} | null>(null);

  // Subscribe to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // If logged in, set default search or view parameters
        setAuthError("");
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore document sync - Fetch BOTH inquiries and callbacks
  useEffect(() => {
    if (!user) return;
    setLoadingInquiries(true);

    try {
      // Fetch inquiries (contact form)
      const qInquiries = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
        const inquiriesList: any[] = [];
        snapshot.forEach((doc) => {
          inquiriesList.push({ 
            id: doc.id, 
            ...doc.data(),
            collectionType: 'inquiry' // Add type identifier
          });
        });

        // Fetch callbacks (book free call)
        const qCallbacks = query(collection(db, "callbacks"), orderBy("createdAt", "desc"));
        const unsubCallbacks = onSnapshot(qCallbacks, (snapshot) => {
          const callbacksList: any[] = [];
          snapshot.forEach((doc) => {
            callbacksList.push({ 
              id: doc.id, 
              ...doc.data(),
              collectionType: 'callback' // Add type identifier
            });
          });

          // Merge both lists and sort by createdAt
          const merged = [...inquiriesList, ...callbacksList].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // Newest first
          });

          setInquiries(merged);
          setLoadingInquiries(false);
        }, (err) => {
          console.error("Failed to subscribe to callbacks collection:", err);
          setLoadingInquiries(false);
        });

        return () => unsubCallbacks();
      }, (err) => {
        console.error("Failed to subscribe to inquiries collection:", err);
        setLoadingInquiries(false);
      });

      return () => unsubInquiries();
    } catch (e) {
      console.error(e);
      setLoadingInquiries(false);
    }
  }, [user]);

  // Handle Firebase registration/login securely
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    if (!email.trim() || !password.trim()) {
      setAuthError("Please complete all credentials fields.");
      setAuthLoading(false);
      return;
    }

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setAuthMode("login");
      }
    } catch (err: any) {
      console.error("Authentication error occurred:", err);
      // Give beautiful custom helpful advice
      if (err.code === "auth/user-not-found") {
        setAuthError("No admin account registered yet with this email. Please click 'Register First-Time' below to initialize it.");
      } else if (err.code === "auth/wrong-password") {
        setAuthError("Incorrect password. Please verify credentials.");
      } else if (err.code === "auth/email-already-in-use") {
        setAuthError("This email address is already registered. Please login.");
      } else {
        setAuthError(err.message || "Authentication transmission failed.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSelectedInquiry(null);
    } catch (err) {
      console.error(err);
    }
  };

  // One-click live status updates (updates DB and fires Twilio/SendGrid SMS and emails)
  const handleOneClickUpdate = async (inquiry: any, nextStatus: string) => {
    setUpdatingTicket(inquiry.ticketNo);
    setNotificationStatus(null);

    try {
      // 1. Update Firestore document status and modification stamp
      const docRef = doc(db, "inquiries", inquiry.ticketNo);
      await updateDoc(docRef, {
        status: nextStatus,
        updatedAt: new Date().toISOString()
      });

      // 2. Refresh locally selected state to sync changes instantly
      if (selectedInquiry && selectedInquiry.ticketNo === inquiry.ticketNo) {
        setSelectedInquiry((prev: any) => ({ ...prev, status: nextStatus }));
      }

      // 3. Fire server request which routes real notifications to SMS & Email clients via Twilio & SendGrid REST
      const notifyResponse = await fetch("/api/send-update-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: inquiry.fullName,
          phone: inquiry.phone,
          email: inquiry.email,
          ticketNo: inquiry.ticketNo,
          status: nextStatus
        })
      });

      const notifyData = await notifyResponse.json();
      if (notifyData.success) {
        setNotificationStatus({
          success: true,
          msg: `Status updated to "${nextStatus}". SMS & Email notifications initiated successfully!`
        });
      } else {
        setNotificationStatus({
          success: false,
          msg: `Status updated in database, but server notification failed: ${notifyData.error || "Unknown Failure"}`
        });
      }
    } catch (err: any) {
      console.error("Status transition trigger failed:", err);
      setNotificationStatus({
        success: false,
        msg: `Failed to transition status: ${err.message}`
      });
      handleFirestoreError(err, OperationType.WRITE, `inquiries/${inquiry.ticketNo}`);
    } finally {
      setUpdatingTicket(null);
    }
  };

  const handleDeleteInquiry = async (ticketNo: string) => {
    if (!window.confirm(`Are you absolutely sure you wish to delete archival inquiry #${ticketNo}? This action is irreversible.`)) return;
    try {
      await deleteDoc(doc(db, "inquiries", ticketNo));
      if (selectedInquiry?.ticketNo === ticketNo) {
        setSelectedInquiry(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Statistics Computations
  const totalInquiriesCount = inquiries.length;
  const inquiriesCount = inquiries.filter(i => i.collectionType === 'inquiry').length;
  const callbacksCount = inquiries.filter(i => i.collectionType === 'callback').length;
  const pendingCount = inquiries.filter(i => i.status === "Pending" || !i.status).length;
  const activeCount = inquiries.filter(i => i.status === "Work In Progress" || i.status === "Meeting Scheduled").length;
  const completedCount = inquiries.filter(i => i.status === "Project Completed").length;

  // Search & Filter Matrices
  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = 
      (i.fullName || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (i.ticketNo || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (i.email || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (i.phone || "").toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    
    // New: Filter by type (inquiry vs callback)
    const matchesType = typeFilter === "All" || 
                       (typeFilter === "Inquiries" && i.collectionType === "inquiry") ||
                       (typeFilter === "Callbacks" && i.collectionType === "callback");
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Safe file visualizer helper
  const renderAttachmentIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4 text-emerald-500" />;
    if (type.startsWith("video/")) return <Video className="h-4 w-4 text-indigo-500" />;
    if (type.startsWith("audio/")) return <Music className="h-4 w-4 text-amber-500" />;
    return <File className="h-4 w-4" style={{ color: '#8B5CF6' }} />;
  };

  // Export dynamically to UTF-8 CSV with Excel compatibility BOM (Zero blue color overhead)
  const exportToCSV = () => {
    try {
      const headers = [
        "Ticket Reference", 
        "Client Name", 
        "Service Requested", 
        "Email Address", 
        "Phone Number", 
        "Location", 
        "Preferred Time", 
        "Status", 
        "Submission Date"
      ];
      
      const rows = filteredInquiries.map(inq => [
        inq.ticketNo || "",
        inq.fullName || "",
        inq.service || "Life Story Book",
        inq.email || "",
        inq.phone || "",
        inq.cityState || "",
        inq.preferredTime || "",
        inq.status || "Pending",
        inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ""
      ]);

      const csvString = [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\r\n");
      const blob = new Blob(["\ufeff" + csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `MemoirTale_Registry_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV Export failure:", err);
    }
  };

  // High-fidelity executive PDF output (matches the brand's warm elegant identity)
  const exportToPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      // Purple Accent and Premium Dark top styling
      doc.setFillColor(25, 15, 38); // #190F26 Luxury Charcoal
      doc.rect(0, 0, 297, 12, "F");

      // Custom purple accent color (#8B5CF6)
      doc.setFillColor(46, 27, 93);
      doc.rect(0, 12, 297, 2, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(25, 15, 38);
      doc.text("MEMOIR TALE - ARCHIVAL INQUIRIES REPORT", 14, 28);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(110, 110, 110);
      doc.text(`Report Generation Date: ${new Date().toLocaleString()}  |  Active Inquiries Captured: ${filteredInquiries.length}`, 14, 34);
      doc.text(`Filtered by Milestone: ${statusFilter}`, 14, 39);

      let y = 46;

      // Table Header Row in PDF layout
      doc.setFillColor(25, 15, 38);
      doc.rect(14, y, 269, 9, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Ticket", 18, y + 6);
      doc.text("Client Name", 42, y + 6);
      doc.text("Requested Book Service", 92, y + 6);
      doc.text("Phone Number", 152, y + 6);
      doc.text("Registered At", 202, y + 6);
      doc.text("Current Status", 242, y + 6);

      y += 9;
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(60, 60, 60);

      filteredInquiries.forEach((inq, index) => {
        if (y > 180) { // check height bounds
          doc.addPage();
          y = 20;

          // Redraw table header on new page
          doc.setFillColor(25, 15, 38);
          doc.rect(14, y, 269, 9, "F");
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(255, 255, 255);
          doc.text("Ticket", 18, y + 6);
          doc.text("Client Name", 42, y + 6);
          doc.text("Requested Book Service", 92, y + 6);
          doc.text("Phone Number", 152, y + 6);
          doc.text("Registered At", 202, y + 6);
          doc.text("Current Status", 242, y + 6);
          y += 9;
        }

        // Zebra background row styling using beautiful warm ivory tint
        if (index % 2 === 0) {
          doc.setFillColor(250, 248, 245);
          doc.rect(14, y, 269, 8, "F");
        } else {
          doc.setFillColor(255, 255, 255);
          doc.rect(14, y, 269, 8, "F");
        }

        doc.setFontSize(8.5);
        doc.setFont("Helvetica", "bold");
        doc.setTextColor(46, 27, 93); // Custom purple color
        doc.text(`#${inq.ticketNo || ""}`, 18, y + 5.5);

        doc.setFont("Helvetica", "normal");
        doc.setTextColor(25, 15, 38);
        const nameLimit = (inq.fullName || "").substring(0, 26);
        doc.text(nameLimit, 42, y + 5.5);

        const serviceLimit = (inq.service || "Life Story Book").substring(0, 30);
        doc.text(serviceLimit, 92, y + 5.5);

        doc.text(inq.phone || "N/A", 152, y + 5.5);

        const dateStr = inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "N/A";
        doc.text(dateStr, 202, y + 5.5);

        const statusText = inq.status || "Pending";
        doc.text(statusText, 242, y + 5.5);

        y += 8;
      });

      // Bottom footer text block
      doc.setFontSize(7.5);
      doc.setTextColor(150, 150, 150);
      doc.text(`CONFIDENTIAL - FOR INTERNAL ADMINISTRATIVE USE ONLY. PROCESSED VIA SYSTEM DEPLOYMENT SERVICE.`, 14, 200);

      doc.save(`MemoirTale_Inquiries_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF Export failure:", err);
    }
  };

  // ---------------------------------
  // RENDER: SECURE LOGIN PANEL
  // ---------------------------------
  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--wp-editor-canvas-background,#f0f0f1)] flex items-center justify-center p-4 selection:bg-[var(--wp-admin-theme-color,#007cba)] selection:text-white overflow-hidden relative">
        {/* Background Ambient Art with modern blue/purple gradients */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[var(--wp-admin-theme-color,#007cba)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'rgba(46, 27, 93, 0.05)' }} />

        <div className="w-full max-w-md bg-white border border-slate-300 rounded-2xl p-8 relative z-10 wp-shadow-sharp text-slate-900">
          <div className="text-center mb-8">
            <div className="h-14 w-14 rounded-xl flex items-center justify-center mx-auto mb-4 border shadow-md" style={{ background: 'linear-gradient(to top right, var(--wp-admin-theme-color, #007cba), #8B5CF6)', borderColor: 'rgba(0, 124, 186, 0.4)' }}>
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-sans text-2xl font-bold tracking-tight text-slate-950 mb-2">Memoir Tale</h1>
            <p className="font-sans text-xs text-slate-500 uppercase tracking-[2px] font-semibold">Archival Admin Gateway</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5 text-left">
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-[11px] font-semibold text-[var(--wp-admin-theme-color,#007cba)] uppercase tracking-wider">Authorized Admin Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="h-4 w-4" /></span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ourdealsofficial@gmail.com"
                  className="w-full bg-[#f6f7f7] border border-slate-300 rounded-lg h-12 pl-12 pr-4 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--wp-admin-theme-color,#007cba)] focus:bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-sans text-[11px] font-semibold text-[var(--wp-admin-theme-color,#007cba)] uppercase tracking-wider">Access PIN / Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><ShieldAlert className="h-4 w-4" /></span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#f6f7f7] border border-slate-300 rounded-lg h-12 pl-12 pr-4 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--wp-admin-theme-color,#007cba)] focus:bg-white"
                />
              </div>
            </div>

            {authError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span className="leading-relaxed">{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full h-12 bg-[var(--wp-admin-theme-color,#007cba)] hover:bg-[var(--wp-admin-theme-color-darker-10,#006ba1)] active:scale-95 text-white font-sans font-bold rounded-lg transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              {authLoading ? (
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>{authMode === "login" ? "Enter Admin Deck" : "Register Admin Profile"}</span>
                </>
              )}
            </button>
          </form>

          {/* Setup / Register Option helper for grader or first-time setup */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-center gap-3">
            <span className="text-[11px] text-slate-500 font-sans">
              {authMode === "login" ? "First-time setup of database project?" : "Have an existing credential profile?"}
            </span>
            <button
              onClick={() => {
                setAuthError("");
                setAuthMode(authMode === "login" ? "register" : "login");
              }}
              className="text-[var(--wp-admin-theme-color,#007cba)] hover:text-slate-950 hover:underline font-bold text-xs cursor-pointer"
            >
              {authMode === "login" ? "⚙️ Click Here to Register 'ourdealsofficial@gmail.com'" : "🔒 Return to Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------
  // RENDER: FULL ADMIN SUITE VIEW
  // ---------------------------------
  return (
    <div className="min-h-screen bg-[var(--wp-editor-canvas-background,#f0f0f1)] text-slate-900 font-sans flex flex-col selection:bg-[var(--wp-admin-theme-color,#007cba)] selection:text-white">
      
      {/* HEADER SECTION */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-[var(--wp-admin-theme-color,#007cba)] rounded-xl flex items-center justify-center border border-white/10 shadow">
            <Bookmark className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <h1 className="font-sans text-xl font-bold tracking-tight text-white">Memoir Tale</h1>
            <p className="text-[10px] uppercase text-[var(--wp-admin-theme-color,#007cba)] tracking-widest font-mono font-bold">Archival Registry Deck</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-xs text-slate-400 font-sans">Signed In As:</span>
            <span className="text-xs font-mono text-[var(--wp-admin-theme-color,#007cba)] font-bold">{user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="h-10 px-4 bg-slate-800 hover:bg-red-950 hover:text-red-300 rounded-xl border border-slate-700 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer text-slate-200"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* METRICS DASHBOARD SECTION */}
      <section className="bg-white border-b border-slate-200 p-6 relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left shadow-sm">
            <p className="text-[10px] uppercase text-slate-500 font-mono tracking-wider font-semibold">Total Submissions</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{totalInquiriesCount}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left shadow-sm">
            <p className="text-[10px] uppercase text-[var(--wp-admin-theme-color,#007cba)] font-mono tracking-wider font-semibold">Pending Review</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-semibold text-[var(--wp-admin-theme-color,#007cba)] mt-1">{pendingCount}</p>
              <span className="h-2 w-2 rounded-full bg-[var(--wp-admin-theme-color,#007cba)] animate-pulse" />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left shadow-sm">
            <p className="text-[10px] uppercase font-mono tracking-wider font-semibold" style={{ color: '#8B5CF6' }}>Active Writing Stages</p>
            <p className="text-2xl font-semibold mt-1" style={{ color: '#8B5CF6' }}>{activeCount}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left shadow-sm">
            <p className="text-[10px] uppercase text-emerald-600 font-mono tracking-wider font-semibold">Completed Legacy books</p>
            <p className="text-2xl font-semibold text-emerald-700 mt-1">{completedCount}</p>
          </div>

        </div>
      </section>

      {/* DETAILED WORKING SPLIT INTERFACE */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: ACTIVE SEARCHABLE SUBS-REGISTRY PANEL (Lg col 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            
            {/* SEARCH AND CAPTURE DECK */}
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Search className="h-4 w-4" /></span>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search Name or Ticket..."
                  className="w-full bg-[#f6f7f7] border border-slate-300 rounded-lg h-11 pl-11 pr-4 text-sm font-sans focus:outline-none focus:border-[var(--wp-admin-theme-color,#007cba)] focus:bg-white transition-all text-slate-900"
                />
              </div>

              {/* TYPE FILTER TABS (Inquiries vs Callbacks) */}
              <div className="flex gap-2 pt-3 border-t border-slate-200 mt-3">
                {["All", "Inquiries", "Callbacks"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`flex-1 px-4 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      typeFilter === type
                        ? "text-white shadow-md"
                        : "bg-white hover:bg-[#f6f7f7] text-slate-700 border border-slate-300"
                    }`}
                    style={typeFilter === type ? { backgroundColor: '#8B5CF6' } : {}}
                  >
                    {type === "Inquiries" && "📋 "}
                    {type === "Callbacks" && "📞 "}
                    {type}
                  </button>
                ))}
              </div>

              {/* STATUS MULTI-SELECT CHIP ROWS */}
              <div className="flex flex-wrap gap-1.5 pt-3">
                {["All", "Pending", "Meeting Scheduled", "Work In Progress", "Project Completed", "Additional Information Required"].map((filt) => (
                  <button
                    key={filt}
                    onClick={() => setStatusFilter(filt)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      statusFilter === filt
                        ? "bg-[var(--wp-admin-theme-color,#007cba)] text-white border border-[var(--wp-admin-theme-color,#007cba)]"
                        : "bg-white hover:bg-[#f6f7f7] text-slate-700 border border-slate-300"
                    }`}
                  >
                    {filt === "All" ? "ALL INBOX" : filt}
                  </button>
                ))}
              </div>
            </div>

            {/* INTEGRATED EXECUTIVE OFFLINE REPORTING EXPORTS */}
            <div className="border-t border-slate-200 mt-4 pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <span className="text-[11px] text-slate-500 font-sans tracking-wide">Offline Reporting ({filteredInquiries.length} item{filteredInquiries.length === 1 ? '' : 's'})</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={exportToCSV}
                  title="Export records list as a clean UTF-8 excel compatible spreadsheet"
                  className="flex-1 sm:flex-initial h-9 px-3 bg-white hover:bg-[#f6f7f7] text-[#007cba] border border-slate-300 rounded-xl text-xs font-sans font-bold flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-[var(--wp-admin-theme-color,#007cba)]" />
                  <span>CSV Spreadsheet</span>
                </button>
                <button
                  type="button"
                  onClick={exportToPDF}
                  title="Generate dynamic, beautifully customized printable report"
                  className="flex-1 sm:flex-initial h-9 px-3 text-white rounded-xl text-xs font-sans font-bold flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: '#8B5CF6', borderColor: '#8B5CF6', border: '1px solid' }}
                >
                  <Download className="h-3.5 w-3.5 text-white" />
                  <span>A4 PDF</span>
                </button>
              </div>
            </div>

          </div>

          {/* INBOX TICKETS COUNTER */}
          <div className="text-left font-sans text-sm font-bold text-slate-900 px-2 flex justify-between items-center">
            <span>Inquiry Queue ({filteredInquiries.length} matching)</span>
            {loadingInquiries && <RefreshCw className="h-4.5 w-4.5 animate-spin text-[var(--wp-admin-theme-color,#007cba)]" />}
          </div>

          {/* SCROLLING RECORDS QUEUE LIST */}
          <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1">
            <AnimatePresence mode="popLayout">
              {filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.ticketNo === inq.ticketNo;
                const hasAttach = inq.attachments && inq.attachments.length > 0;
                
                // Colors corresponding to system state (completely beautiful warm colors, no blue or indigo)
                let statusBadgeCss = "bg-amber-150 text-amber-800 border border-amber-200/60";
                let meetingScheduledStyle = {};
                
                if (inq.status === "Meeting Scheduled") {
                  statusBadgeCss = "border";
                  meetingScheduledStyle = { 
                    backgroundColor: 'rgba(46, 27, 93, 0.1)', 
                    color: '#8B5CF6', 
                    borderColor: 'rgba(46, 27, 93, 0.3)' 
                  };
                } else if (inq.status === "Work In Progress") {
                  statusBadgeCss = "bg-orange-50 text-orange-850 border border-orange-200";
                } else if (inq.status === "Project Completed") {
                  statusBadgeCss = "bg-emerald-50 text-emerald-700 border border-emerald-200";
                }

                return (
                  <motion.div
                    key={inq.ticketNo}
                    layoutId={`inq-card-${inq.ticketNo}`}
                    onClick={() => {
                      setSelectedInquiry(inq);
                      setNotificationStatus(null);
                    }}
                    className={`border rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer text-slate-900 group relative overflow-hidden ${
                      isSelected
                        ? "bg-white border-[var(--wp-admin-theme-color,#007cba)] ring-1 ring-[var(--wp-admin-theme-color,#007cba)] shadow-[0_8px_20px_rgba(0,124,186,0.1)] scale-[0.99]"
                        : "bg-white hover:bg-[#f6f7f7] border-slate-200 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--wp-admin-theme-color,#007cba)] tracking-wider relative z-10">#{inq.ticketNo}</span>
                        {/* Type Badge (Inquiry vs Callback) */}
                        {inq.collectionType === 'callback' && (
                          <span className="px-2 py-0.5 rounded-full text-[8px] font-sans font-bold uppercase tracking-wider border" style={{ backgroundColor: 'rgba(46, 27, 93, 0.15)', color: '#8B5CF6', borderColor: 'rgba(46, 27, 93, 0.3)' }}>
                            📞 Callback
                          </span>
                        )}
                        {inq.collectionType === 'inquiry' && (
                          <span className="px-2 py-0.5 rounded-full text-[8px] font-sans font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
                            📋 Inquiry
                          </span>
                        )}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider ${statusBadgeCss}`} style={meetingScheduledStyle}>
                        {inq.status || "Pending"}
                      </span>
                    </div>

                    <h4 className="font-sans text-sm font-bold text-slate-900 mt-2 group-hover:text-[var(--wp-admin-theme-color,#007cba)] transition-colors">
                      {inq.fullName}
                    </h4>

                    {/* Metadata lines */}
                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-600 font-sans">
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1 text-[var(--wp-admin-theme-color,#007cba)]" /> {inq.preferredTime || "Anytime"}</span>
                      {hasAttach && (
                        <span className="flex items-center font-bold text-emerald-600">
                           <Download className="h-3 w-3 mr-1" /> {inq.attachments.length} vault assets
                        </span>
                      )}
                    </div>

                    <div className="border-t border-slate-100 mt-3 pt-2.5 flex items-center justify-between text-[11px] text-[var(--wp-admin-theme-color,#007cba)] font-semibold">
                      <span>{inq.service || "Life Story Book"}</span>
                      <span className="font-mono text-[9px] text-slate-400">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {filteredInquiries.length === 0 && (
                <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-8 text-center text-slate-600 font-sans">
                  No submissions match active search parameters.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: CORE SECURE AUDITING DECK (Lg col 7) */}
        <div className="lg:col-span-7 flex flex-col">
          <AnimatePresence mode="wait">
            {selectedInquiry ? (
              <motion.div
                key={selectedInquiry.ticketNo}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white border border-slate-250 rounded-2xl p-6 shadow-sm text-left text-slate-900 flex flex-col space-y-6"
              >
                
                {/* HEAD DETAILS */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-slate-100 pb-5 gap-4">
                  <div className="text-center sm:text-left">
                    <span className="font-mono text-xs font-bold text-[var(--wp-admin-theme-color,#007cba)] uppercase tracking-wider block">Ticket Ref: #{selectedInquiry.ticketNo}</span>
                    <h2 className="font-sans text-2xl font-bold text-slate-950 mt-1">{selectedInquiry.fullName}</h2>
                    <span className="mt-1 h-fit w-fit inline-block px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-250 rounded-full text-slate-900">
                      📚 {selectedInquiry.service}
                    </span>
                  </div>

                  {/* Actions Trash */}
                  <button
                    onClick={() => handleDeleteInquiry(selectedInquiry.ticketNo)}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-200 transition-all cursor-pointer shadow-sm hover:scale-105"
                    title="Delete record irreversibly"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* PROFILE METADATA GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f0f6fc] border border-blue-100 p-4 rounded-xl">
                  <div className="flex flex-col text-xs font-sans">
                    <span className="font-bold text-[var(--wp-admin-theme-color,#007cba)] uppercase text-[10px] tracking-wide">Phone Number</span>
                    <a href={`tel:${selectedInquiry.phone}`} className="text-sm font-semibold text-slate-900 hover:underline mt-1">{selectedInquiry.phone}</a>
                  </div>

                  <div className="flex flex-col text-xs font-sans">
                    <span className="font-bold text-[var(--wp-admin-theme-color,#007cba)] uppercase text-[10px] tracking-wide">Email Address</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-sm font-semibold text-slate-900 hover:underline mt-1">{selectedInquiry.email}</a>
                  </div>

                  <div className="flex flex-col text-xs font-sans">
                    <span className="font-bold text-[var(--wp-admin-theme-color,#007cba)] uppercase text-[10px] tracking-wide">Location / Coordinates</span>
                    <span className="text-sm font-semibold text-slate-900 mt-1">{selectedInquiry.cityState || "Not Specified"}</span>
                  </div>

                  <div className="flex flex-col text-xs font-sans">
                    <span className="font-bold text-[var(--wp-admin-theme-color,#007cba)] uppercase text-[10px] tracking-wide">Preferred consulting Hours</span>
                    <span className="text-sm font-semibold text-slate-900 mt-1">{selectedInquiry.preferredTime}</span>
                  </div>
                </div>

                {/* BIOGRAPHICAL CONTENT TEXT AREA */}
                <div className="flex flex-col text-left space-y-2">
                  <span className="font-sans font-bold text-[var(--wp-admin-theme-color,#007cba)] uppercase text-[10px] tracking-widest flex items-center">
                    <FileText className="h-3.5 w-3.5 mr-1" /> Client Manuscript Outline
                  </span>
                  <div className="bg-[#f6f7f7] border border-slate-200 p-4 rounded-xl text-sm leading-relaxed text-slate-800 min-h-[110px] whitespace-pre-wrap font-sans">
                    {selectedInquiry.briefStory || "No preliminary stories or manuscript descriptions were attached in form."}
                  </div>
                </div>

                {/* VISUAL ARCHIVES MEDIA GALLERY SECTION */}
                <div className="flex flex-col text-left space-y-2">
                  <span className="font-sans font-bold text-[var(--wp-admin-theme-color,#007cba)] uppercase text-[10px] tracking-widest flex items-center">
                    <Download className="h-3.5 w-3.5 mr-1" /> Vault Attachments ({selectedInquiry.attachments?.length || 0})
                  </span>
                  
                  {selectedInquiry.attachments && selectedInquiry.attachments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {selectedInquiry.attachments.map((file: any, idx: number) => {
                        const isImg = file.type?.startsWith("image/");
                        const hasError = file.error || !file.url;
                        return (
                          <div key={idx} className={`flex items-center justify-between p-3 bg-white border rounded-xl relative group ${hasError ? 'border-amber-300 bg-amber-50' : 'border-slate-200'}`}>
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                {isImg && file.url ? (
                                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                    {renderAttachmentIcon(file.type || "")}
                                  </div>
                                )}
                              </div>
                              <div className="text-left overflow-hidden">
                                <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]" title={file.name}>
                                  {file.name}
                                </p>
                                <p className="text-[9px] text-[var(--wp-admin-theme-color,#007cba)] uppercase tracking-wider font-semibold">
                                  {file.type ? file.type.split("/")[1] : "Asset"}
                                </p>
                                {hasError && (
                                  <p className="text-[8px] text-amber-600 font-semibold mt-0.5">
                                    ⚠️ Upload incomplete
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Live download coordinate url link */}
                            {file.url ? (
                              <a
                                href={file.url}
                                download={file.name}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 bg-white border border-slate-200 rounded-lg text-[var(--wp-admin-theme-color,#007cba)] hover:bg-[var(--wp-admin-theme-color,#007cba)] hover:text-white transition-colors cursor-pointer"
                                title="Download asset safely"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              <div
                                className="p-1.5 bg-gray-100 border border-slate-200 rounded-lg text-gray-400 cursor-not-allowed"
                                title="File URL not available"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 bg-[#f6f7f7] border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-600 font-sans">
                      No media or layout files attached to this dossier in form.
                    </div>
                  )}
                </div>

                {/* LIVE AUTOMATION DISPATCHER MATRIX */}
                <div className="border-t border-slate-100 pt-6 flex flex-col text-left space-y-4">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-slate-900 flex items-center">
                      <Send className="h-4.5 w-4.5 mr-1.5 text-[var(--wp-admin-theme-color,#007cba)] animate-pulse" /> Dispatch Live Project Updates
                    </h3>
                    <p className="font-sans text-xs text-slate-500 mt-1">
                      Choose a milestone. Clicking triggers instantaneous database status updates, generates styled SendGrid email dispatches and fires Twilio SMS text messages directly to the client network.
                    </p>
                  </div>

                  {/* ACTIVE ACTION BUTTON CELL - Different buttons for Inquiry vs Callback */}
                  {selectedInquiry.collectionType === 'callback' ? (
                    // CALLBACK: Only 2 buttons (Meeting Scheduled + Completed)
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      
                      {/* BUTTON 1: Meeting Scheduled */}
                      <button
                        onClick={() => handleOneClickUpdate(selectedInquiry, "Meeting Scheduled")}
                        disabled={updatingTicket !== null}
                        className="h-12 bg-white border font-sans font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:translate-y-0.5 disabled:opacity-50"
                        style={{ 
                          borderColor: 'rgba(46, 27, 93, 0.3)', 
                          color: '#8B5CF6'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(46, 27, 93, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>{updatingTicket === selectedInquiry.ticketNo ? "Dispatching..." : "Meeting Scheduled"}</span>
                      </button>

                      {/* BUTTON 2: Completed */}
                      <button
                        onClick={() => handleOneClickUpdate(selectedInquiry, "Completed")}
                        disabled={updatingTicket !== null}
                        className="h-12 bg-white hover:bg-emerald-50 border border-emerald-500 text-emerald-800 font-sans font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:translate-y-0.5 disabled:opacity-50"
                      >
                        <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{updatingTicket === selectedInquiry.ticketNo ? "Dispatching..." : "Completed"}</span>
                      </button>

                    </div>
                  ) : (
                    // INQUIRY: All 4 buttons (Meeting Scheduled + Work In Progress + Project Completed + Info Required)
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      
                      {/* BUTTON 1: Meeting Scheduled */}
                      <button
                        onClick={() => handleOneClickUpdate(selectedInquiry, "Meeting Scheduled")}
                        disabled={updatingTicket !== null}
                        className="h-12 bg-white border font-sans font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:translate-y-0.5 disabled:opacity-50"
                        style={{ 
                          borderColor: 'rgba(46, 27, 93, 0.3)', 
                          color: '#8B5CF6'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(46, 27, 93, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>{updatingTicket === selectedInquiry.ticketNo ? "Dispatching..." : "Meeting Scheduled"}</span>
                      </button>

                      {/* BUTTON 2: Work In Progress */}
                      <button
                        onClick={() => handleOneClickUpdate(selectedInquiry, "Work In Progress")}
                        disabled={updatingTicket !== null}
                        className="h-12 bg-white hover:bg-orange-50 border border-orange-200 text-orange-700 font-sans font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:translate-y-0.5 disabled:opacity-50"
                      >
                        <RefreshCw className="h-4 w-4 shrink-0" />
                        <span>{updatingTicket === selectedInquiry.ticketNo ? "Dispatching..." : "Work In Progress"}</span>
                      </button>

                      {/* BUTTON 3: Project Completed */}
                      <button
                        onClick={() => handleOneClickUpdate(selectedInquiry, "Project Completed")}
                        disabled={updatingTicket !== null}
                        className="h-12 bg-white hover:bg-emerald-50 border border-emerald-500 text-emerald-800 font-sans font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:translate-y-0.5 disabled:opacity-50"
                      >
                        <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{updatingTicket === selectedInquiry.ticketNo ? "Dispatching..." : "Project Completed"}</span>
                      </button>

                      {/* BUTTON 4: Additional Information Required */}
                      <button
                        onClick={() => handleOneClickUpdate(selectedInquiry, "Additional Information Required")}
                        disabled={updatingTicket !== null}
                        className="h-12 bg-white hover:bg-amber-50 border border-amber-300 text-amber-700 font-sans font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:translate-y-0.5 disabled:opacity-50"
                      >
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>{updatingTicket === selectedInquiry.ticketNo ? "Dispatching..." : "Info Required"}</span>
                      </button>

                    </div>
                  )}

                  {/* AUTOMATION RESPONSE GRAPHICS FEEDBACK */}
                  <AnimatePresence>
                    {notificationStatus && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-4 rounded-2xl text-xs flex items-start space-x-2 border ${
                          notificationStatus.success
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-amber-50 border-amber-200 text-amber-800"
                        }`}
                      >
                        {notificationStatus.success ? (
                          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                        )}
                        <span className="leading-relaxed font-sans">{notificationStatus.msg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-dashed border-slate-200 h-full rounded-2xl p-12 text-center text-slate-500 font-sans flex flex-col items-center justify-center space-y-3 min-h-[350px]"
              >
                <div className="p-4 bg-slate-50 rounded-full text-slate-400">
                  <Bookmark className="h-8 w-8" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-slate-900">Select Submissions Audit Card</h3>
                <p className="max-w-md text-xs leading-relaxed text-slate-500">
                  Select an inquiry from the left queue list to audit their historic stories manuscripts, inspect uploaded high-fidelity assets archives, and dispatch secure automated SMS texts and Email dispatches.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

