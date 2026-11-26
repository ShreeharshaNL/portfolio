import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  Lock, 
  ArrowLeft, 
  Mail, 
  Trash2, 
  Check, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  BarChart2, 
  Layers, 
  Database, 
  Search, 
  LogOut, 
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  Loader2
} from 'lucide-react';
import { personalInfo } from '../config/portfolio';
import { ThemeToggle } from './ThemeToggle';
import { professionalApi, AdminDashboardData, AdminMessage, AdminGuestbookEntry } from '../services/api';

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
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Invalid authorization credentials.');
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
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message || 'Failed to delete message');
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
          guestbook: adminData.guestbook.map((g: AdminGuestbookEntry) =>
            g.id === id ? { ...g, is_approved: g.is_approved ? 0 : 1 } : g
          ),
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message || 'Failed to toggle guestbook entry');
    }
  };

  const handleDeleteGuestbook = async (id: string) => {
    if (!window.confirm('Delete this guestbook entry permanently?')) return;
    try {
      await professionalApi.adminAction('delete_guestbook', id, sessionToken);
      if (adminData) {
        setAdminData({
          ...adminData,
          guestbook: adminData.guestbook.filter((g: AdminGuestbookEntry) => g.id !== id),
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message || 'Failed to delete guestbook entry');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const filteredMessages = useMemo(() => {
    if (!adminData?.messages) return [];
    if (!searchQuery.trim()) return adminData.messages;
    const q = searchQuery.toLowerCase();
    return adminData.messages.filter(
      (m: AdminMessage) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q) ||
        (m.subject && m.subject.toLowerCase().includes(q))
    );
  }, [adminData?.messages, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-[#1d7eb6]/20 transition-colors duration-200">
      
      {/* Top Header Rule */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:border-[#1d7eb6] hover:text-[#1d7eb6] transition-colors focus-ring"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </button>

          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Operator Console
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors focus-ring"
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {!isAuthenticated ? (
          /* =========================================================================
             LOGIN VIEW
             ========================================================================= */
          <div className="max-w-md mx-auto pt-8 pb-16">
            <div className="p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-center space-y-6">
              
              <div className="w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-[#1d7eb6] flex items-center justify-center font-bold mx-auto">
                <Shield className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  Authentication Required
                </span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
                  Operator Login
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-sans leading-relaxed">
                  Access leads, contact form inquiries, and edge telemetry stored in Cloudflare D1.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded border border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-200 text-xs font-medium flex items-center space-x-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label htmlFor="admin-pass" className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
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
                      className="w-full px-3.5 py-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus-ring transition-all font-mono"
                    />
                    <Lock className="w-4 h-4 absolute right-3.5 top-3 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md bg-[#1d7eb6] hover:bg-[#156593] text-white text-xs font-medium transition-colors disabled:opacity-50 focus-ring"
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

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
                Route: <code>/admin</code> · Authenticated via Cloudflare D1
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
              
              <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-[#1d7eb6] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Inbox Inquiries
                  </span>
                  <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                    {adminData?.messages?.length || 0}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-sky-500 flex items-center justify-center shrink-0">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Total Page Views
                  </span>
                  <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                    {adminData?.analytics?.totalViews || 0}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-amber-500 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Project Clicks
                  </span>
                  <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                    {adminData?.analytics?.projectClicks || 0}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-purple-500 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Data Source
                  </span>
                  <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {adminData?.source === 'd1-database' ? 'Cloudflare D1' : 'Local / Edge'}
                  </div>
                </div>
              </div>

            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors focus-ring ${
                    activeTab === 'messages'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inbox ({adminData?.messages?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors focus-ring ${
                    activeTab === 'analytics'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Analytics</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('guestbook')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors focus-ring ${
                    activeTab === 'guestbook'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Guestbook ({adminData?.guestbook?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('system')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors focus-ring ${
                    activeTab === 'system'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
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
                className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-ring disabled:opacity-50"
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
                      className="w-full pl-9 pr-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus-ring transition-colors"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400 pointer-events-none" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 self-center">
                    Showing {filteredMessages.length} of {adminData?.messages?.length || 0} messages
                  </span>
                </div>

                {filteredMessages.length === 0 ? (
                  <div className="p-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-center space-y-2">
                    <Mail className="w-8 h-8 mx-auto text-zinc-400" />
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      No Messages Found
                    </h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto font-sans">
                      {searchQuery
                        ? 'No inquiries match your current search query.'
                        : 'Submissions from the Contact form will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredMessages.map((msg: AdminMessage) => (
                      <div
                        key={msg.id}
                        className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                                {msg.name}
                              </span>
                              {msg.status && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                  {msg.status}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1.5 text-xs font-mono text-zinc-500">
                              <span>{msg.email}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(msg.email)}
                                className="p-0.5 rounded hover:text-zinc-900 dark:hover:text-zinc-100"
                                title="Copy email address"
                              >
                                {copiedEmail === msg.email ? (
                                  <Check className="w-3 h-3 text-[#1d7eb6]" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          <span className="text-[11px] font-mono text-zinc-400 self-start sm:self-auto">
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                        </div>

                        {msg.subject && (
                          <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                            Subject: {msg.subject}
                          </div>
                        )}

                        <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-900 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {msg.message}
                        </div>

                        <div className="pt-1 flex items-center justify-between">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`\n\n--- Original Message from ${msg.name} ---\n${msg.message}`)}`}
                            className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#1d7eb6] hover:underline"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply via Email</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            disabled={deletingId === msg.id}
                            className="inline-flex items-center space-x-1 text-xs text-rose-500 hover:text-rose-600 transition-colors"
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
                  <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        Project Engagement
                      </h3>
                      <span className="text-xs font-mono text-zinc-500">
                        Clicks
                      </span>
                    </div>

                    {(!adminData?.analytics?.projectStats || adminData.analytics.projectStats.length === 0) ? (
                      <div className="p-6 text-center text-xs font-mono text-zinc-400">
                        No individual project click telemetry recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {adminData.analytics.projectStats.map((item) => (
                          <div key={item.project} className="flex items-center justify-between p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
                            <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
                              {item.project}
                            </span>
                            <span className="font-mono font-semibold text-[#1d7eb6]">
                              {item.count} clicks
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Theme Preferences */}
                  <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        Atmospheric Selection Stats
                      </h3>
                      <span className="text-xs font-mono text-zinc-500">
                        Visits
                      </span>
                    </div>

                    {(!adminData?.analytics?.themeStats || adminData.analytics.themeStats.length === 0) ? (
                      <div className="p-6 text-center text-xs font-mono text-zinc-400">
                        No theme selection events recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {adminData.analytics.themeStats.map((t) => (
                          <div key={t.theme} className="flex items-center justify-between p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
                            <span className="font-mono uppercase text-zinc-800 dark:text-zinc-200">
                              {t.theme}
                            </span>
                            <span className="font-mono font-semibold text-zinc-600 dark:text-zinc-400">
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
                  <div className="p-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-center space-y-2">
                    <Layers className="w-8 h-8 mx-auto text-zinc-400" />
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      No Guestbook Notes
                    </h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto font-sans">
                      Visitor signs created on the Minecraft Community Ledger will appear here for review and moderation.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {adminData.guestbook.map((entry: AdminGuestbookEntry) => (
                      <div
                        key={entry.id}
                        className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                              {entry.author_name}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                                entry.is_approved
                                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                              }`}
                            >
                              {entry.is_approved ? 'Approved' : 'Hidden'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans">
                            "{entry.message}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                          <span className="text-[11px] text-zinc-400">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </span>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleToggleGuestbook(entry.id)}
                              className="inline-flex items-center space-x-1 px-2 py-1 rounded text-xs border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 text-zinc-700 dark:text-zinc-300 transition-colors"
                            >
                              {entry.is_approved ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              <span>{entry.is_approved ? 'Hide' : 'Approve'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteGuestbook(entry.id)}
                              className="p-1 rounded text-rose-500 hover:text-rose-600 transition-colors"
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
                  <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                      Cloudflare D1 Infrastructure
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                      Serverless SQLite database distributed globally on Cloudflare's edge network.
                    </p>

                    <div className="space-y-2 pt-1 font-mono text-xs">
                      <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">contact_messages</span>
                        <span className="text-[#1d7eb6] font-semibold">D1 Table</span>
                      </div>
                      <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">guestbook_entries</span>
                        <span className="text-[#1d7eb6] font-semibold">D1 Table</span>
                      </div>
                      <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">analytics_events</span>
                        <span className="text-[#1d7eb6] font-semibold">D1 Table</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Identity & Deployment Targets */}
                  <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                      Portfolio Ecosystem Targets
                    </h3>

                    <div className="space-y-2 font-mono text-xs pt-1">
                      <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <span className="text-zinc-400 uppercase text-[10px] block">Main Site</span>
                        <a
                          href="https://shreeharsha.online"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center space-x-1.5 hover:text-[#1d7eb6] transition-colors mt-0.5"
                        >
                          <span>https://shreeharsha.online</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <span className="text-zinc-400 uppercase text-[10px] block">Minecraft Edition</span>
                        <a
                          href="https://minecraft.shreeharsha.online"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center space-x-1.5 hover:text-[#1d7eb6] transition-colors mt-0.5"
                        >
                          <span>https://minecraft.shreeharsha.online</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <span className="text-zinc-400 uppercase text-[10px] block">Owner Information</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 mt-0.5 block">
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
