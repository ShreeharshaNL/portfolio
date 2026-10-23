import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Trash2,
  AlertCircle,
  Loader2,
  BarChart2,
  Mail,
  ArrowLeft,
  RefreshCw,
  LogOut,
  Copy,
  Check,
  Send,
  Eye,
  EyeOff,
  Layers,
  Database,
  ExternalLink,
  Search,
} from 'lucide-react';
import { professionalApi, AdminDashboardData, AdminMessage } from '../services/api';
import { ThemeToggle } from './ThemeToggle';
import { personalInfo } from '../config/portfolio';

interface AdminPageProps {
  onBackToHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToHome }) => {
  const [password, setPassword] = useState('');
  const [sessionToken, setSessionToken] = useState(() => sessionStorage.getItem('pro_admin_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'messages' | 'analytics' | 'guestbook' | 'system'>('messages');
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState<AdminDashboardData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDashboardData = async (token: string) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await professionalApi.getAdminData(token);
      setAdminData(data);
      setIsAuthenticated(true);
      setSessionToken(token);
      sessionStorage.setItem('pro_admin_token', token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid authorization credentials.');
      setIsAuthenticated(false);
      sessionStorage.removeItem('pro_admin_token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionToken) {
      fetchDashboardData(sessionToken);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    fetchDashboardData(password.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('pro_admin_token');
    setSessionToken('');
    setIsAuthenticated(false);
    setAdminData(null);
    setPassword('');
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    setDeletingId(id);
    try {
      await professionalApi.adminAction('delete_message', id, sessionToken);
      if (adminData) {
        setAdminData({
          ...adminData,
          messages: adminData.messages.filter((m) => m.id !== id),
        });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete message');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleGuestbook = async (id: string) => {
    try {
      await professionalApi.adminAction('toggle_guestbook', id, sessionToken);
      if (adminData) {
        setAdminData({
          ...adminData,
          guestbook: adminData.guestbook.map((g) =>
            g.id === id ? { ...g, is_approved: g.is_approved ? 0 : 1 } : g
          ),
        });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to toggle guestbook entry');
    }
  };

  const handleDeleteGuestbook = async (id: string) => {
    if (!window.confirm('Delete this guestbook entry permanently?')) return;
    try {
      await professionalApi.adminAction('delete_guestbook', id, sessionToken);
      if (adminData) {
        setAdminData({
          ...adminData,
          guestbook: adminData.guestbook.filter((g) => g.id !== id),
        });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete guestbook entry');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Filter messages based on search query
  const filteredMessages = (adminData?.messages || []).filter((msg) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      (msg.subject && msg.subject.toLowerCase().includes(q)) ||
      msg.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#ebebea] dark:bg-[#0b0c10] text-[#111111] dark:text-[#f8fafc] font-sans antialiased selection:bg-[#5fb57a] selection:text-[#111111] transition-colors duration-200">
      
      {/* Top Header Rule */}
      <header className="sticky top-0 z-40 bg-[#ebebea]/95 dark:bg-[#0b0c10]/95 backdrop-blur-md border-b-2 border-[#111111] dark:border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide border-2 border-[#111111] dark:border-white/25 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[2px_2px_0px_0px_#111111] hover:shadow-[3px_3px_0px_0px_#5fb57a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all focus-ring"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </button>

          <div className="inline-flex items-center rounded-full border-2 border-[#111111] dark:border-white/25 bg-white dark:bg-[#15171f] overflow-hidden text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">
            <span className="bg-[#5fb57a] text-[#111111] px-2.5 py-1 font-black">00</span>
            <span className="px-3 py-1 text-[#111111] dark:text-white uppercase tracking-wider font-extrabold">
              Operator Console
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-[#111111] dark:border-white/25 bg-rose-500 text-white shadow-[2px_2px_0px_0px_#111111] hover:shadow-[3px_3px_0px_0px_#111111] active:translate-x-0 active:translate-y-0 transition-all focus-ring"
                title="Log out of operator session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {!isAuthenticated ? (
          /* =========================================================================
             LOGIN VIEW
             ========================================================================= */
          <div className="max-w-md mx-auto pt-8 pb-16">
            <div className="card-editorial p-8 sm:p-10 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] text-center space-y-6">
              
              <div className="w-16 h-16 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold mx-auto shadow-[3px_3px_0px_0px_#111111]">
                <Shield className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                  Authentication Required
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#111111] dark:text-white uppercase tracking-tight mt-1">
                  Admin Operator
                </h1>
                <p className="text-xs text-[#111111]/75 dark:text-slate-400 mt-2 font-sans">
                  Access leads, contact form inquiries, and system analytics stored on the Cloudflare edge network.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl border-2 border-[#111111] bg-rose-500/15 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center space-x-2 text-left shadow-[2px_2px_0px_0px_#111111]">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label htmlFor="admin-pass" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-slate-300">
                    Master Password
                  </label>
                  <div className="relative">
                    <input
                      id="admin-pass"
                      type="password"
                      required
                      autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter administrator password..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#111111] dark:border-white/25 bg-[#ebebea]/40 dark:bg-[#0b0c10] text-[#111111] dark:text-white placeholder-[#111111]/40 dark:placeholder-white/40 text-sm focus:outline-none focus:border-[#5fb57a] focus:shadow-[3px_3px_0px_0px_#5fb57a] transition-all font-mono"
                    />
                    <Lock className="w-4 h-4 absolute right-3.5 top-3.5 text-[#111111]/40 dark:text-white/40 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#5fb57a] text-[#111111] font-extrabold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#111111] active:translate-x-0 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Unlock Dashboard</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t-2 border-[#111111]/10 dark:border-white/10 text-[11px] font-mono text-[#111111]/50 dark:text-slate-500">
                Route: <code className="font-bold">/admin</code> · Authenticated via Cloudflare D1
              </div>

            </div>
          </div>
        ) : (
          /* =========================================================================
             AUTHENTICATED DASHBOARD VIEW
             ========================================================================= */
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="card-editorial card-editorial-hover p-5 flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Inbox Inquiries
                  </span>
                  <div className="font-display text-2xl font-black text-[#111111] dark:text-white">
                    {adminData?.messages?.length || 0}
                  </div>
                </div>
              </div>

              <div className="card-editorial card-editorial-hover p-5 flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-full border-2 border-[#111111] dark:border-white/20 bg-sky-400 text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Total Page Views
                  </span>
                  <div className="font-display text-2xl font-black text-[#111111] dark:text-white">
                    {adminData?.analytics?.totalViews || 0}
                  </div>
                </div>
              </div>

              <div className="card-editorial card-editorial-hover p-5 flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-full border-2 border-[#111111] dark:border-white/20 bg-amber-400 text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Project Clicks
                  </span>
                  <div className="font-display text-2xl font-black text-[#111111] dark:text-white">
                    {adminData?.analytics?.projectClicks || 0}
                  </div>
                </div>
              </div>

              <div className="card-editorial card-editorial-hover p-5 flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-full border-2 border-[#111111] dark:border-white/20 bg-purple-400 text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Data Source
                  </span>
                  <div className="text-sm font-mono font-black text-[#111111] dark:text-white truncate">
                    {adminData?.source === 'd1-database' ? 'Cloudflare D1' : 'Local / Edge'}
                  </div>
                </div>
              </div>

            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#111111]/15 dark:border-white/10 pb-4">
              
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus-ring ${
                    activeTab === 'messages'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-[2px_2px_0px_0px_#5fb57a]'
                      : 'border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-slate-300 shadow-[2px_2px_0px_0px_#111111]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inbox ({adminData?.messages?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus-ring ${
                    activeTab === 'analytics'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-[2px_2px_0px_0px_#5fb57a]'
                      : 'border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-slate-300 shadow-[2px_2px_0px_0px_#111111]'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Analytics</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('guestbook')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus-ring ${
                    activeTab === 'guestbook'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-[2px_2px_0px_0px_#5fb57a]'
                      : 'border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-slate-300 shadow-[2px_2px_0px_0px_#111111]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Guestbook ({adminData?.guestbook?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('system')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus-ring ${
                    activeTab === 'system'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-[2px_2px_0px_0px_#5fb57a]'
                      : 'border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-slate-300 shadow-[2px_2px_0px_0px_#111111]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>System</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => fetchDashboardData(sessionToken)}
                disabled={isLoading}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[2px_2px_0px_0px_#111111] hover:shadow-[3px_3px_0px_0px_#5fb57a] active:translate-x-0 active:translate-y-0 transition-all focus-ring disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

            </div>

            {/* TAB 1: INBOX / MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search inquiries by name, email, or message..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-sm text-[#111111] dark:text-white placeholder-[#111111]/40 dark:placeholder-white/40 focus:outline-none focus:border-[#5fb57a] focus:shadow-[2px_2px_0px_0px_#5fb57a] transition-all"
                    />
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#111111]/40 dark:text-white/40 pointer-events-none" />
                  </div>
                  <span className="text-xs font-mono text-[#111111]/60 dark:text-slate-400 self-center">
                    Showing {filteredMessages.length} of {adminData?.messages?.length || 0} messages
                  </span>
                </div>

                {filteredMessages.length === 0 ? (
                  <div className="card-editorial p-12 text-center space-y-3">
                    <Mail className="w-10 h-10 mx-auto text-[#111111]/30 dark:text-white/30" />
                    <h3 className="font-display text-lg font-black uppercase text-[#111111] dark:text-white">
                      No Messages Found
                    </h3>
                    <p className="text-xs text-[#111111]/60 dark:text-slate-400 max-w-sm mx-auto font-sans">
                      {searchQuery
                        ? 'No inquiries match your current search query.'
                        : 'Submissions from the Contact form on either the professional or Minecraft portfolio will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMessages.map((msg: AdminMessage) => (
                      <div
                        key={msg.id}
                        className="card-editorial card-editorial-hover p-6 sm:p-7 space-y-4 border-l-8 border-l-[#5fb57a]"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#111111]/10 dark:border-white/10 pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-display text-base font-black text-[#111111] dark:text-white uppercase">
                                {msg.name}
                              </span>
                              {msg.status && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#5fb57a]/20 text-[#111111] dark:text-[#5fb57a] border border-[#5fb57a]">
                                  {msg.status}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-xs font-mono text-[#111111]/70 dark:text-slate-400">
                              <span>{msg.email}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(msg.email)}
                                className="p-1 rounded hover:bg-[#111111]/10 dark:hover:bg-white/10"
                                title="Copy email address"
                              >
                                {copiedEmail === msg.email ? (
                                  <Check className="w-3 h-3 text-[#5fb57a]" />
                                ) : (
                                  <Copy className="w-3 h-3 text-[#111111]/50" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="text-right self-start sm:self-auto">
                            <span className="text-[11px] font-mono font-bold text-[#111111]/60 dark:text-slate-400">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {msg.subject && (
                          <div>
                            <span className="text-[11px] font-mono font-bold uppercase text-[#111111]/50 dark:text-slate-400 block">
                              Subject
                            </span>
                            <h4 className="font-bold text-sm text-[#111111] dark:text-slate-200 mt-0.5">
                              {msg.subject}
                            </h4>
                          </div>
                        )}

                        <div className="p-4 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/50 dark:bg-[#1a1d29] text-sm text-[#111111]/90 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                          {msg.message}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`\n\n--- Original Message from ${msg.name} ---\n${msg.message}`)}`}
                            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase bg-[#5fb57a] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:shadow-[3px_3px_0px_0px_#111111] active:translate-x-0 active:translate-y-0 transition-all focus-ring"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply via Email</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            disabled={deletingId === msg.id}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold uppercase text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors focus-ring"
                          >
                            {deletingId === msg.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Trash2 className="w-3 h-3" />
                            )}
                            <span>Delete</span>
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: ANALYTICS & TELEMETRY */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Project Popularity */}
                  <div className="card-editorial p-6 sm:p-7 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-black text-[#111111] dark:text-white uppercase">
                        Project Engagement
                      </h3>
                      <span className="text-[11px] font-mono font-bold uppercase text-[#111111]/60 dark:text-slate-400">
                        Clicks
                      </span>
                    </div>

                    {(!adminData?.analytics?.projectStats || adminData.analytics.projectStats.length === 0) ? (
                      <div className="p-8 text-center text-xs font-mono text-[#111111]/50 dark:text-slate-400">
                        No individual project click telemetry recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {adminData.analytics.projectStats.map((item) => (
                          <div key={item.project} className="flex items-center justify-between p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29]">
                            <span className="font-mono font-bold text-xs text-[#111111] dark:text-white">
                              {item.project}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#5fb57a] text-[#111111] font-mono font-black text-xs border border-[#111111]">
                              {item.count} clicks
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Theme / Biome Preferences */}
                  <div className="card-editorial p-6 sm:p-7 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-black text-[#111111] dark:text-white uppercase">
                        Atmospheric Selection Stats
                      </h3>
                      <span className="text-[11px] font-mono font-bold uppercase text-[#111111]/60 dark:text-slate-400">
                        Total
                      </span>
                    </div>

                    {(!adminData?.analytics?.themeStats || adminData.analytics.themeStats.length === 0) ? (
                      <div className="p-8 text-center text-xs font-mono text-[#111111]/50 dark:text-slate-400">
                        No theme selection events recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {adminData.analytics.themeStats.map((t) => (
                          <div key={t.theme} className="flex items-center justify-between p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29]">
                            <span className="font-mono font-bold text-xs uppercase text-[#111111] dark:text-white">
                              {t.theme}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-sky-300 dark:bg-sky-900/60 text-[#111111] dark:text-sky-200 font-mono font-bold text-xs border border-[#111111]/30">
                              {t.count} visits
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* TAB 3: GUESTBOOK MODERATION */}
            {activeTab === 'guestbook' && (
              <div className="space-y-6">
                
                {(!adminData?.guestbook || adminData.guestbook.length === 0) ? (
                  <div className="card-editorial p-12 text-center space-y-3">
                    <Layers className="w-10 h-10 mx-auto text-[#111111]/30 dark:text-white/30" />
                    <h3 className="font-display text-lg font-black uppercase text-[#111111] dark:text-white">
                      No Guestbook Notes
                    </h3>
                    <p className="text-xs text-[#111111]/60 dark:text-slate-400 max-w-sm mx-auto font-sans">
                      Visitor signs created on the Minecraft Community Ledger will appear here for review and moderation.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {adminData.guestbook.map((entry) => (
                      <div
                        key={entry.id}
                        className="card-editorial card-editorial-hover p-6 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-sm font-black text-[#111111] dark:text-white uppercase">
                              {entry.author_name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                                entry.is_approved
                                  ? 'bg-[#5fb57a]/20 text-[#111111] dark:text-[#5fb57a] border-[#5fb57a]'
                                  : 'bg-amber-400/20 text-amber-800 dark:text-amber-300 border-amber-500'
                              }`}
                            >
                              {entry.is_approved ? 'Approved' : 'Hidden'}
                            </span>
                          </div>
                          <p className="text-sm text-[#111111]/85 dark:text-slate-300 font-sans">
                            "{entry.message}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#111111]/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                          <span className="text-[11px] text-[#111111]/50 dark:text-slate-400">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </span>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleToggleGuestbook(entry.id)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold border border-[#111111]/30 dark:border-white/30 hover:bg-[#111111]/10 dark:hover:bg-white/10"
                            >
                              {entry.is_approved ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              <span>{entry.is_approved ? 'Hide' : 'Approve'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteGuestbook(entry.id)}
                              className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* TAB 4: SYSTEM & INFRASTRUCTURE */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Database Schema & Tables */}
                  <div className="card-editorial p-6 sm:p-7 space-y-4">
                    <h3 className="font-display text-base font-black text-[#111111] dark:text-white uppercase">
                      Cloudflare D1 Infrastructure
                    </h3>
                    <p className="text-xs text-[#111111]/75 dark:text-slate-400 leading-relaxed font-sans">
                      Serverless SQLite database distributed on Cloudflare's edge network.
                    </p>

                    <div className="space-y-2 pt-2 font-mono text-xs">
                      <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29] flex items-center justify-between">
                        <span className="font-bold text-[#111111] dark:text-white">contact_messages</span>
                        <span className="text-[#5fb57a] font-bold">D1 Table</span>
                      </div>
                      <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29] flex items-center justify-between">
                        <span className="font-bold text-[#111111] dark:text-white">guestbook_entries</span>
                        <span className="text-[#5fb57a] font-bold">D1 Table</span>
                      </div>
                      <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29] flex items-center justify-between">
                        <span className="font-bold text-[#111111] dark:text-white">analytics_events</span>
                        <span className="text-[#5fb57a] font-bold">D1 Table</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Identity & Deployment Targets */}
                  <div className="card-editorial p-6 sm:p-7 space-y-4">
                    <h3 className="font-display text-base font-black text-[#111111] dark:text-white uppercase">
                      Portfolio Ecosystem Targets
                    </h3>

                    <div className="space-y-3 font-mono text-xs pt-1">
                      <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29]">
                        <span className="text-[#111111]/50 dark:text-slate-400 uppercase text-[10px] block">Main Site</span>
                        <a
                          href="https://shreeharsha.online"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#111111] dark:text-white flex items-center space-x-1.5 hover:text-[#5fb57a] transition-colors"
                        >
                          <span>https://shreeharsha.online</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29]">
                        <span className="text-[#111111]/50 dark:text-slate-400 uppercase text-[10px] block">Minecraft Edition</span>
                        <a
                          href="https://minecraft.shreeharsha.online"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#111111] dark:text-white flex items-center space-x-1.5 hover:text-[#5fb57a] transition-colors"
                        >
                          <span>https://minecraft.shreeharsha.online</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea]/40 dark:bg-[#1a1d29]">
                        <span className="text-[#111111]/50 dark:text-slate-400 uppercase text-[10px] block">Owner Information</span>
                        <span className="font-bold text-[#111111] dark:text-white">
                          {personalInfo.name} · NIE Mysuru · CGPA {personalInfo.cgpa}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
};
