import React, { useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';
import { sound } from '../utils/audio';
import { X, Shield, Lock, Trash2, Eye, EyeOff, Loader2, BarChart2, Mail, MessageSquare } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState(() => localStorage.getItem('mc_admin_pin') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'messages' | 'guestbook'>('analytics');
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const data = await portfolioApi.getAdminData(pin);
      setAdminData(data);
      setIsAuthenticated(true);
      localStorage.setItem('mc_admin_pin', pin);
      sound.playLevelUp();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid Admin PIN');
      sound.playBlockHit();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && pin) {
      handleLogin();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAction = async (action: string, id: string) => {
    sound.playClick();
    try {
      await portfolioApi.adminAction(action, id, pin);
      // Refresh data
      const data = await portfolioApi.getAdminData(pin);
      setAdminData(data);
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-[#1c202a] border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,10px_10px_0px_rgba(0,0,0,0.8)] p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-[#8f3e2b] border-2 border-black shadow-[inset_1px_1px_#cf7a63] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#fcee4b]" />
            </div>
            <div>
              <h3 className="font-pixel text-base sm:text-lg font-bold text-white mc-text-shadow">
                Operator Command Block (Admin CMS)
              </h3>
              <p className="text-[11px] font-sans text-zinc-400">
                Manage contact transmissions, visitor guestbook & edge analytics
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 bg-[#616161] hover:bg-[#727272] border border-black shadow-[inset_1px_1px_#9c9c9c,inset_-1px_-1px_#383838] flex items-center justify-center text-white"
            aria-label="Close Admin Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PIN Authentication State */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="max-w-md mx-auto py-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-[#12141a] border-2 border-black flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#fcee4b]" />
            </div>
            <div>
              <h4 className="font-pixel text-base text-white">Enter Operator PIN</h4>
              <p className="text-xs text-zinc-400 mt-1">Default operator key is your graduation year: <strong>2027</strong></p>
            </div>

            <div className="flex gap-2 max-w-xs mx-auto">
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (e.g. 2027)"
                className="flex-1 px-3 py-2 bg-[#12141a] border-2 border-black text-sm text-center tracking-widest text-white focus:outline-none focus:border-[#55ffff]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="mc-button-diamond px-4 py-2 text-xs font-pixel"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Unlock</span>}
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs font-pixel text-red-400 animate-in fade-in">{errorMsg}</p>
            )}
          </form>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-4">
            {/* Tabs Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black pb-2">
              <div className="flex bg-[#12141a] border border-black p-0.5">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('analytics');
                  }}
                  className={`px-3 py-1 font-pixel text-xs transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'analytics' ? 'bg-[#2b3345] text-[#55ffff]' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Telemetry</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('messages');
                  }}
                  className={`px-3 py-1 font-pixel text-xs transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'messages' ? 'bg-[#2b3345] text-[#55ffff]' : 'text-zinc-400 hover:text-white'
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
                  className={`px-3 py-1 font-pixel text-xs transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'guestbook' ? 'bg-[#2b3345] text-[#55ffff]' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Signs ({adminData?.guestbook?.length || 0})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem('mc_admin_pin');
                }}
                className="text-[10px] font-pixel text-zinc-400 hover:text-red-400"
              >
                Log Out
              </button>
            </div>

            {/* TAB 1: Analytics & Telemetry */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-[#12141a] border-2 border-black space-y-1">
                    <span className="text-[10px] font-pixel text-zinc-400 uppercase">Page Impressions</span>
                    <div className="text-2xl font-pixel font-bold text-[#55ffff] mc-text-shadow">
                      {adminData?.analytics?.totalViews || 0}
                    </div>
                  </div>
                  <div className="p-4 bg-[#12141a] border-2 border-black space-y-1">
                    <span className="text-[10px] font-pixel text-zinc-400 uppercase">Biome Atmospheric Switches</span>
                    <div className="text-2xl font-pixel font-bold text-[#fcee4b] mc-text-shadow">
                      {adminData?.analytics?.biomeSwitches || 0}
                    </div>
                  </div>
                  <div className="p-4 bg-[#12141a] border-2 border-black space-y-1">
                    <span className="text-[10px] font-pixel text-zinc-400 uppercase">Project Click-Throughs</span>
                    <div className="text-2xl font-pixel font-bold text-[#55ff55] mc-text-shadow">
                      {adminData?.analytics?.projectClicks || 0}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#12141a] border border-black text-xs text-zinc-400 font-sans space-y-1">
                  <p className="font-pixel text-[#55ffff]">✦ Privacy First Edge Telemetry</p>
                  <p>All events are logged directly into your Cloudflare D1 SQL database without tracking cookies or third-party ad scripts.</p>
                </div>
              </div>
            )}

            {/* TAB 2: Direct Contact Inbox */}
            {activeTab === 'messages' && (
              <div className="space-y-3">
                {(!adminData?.messages || adminData.messages.length === 0) ? (
                  <p className="text-xs text-zinc-400 text-center py-6">No contact messages received yet.</p>
                ) : (
                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {adminData.messages.map((msg: any) => (
                      <div key={msg.id} className="p-3 bg-[#12141a] border border-black space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-pixel text-white font-bold">{msg.name}</span>
                            <span className="text-zinc-400 font-mono text-[11px] ml-2">&lt;{msg.email}&gt;</span>
                          </div>
                          <button
                            onClick={() => handleAction('delete_message', msg.id)}
                            className="text-zinc-500 hover:text-red-400 p-1"
                            title="Delete message from database"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-pixel text-[#55ffff]">
                          Subject: {msg.subject}
                        </div>
                        <p className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed pl-2 border-l border-zinc-700">
                          {msg.message}
                        </p>
                        <span className="text-[10px] font-mono text-zinc-500 block">
                          Received: {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Guestbook Moderation */}
            {activeTab === 'guestbook' && (
              <div className="space-y-3">
                {(!adminData?.guestbook || adminData.guestbook.length === 0) ? (
                  <p className="text-xs text-zinc-400 text-center py-6">No guestbook entries found.</p>
                ) : (
                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {adminData.guestbook.map((sign: any) => (
                      <div key={sign.id} className="p-3 bg-[#12141a] border border-black space-y-1.5 flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="font-pixel font-bold text-white">{sign.author_name}</span>
                            <span className="text-[10px] font-mono text-zinc-500">[{sign.character_skin}]</span>
                            {sign.is_approved ? (
                              <span className="text-[9px] font-pixel text-[#55ff55]">Live</span>
                            ) : (
                              <span className="text-[9px] font-pixel text-red-400">Hidden</span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-300 font-sans">"{sign.message}"</p>
                          <span className="text-[10px] font-mono text-zinc-500 block">
                            {new Date(sign.created_at).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0 pt-1">
                          <button
                            onClick={() => handleAction('toggle_guestbook', sign.id)}
                            className="p-1.5 bg-[#181b24] border border-black text-zinc-300 hover:text-[#55ffff]"
                            title={sign.is_approved ? 'Hide from public' : 'Approve and show'}
                          >
                            {sign.is_approved ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#55ff55]" />}
                          </button>
                          <button
                            onClick={() => handleAction('delete_guestbook', sign.id)}
                            className="p-1.5 bg-[#181b24] border border-black text-zinc-500 hover:text-red-400"
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
