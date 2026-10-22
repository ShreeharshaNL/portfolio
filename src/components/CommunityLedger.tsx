import React, { useState, useEffect } from 'react';
import { portfolioApi, GuestbookEntry, MinerStat } from '../services/api';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { CreeperFace, DiamondGem, EnderEyeIcon } from './MinecraftIcons';
import { Send, Trophy, MessageSquare, Loader2, Sparkles } from 'lucide-react';

export const CommunityLedger: React.FC = () => {
  const { diamondsMined, xp, level, unlockAdvancement } = useGame();
  
  // Guestbook state
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [characterSkin, setCharacterSkin] = useState('steve');
  const [noteMessage, setNoteMessage] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [guestbookFeedback, setGuestbookFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<MinerStat[]>([]);
  const [minerTag, setMinerTag] = useState('');
  const [isSyncingMiner, setIsSyncingMiner] = useState(false);
  const [minerFeedback, setMinerFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Initial fetch of guestbook & leaderboard
    portfolioApi.getGuestbook().then(setEntries).catch(() => {});
    portfolioApi.getLeaderboard().then(setLeaderboard).catch(() => {});
  }, []);

  const handleSignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setGuestbookFeedback(null);

    if (!authorName.trim() || authorName.trim().length < 2) {
      setGuestbookFeedback({ type: 'error', text: 'Please enter your name or gamer tag (at least 2 chars).' });
      return;
    }

    if (!noteMessage.trim() || noteMessage.trim().length < 3) {
      setGuestbookFeedback({ type: 'error', text: 'Sign message must be at least 3 characters.' });
      return;
    }

    setIsSigning(true);
    try {
      const newEntry = await portfolioApi.signGuestbook({
        author_name: authorName.trim(),
        character_skin: characterSkin,
        message: noteMessage.trim(),
      });

      sound.playLevelUp();
      unlockAdvancement('welcome');
      setEntries((prev) => [newEntry, ...prev.filter((item) => item.id !== newEntry.id)]);
      setGuestbookFeedback({ type: 'success', text: 'Wooden signpost placed and recorded in ledger!' });
      setNoteMessage('');
    } catch (err: any) {
      sound.playBlockHit();
      setGuestbookFeedback({ type: 'error', text: err.message || 'Failed to place signpost.' });
    } finally {
      setIsSigning(false);
    }
  };

  const handleSyncMiner = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setMinerFeedback(null);

    const name = minerTag.trim() || authorName.trim();
    if (!name || name.length < 2) {
      setMinerFeedback({ type: 'error', text: 'Please enter a Miner Tag (at least 2 chars).' });
      return;
    }

    setIsSyncingMiner(true);
    try {
      const updated = await portfolioApi.recordMiner({
        player_name: name,
        diamonds_mined: diamondsMined,
        xp,
        level,
      });

      sound.playLevelUp();
      unlockAdvancement('diamonds');
      setLeaderboard(updated);
      setMinerFeedback({ type: 'success', text: `Ranks updated! ${name} is registered with ${diamondsMined} diamonds!` });
    } catch (err: any) {
      sound.playBlockHit();
      setMinerFeedback({ type: 'error', text: err.message || 'Failed to sync miner stats.' });
    } finally {
      setIsSyncingMiner(false);
    }
  };

  const renderSkinIcon = (skin: string) => {
    switch (skin.toLowerCase()) {
      case 'creeper':
        return <CreeperFace size={18} />;
      case 'enderman':
        return <EnderEyeIcon size={18} />;
      case 'knight':
        return <DiamondGem size={18} />;
      case 'alex':
        return (
          <div className="w-4 h-4 bg-[#b5653b] border border-black flex items-center justify-center text-[9px] font-pixel text-white">
            A
          </div>
        );
      default:
        return (
          <div className="w-4 h-4 bg-[#2b72a6] border border-black flex items-center justify-center text-[9px] font-pixel text-white">
            S
          </div>
        );
    }
  };

  return (
    <section id="guestbook" className="py-24 border-t-2 border-black relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#181b24] border-2 border-black text-xs font-pixel text-[#55ffff] shadow-[inset_1px_1px_#3d4559,2px_2px_0px_rgba(0,0,0,0.5)]">
            <Trophy size={14} />
            <span>[COMMUNITY LEDGER & DATABASE]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-pixel font-bold text-white tracking-wide mc-text-shadow">
            Signpost & Miner Leaderboard
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-sans">
            Backed by Cloudflare D1 edge SQL. Leave your mark on the signpost and register your diamond mining stats.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Minecraft Guestbook Signpost (Span 7) */}
          <div className="lg:col-span-7 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-black pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-[#fcee4b]" />
                <h3 className="font-pixel text-base font-bold text-white mc-text-shadow">
                  Visitor Signpost Ledger
                </h3>
              </div>
              <span className="text-[10px] font-pixel px-2 py-0.5 bg-[#12141a] border border-black text-[#55ffff]">
                {entries.length} Signs Placed
              </span>
            </div>

            {/* Form to Sign */}
            <form onSubmit={handleSignSubmit} className="p-4 bg-[#12141a] border-2 border-black space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-pixel text-zinc-300 mb-1">
                    Your Name / Gamer Tag *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. NetherTraveler"
                    maxLength={30}
                    className="w-full px-2.5 py-1.5 bg-[#181b24] border border-black text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#55ffff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-pixel text-zinc-300 mb-1">
                    Skin / Badge
                  </label>
                  <div className="flex items-center space-x-1.5">
                    {['steve', 'alex', 'knight', 'creeper', 'enderman'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          sound.playPop();
                          setCharacterSkin(s);
                        }}
                        className={`w-7 h-7 flex items-center justify-center border transition-all ${
                          characterSkin === s
                            ? 'bg-[#293246] border-[#fcee4b] shadow-[0_0_6px_rgba(252,238,75,0.6)] scale-105'
                            : 'bg-[#181b24] border-black hover:border-zinc-500'
                        }`}
                        title={`Select ${s} skin`}
                      >
                        {renderSkinIcon(s)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-pixel text-zinc-300 mb-1">
                  Sign Note (Max 180 chars) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={noteMessage}
                  onChange={(e) => setNoteMessage(e.target.value)}
                  placeholder="Drop a note, feedback, or say hello..."
                  maxLength={180}
                  className="w-full px-2.5 py-1.5 bg-[#181b24] border border-black text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#55ffff]"
                />
              </div>

              {guestbookFeedback && (
                <div
                  className={`p-2 border text-[11px] font-pixel animate-in fade-in ${
                    guestbookFeedback.type === 'success'
                      ? 'bg-[#122e1b] border-[#55ff55] text-[#55ff55]'
                      : 'bg-[#3b1215] border-[#ff5555] text-[#ff7777]'
                  }`}
                >
                  {guestbookFeedback.type === 'success' ? '✓ ' : '✕ '}
                  {guestbookFeedback.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSigning}
                className="mc-button-emerald px-4 py-2 text-xs font-pixel space-x-1.5 w-full sm:w-auto"
              >
                {isSigning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Carving Wooden Sign...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Carve Sign on Signpost</span>
                  </>
                )}
              </button>
            </form>

            {/* List of Recent Signs */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 bg-[#12141a] border border-black hover:border-zinc-500 transition-colors space-y-1.5 shadow-[inset_1px_1px_#0a0c10]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#181b24] border border-black flex items-center justify-center shrink-0">
                        {renderSkinIcon(entry.character_skin)}
                      </div>
                      <span className="font-pixel font-bold text-white mc-text-shadow">
                        {entry.author_name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed pl-8">
                    "{entry.message}"
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Column 2: Global Miner Leaderboard (Span 5) */}
          <div className="lg:col-span-5 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-black pb-3">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-[#55ffff]" />
                <h3 className="font-pixel text-base font-bold text-white mc-text-shadow">
                  Top Miner Rankings
                </h3>
              </div>
              <span className="text-[10px] font-pixel text-[#55ff55]">
                Level {level} · {diamondsMined} 💎
              </span>
            </div>

            {/* Player's Current Mining Stats Box & Sync form */}
            <div className="p-3 bg-[#12141a] border-2 border-black space-y-2.5">
              <div className="flex items-center justify-between text-xs font-pixel">
                <span className="text-zinc-400">Your Session Stats:</span>
                <span className="text-[#55ffff]">{diamondsMined} Diamonds · {xp} XP</span>
              </div>

              <form onSubmit={handleSyncMiner} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={minerTag}
                    onChange={(e) => setMinerTag(e.target.value)}
                    placeholder="Enter Miner Tag..."
                    maxLength={20}
                    className="flex-1 px-2.5 py-1.5 bg-[#181b24] border border-black text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#55ffff]"
                  />
                  <button
                    type="submit"
                    disabled={isSyncingMiner}
                    className="mc-button-diamond px-3 py-1.5 text-xs font-pixel space-x-1 shrink-0"
                  >
                    {isSyncingMiner ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Claim Rank</span>}
                  </button>
                </div>
              </form>

              {minerFeedback && (
                <div
                  className={`p-2 border text-[10px] font-pixel animate-in fade-in ${
                    minerFeedback.type === 'success'
                      ? 'bg-[#122e1b] border-[#55ff55] text-[#55ff55]'
                      : 'bg-[#3b1215] border-[#ff5555] text-[#ff7777]'
                  }`}
                >
                  {minerFeedback.type === 'success' ? '✓ ' : '✕ '}
                  {minerFeedback.text}
                </div>
              )}
            </div>

            {/* Leaderboard Ranks */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {leaderboard.map((miner, idx) => {
                const isGold = idx === 0;
                const isSilver = idx === 1;
                const isBronze = idx === 2;

                return (
                  <div
                    key={miner.id || idx}
                    className={`p-2.5 border flex items-center justify-between transition-colors ${
                      isGold
                        ? 'bg-[#292414] border-[#fcee4b] shadow-[inset_1px_1px_#594f23]'
                        : isSilver
                        ? 'bg-[#202534] border-[#cbd5e1]'
                        : isBronze
                        ? 'bg-[#291d17] border-[#d97706]'
                        : 'bg-[#12141a] border-black'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Rank Number */}
                      <span
                        className={`w-6 h-6 flex items-center justify-center font-pixel text-xs font-bold ${
                          isGold
                            ? 'text-[#fcee4b] mc-text-shadow'
                            : isSilver
                            ? 'text-zinc-200'
                            : isBronze
                            ? 'text-amber-400'
                            : 'text-zinc-500'
                        }`}
                      >
                        #{idx + 1}
                      </span>

                      <div>
                        <div className="font-pixel text-xs font-bold text-white mc-text-shadow flex items-center space-x-1.5">
                          <span>{miner.player_name}</span>
                          {isGold && <Sparkles className="w-3 h-3 text-[#fcee4b]" />}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Level {miner.level} · {miner.xp} XP
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-xs font-pixel text-[#55ffff] font-bold mc-text-shadow">
                      <DiamondGem size={14} />
                      <span>{miner.diamonds_mined}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
