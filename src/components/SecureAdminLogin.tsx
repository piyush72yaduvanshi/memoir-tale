import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ShieldAlert, Lock, Mail, AlertTriangle, Loader } from 'lucide-react';
import { motion } from 'motion/react';

interface SecureAdminLoginProps {
  onLoginSuccess: () => void;
}

export default function SecureAdminLogin({ onLoginSuccess }: SecureAdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // useAdminAuth hook will automatically verify admin role
      onLoginSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address format');
          break;
        case 'auth/user-not-found':
          setError('No admin account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        default:
          setError('Login failed. Please check your credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B36] via-[#1B101E] to-[#2D1B36] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#1B101E] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] mb-4 shadow-lg shadow-[#D4AF37]/30">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-white/60 text-sm">
              MemoirTale Dashboard - Authorized Personnel Only
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
            >
              <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@memoirtale.com"
                  className="w-full h-12 pl-12 pr-4 bg-[#2D1B36] border border-white/15 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full h-12 pl-12 pr-4 bg-[#2D1B36] border border-white/15 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#D4AF37] via-[#E5C463] to-[#D4AF37] text-[#1A1410] font-bold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-5 w-5" />
                  <span>Secure Login</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg">
            <p className="text-[#D4AF37] text-xs text-center font-semibold">
              🔒 Connect Administrator
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-xs mt-6">
          © 2023 MemoirTale. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
