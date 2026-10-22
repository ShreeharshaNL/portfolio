import React, { useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';
import { sound } from '../utils/audio';
import {
  Shield,
  Lock,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  BarChart2,
  Mail,
  MessageSquare,
  ArrowLeft,
  Compass,
  Sparkles,
  RefreshCw,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import {
  CherryBlossomIcon,
  NetherStarIcon,
  EnderEyeIcon,
  SnowflakeIcon,
} from './MinecraftIcons';

interface AdminPageProps {
  onBackToHome: () => void;
}

const BIOME_DETAILS: Record<string, { name: string; category: string; icon: React.ReactNode; color: string }> = {
  'overworld-day': {
    name: 'Overworld Plains',
    category: 'Daylight',
    icon: <Sun className="w-5 h-5 text-[#fcee4b]" />,
    color: 'from-[#3a8bf7] to-[#a0cbff]',
  },
  'overworld-night': {
    name: 'Deepslate Night',
    category: 'Nightfall',
    icon: <Moon className="w-5 h-5 text-[#bae6fd]" />,
    color: 'from-[#0a0c16] to-[#181d33]',
  },
  'cherry-grove': {
    name: 'Cherry Grove',
    category: 'Sakura Peaks',
    icon: <CherryBlossomIcon size={20} />,
    color: 'from-[#451c3a] to-[#692c57]',
  },
  'nether': {
    name: 'Crimson Nether',
    category: 'Underworld',
    icon: <NetherStarIcon size={20} />,
    color: 'from-[#33080e] to-[#4e0e16]',
  },
  'the-end': {
    name: 'The End Void',
    category: 'Dimension',
    icon: <EnderEyeIcon size={20} />,
    color: 'from-[#120822] to-[#200f39]',
  },
  'snowy-tundra': {
    name: 'Snowy Tundra',
    category: 'Frozen Peaks',
    icon: <SnowflakeIcon size={20} />,
    color: 'from-[#17253b] to-[#273a55]',
  },
};

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToHome }) => {
  const [password, setPassword] = useState('');
  const [sessionToken, setSessionToken] = useState(() => sessionStorage.getItem('mc_admin_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'analytics' | 'messages' | 'guestbook'>('themes');
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDashboardData = async (token: string) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await portfolioApi.getAdminData(token);
      setAdminData(data);
      setIsAuthenticated(true);
      setSessionToken(token);
      sessionStorage.setItem('mc_admin_token', token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid authorization credentials.');
      setIsAuthenticated(false);
      sessionStorage.removeItem('mc_admin_token');
      sound.playBlockHit();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionToken) {
      fetchDashboardData(sessionToken);
    }
  }, [sessionToken]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }
    fetchDashboardData(password.trim());
  };

  const handleLogout = () => {
    sound.playClick();
    setIsAuthenticated(false);
    setSessionToken('');
    setPassword('');
    sessionStorage.removeItem('mc_admin_token');
  };

  const handleAction = async (action: string, id: string) => {
    sound.playClick();
    try {
      await portfolioApi.adminAction(action, id, sessionToken);
      await fetchDashboardData(sessionToken);
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  // Theme calculations
  const themeStatsList = adminData?.analytics?.themeStats || [];
  const totalThemeSwitches = themeStatsList.reduce((acc: number, curr: any) => acc + (curr.count || 0), 0) || 1;
  const topTheme = themeStatsList.length > 0 ? themeStatsList[0] : null;

  return (
    <div className="min-h-screen bg-[#0e1015] text-zinc-100 font-sans selection:bg-[#4dedf4] selection:text-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#181b24] border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,4px_4px_0px_rgba(0,0,0,0.6)]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#12141a] border-2 border-black flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#fcee4b]" />
            </div>
            <div>
              <h1 className="font-pixel text-base sm:text-lg font-bold text-white mc-text-shadow">
                Operator Security Terminal
              </h1>
              <span className="text-[10px] font-mono text-[#55ffff]">
                ROUTE: /admin · Edge D1 Database
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playClick();
                onBackToHome();
              }}
              className="mc-button px-3 py-1.5 text-xs font-pixel space-x-1.5 text-zinc-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="mc-button px-3 py-1.5 text-xs font-pixel space-x-1.5 text-red-300 hover:text-red-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>

        {/* LOGIN SCREEN (When not authenticated) */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-[#181b24] border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.7)] text-center space-y-5">
            <div className="w-14 h-14 mx-auto bg-[#12141a] border-2 border-black flex items-center justify-center">
              <Lock className="w-7 h-7 text-[#fcee4b]" />
            </div>

            <div className="space-y-1">
              <h2 className="font-pixel text-lg font-bold text-white mc-text-shadow">
                Operator Authentication Required
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                Enter your security password to access the database analytics and management ledger.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3 pt-2">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2.5 bg-[#12141a] border-2 border-black text-sm text-center text-white focus:outline-none focus:border-[#55ffff] tracking-widest placeholder-zinc-600 font-mono"
              />

              {errorMsg && (
                <div className="p-2.5 bg-[#3b1215] border border-[#ff5555] text-xs font-pixel text-[#ff7777] animate-in fade-in">
                  ✕ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mc-button-diamond w-full py-2.5 text-xs font-pixel space-x-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Authenticate Access</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="space-y-6">

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#12141a] border-2 border-black">
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('themes');
                  }}
                  className={`px-3 py-1.5 font-pixel text-xs transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'themes' ? 'bg-[#293246] text-[#fcee4b] border border-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Theme Popularity</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('analytics');
                  }}
                  className={`px-3 py-1.5 font-pixel text-xs transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'analytics' ? 'bg-[#293246] text-[#55ffff] border border-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Visitor Traffic</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('messages');
                  }}
                  className={`px-3 py-1.5 font-pixel text-xs transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'messages' ? 'bg-[#293246] text-[#55ff55] border border-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inbox ({adminData?.messages?.length || 0})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('guestbook');
                  }}
                  className={`px-3 py-1.5 font-pixel text-xs transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'guestbook' ? 'bg-[#293246] text-[#bae6fd] border border-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Guestbook Signs ({adminData?.guestbook?.length || 0})</span>
                </button>
              </div>

              <button
                onClick={() => fetchDashboardData(sessionToken)}
                className="p-1.5 bg-[#1c202a] hover:bg-[#282e3d] border border-black text-zinc-300 hover:text-white transition-colors"
                title="Refresh Database Records"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* TAB 1: THEME & BIOME POPULARITY (Which theme people use the most) */}
            {activeTab === 'themes' && (
              <div className="space-y-5">
                {/* Winner Card Banner */}
                {topTheme && (
                  <div className="p-4 sm:p-5 bg-[#292414] border-2 border-[#fcee4b] shadow-[inset_2px_2px_#594f23,4px_4px_0px_rgba(0,0,0,0.6)] flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 bg-[#181b24] border-2 border-black flex items-center justify-center shrink-0">
                        {BIOME_DETAILS[topTheme.theme]?.icon || <Compass className="w-6 h-6 text-[#fcee4b]" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-[#fcee4b]" />
                          <span className="font-pixel text-[11px] uppercase tracking-wider text-[#fcee4b]">
                            #1 Most Popular Theme
                          </span>
                        </div>
                        <h3 className="font-pixel text-lg sm:text-xl font-bold text-white mc-text-shadow">
                          {BIOME_DETAILS[topTheme.theme]?.name || topTheme.theme}
                        </h3>
                        <p className="text-xs text-zinc-300 font-sans">
                          Chosen {topTheme.count} times ({Math.round((topTheme.count / totalThemeSwitches) * 100)}% of all theme selections)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ranked List of All Biomes with Visual Progress Bars */}
                <div className="p-5 sm:p-6 bg-[#181b24] border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015] space-y-4">
                  <div className="flex items-center justify-between border-b border-black pb-3">
                    <h3 className="font-pixel text-sm font-bold text-white uppercase tracking-wider">
                      Complete Theme Usage Ranking
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      Total Theme Interactions: {totalThemeSwitches}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Object.keys(BIOME_DETAILS).map((biomeKey, idx) => {
                      const found = themeStatsList.find((s: any) => s.theme === biomeKey);
                      const count = found ? found.count : 0;
                      const percentage = Math.round((count / totalThemeSwitches) * 100) || 0;
                      const detail = BIOME_DETAILS[biomeKey];

                      return (
                        <div
                          key={biomeKey}
                          className="p-3.5 bg-[#12141a] border border-black space-y-2 hover:border-zinc-500 transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs font-pixel">
                            <div className="flex items-center space-x-2.5">
                              <span className="w-5 text-zinc-500 font-mono text-[11px]">#{idx + 1}</span>
                              <div className="w-6 h-6 bg-[#181b24] border border-black flex items-center justify-center shrink-0">
                                {detail.icon}
                              </div>
                              <span className="font-bold text-white">{detail.name}</span>
                              <span className="text-[10px] text-zinc-400 font-sans">({detail.category})</span>
                            </div>

                            <div className="flex items-center space-x-3">
                              <span className="text-[#55ffff] font-mono">{count} selections</span>
                              <span className="font-bold text-[#fcee4b] w-10 text-right">{percentage}%</span>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-2 bg-[#0c0d12] border border-black overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#2bbcc3] to-[#55ffff] transition-all duration-500"
                              style={{ width: `${Math.max(percentage, count > 0 ? 3 : 0)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VISITOR TRAFFIC & PROJECTS */}
            {activeTab === 'analytics' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#181b24] border-2 border-black space-y-1">
                    <span className="text-[10px] font-pixel text-zinc-400 uppercase">Total Page Impressions</span>
                    <div className="text-3xl font-pixel font-bold text-[#55ffff] mc-text-shadow">
                      {adminData?.analytics?.totalViews || 0}
                    </div>
                  </div>

                  <div className="p-4 bg-[#181b24] border-2 border-black space-y-1">
                    <span className="text-[10px] font-pixel text-zinc-400 uppercase">Total Theme Switches</span>
                    <div className="text-3xl font-pixel font-bold text-[#fcee4b] mc-text-shadow">
                      {adminData?.analytics?.biomeSwitches || 0}
                    </div>
                  </div>

                  <div className="p-4 bg-[#181b24] border-2 border-black space-y-1">
                    <span className="text-[10px] font-pixel text-zinc-400 uppercase">Project Click-Throughs</span>
                    <div className="text-3xl font-pixel font-bold text-[#55ff55] mc-text-shadow">
                      {adminData?.analytics?.projectClicks || 0}
                    </div>
                  </div>
                </div>

                {/* Project Click Ranking */}
                <div className="p-5 bg-[#181b24] border-2 border-black space-y-3">
                  <h3 className="font-pixel text-sm font-bold text-white uppercase tracking-wider border-b border-black pb-2">
                    Most Clicked Projects
                  </h3>

                  {(!adminData?.analytics?.projectStats || adminData.analytics.projectStats.length === 0) ? (
                    <p className="text-xs text-zinc-400 font-sans py-4 text-center">No project clicks recorded yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {adminData.analytics.projectStats.map((p: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-[#12141a] border border-black text-xs font-pixel">
                          <span className="text-white">#{idx + 1} {p.project}</span>
                          <span className="text-[#55ffff] font-mono">{p.count} clicks</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: CONTACT INBOX */}
            {activeTab === 'messages' && (
              <div className="p-5 bg-[#181b24] border-2 border-black space-y-4">
                <div className="flex items-center justify-between border-b border-black pb-2">
                  <h3 className="font-pixel text-sm font-bold text-white uppercase tracking-wider">
                    Incoming Contact Transmissions
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    {adminData?.messages?.length || 0} Total Messages
                  </span>
                </div>

                {(!adminData?.messages || adminData.messages.length === 0) ? (
                  <p className="text-xs text-zinc-400 text-center py-8 font-sans">No contact transmissions logged yet.</p>
                ) : (
                  <div className="space-y-3">
                    {adminData.messages.map((msg: any) => (
                      <div key={msg.id} className="p-4 bg-[#12141a] border border-black space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-pixel text-white font-bold">{msg.name}</span>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-[#55ffff] font-mono text-[11px] ml-2 hover:underline"
                            >
                              &lt;{msg.email}&gt;
                            </a>
                          </div>
                          <button
                            onClick={() => handleAction('delete_message', msg.id)}
                            className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                            title="Delete message from database"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs font-pixel text-[#fcee4b]">
                          Subject: {msg.subject}
                        </div>

                        <p className="text-xs text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed pl-3 border-l-2 border-zinc-700 py-1">
                          {msg.message}
                        </p>

                        <span className="text-[10px] font-mono text-zinc-500 block pt-1">
                          Received: {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: GUESTBOOK SIGNS */}
            {activeTab === 'guestbook' && (
              <div className="p-5 bg-[#181b24] border-2 border-black space-y-4">
                <div className="flex items-center justify-between border-b border-black pb-2">
                  <h3 className="font-pixel text-sm font-bold text-white uppercase tracking-wider">
                    Signpost Ledger Moderation
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    {adminData?.guestbook?.length || 0} Signs Placed
                  </span>
                </div>

                {(!adminData?.guestbook || adminData.guestbook.length === 0) ? (
                  <p className="text-xs text-zinc-400 text-center py-8 font-sans">No guestbook signs placed yet.</p>
                ) : (
                  <div className="space-y-3">
                    {adminData.guestbook.map((sign: any) => (
                      <div key={sign.id} className="p-3.5 bg-[#12141a] border border-black flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="font-pixel font-bold text-white">{sign.author_name}</span>
                            <span className="text-[10px] font-mono text-zinc-500">[{sign.character_skin}]</span>
                            {sign.is_approved ? (
                              <span className="text-[9px] font-pixel text-[#55ff55] bg-[#142918] px-1.5 py-0.5 border border-[#55ff55]">Live</span>
                            ) : (
                              <span className="text-[9px] font-pixel text-red-400 bg-[#331114] px-1.5 py-0.5 border border-[#ff5555]">Hidden</span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-200 font-sans">"{sign.message}"</p>
                          <span className="text-[10px] font-mono text-zinc-500 block">
                            Placed: {new Date(sign.created_at).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0 pt-1">
                          <button
                            onClick={() => handleAction('toggle_guestbook', sign.id)}
                            className="p-1.5 bg-[#181b24] border border-black text-zinc-300 hover:text-[#55ffff] transition-colors"
                            title={sign.is_approved ? 'Hide from public' : 'Approve and make visible'}
                          >
                            {sign.is_approved ? <EyeOff className="w-3.5 h-3.5 text-zinc-400" /> : <Eye className="w-3.5 h-3.5 text-[#55ff55]" />}
                          </button>
                          <button
                            onClick={() => handleAction('delete_guestbook', sign.id)}
                            className="p-1.5 bg-[#181b24] border border-black text-zinc-500 hover:text-red-400 transition-colors"
                            title="Permanently delete entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
