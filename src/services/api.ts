// Client-side API Service for Cloudflare D1 Edge Functions with Local Fallback

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GuestbookEntry {
  id: string;
  author_name: string;
  character_skin: string;
  message: string;
  created_at: string;
}

export interface MinerStat {
  id?: string;
  player_name: string;
  diamonds_mined: number;
  xp: number;
  level: number;
  last_active?: string;
}

const DEFAULT_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'seed-1',
    author_name: 'Shreeharsha (Developer)',
    character_skin: 'creeper',
    message: 'Welcome to my Minecraft-themed portfolio! Leave a sign or connect anytime.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    author_name: 'Alex the Explorer',
    character_skin: 'alex',
    message: 'The pixel HUD and biome switcher are incredible. Super clean layout!',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'seed-3',
    author_name: 'Steve the Miner',
    character_skin: 'steve',
    message: 'Found diamonds in the interactive block. Great sound effects!',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

const DEFAULT_LEADERBOARD: MinerStat[] = [
  { id: '1', player_name: 'Shreeharsha (Dev)', diamonds_mined: 42, xp: 420, level: 42 },
  { id: '2', player_name: 'DiamondHunter', diamonds_mined: 24, xp: 240, level: 24 },
  { id: '3', player_name: 'NetherWalker', diamonds_mined: 16, xp: 160, level: 16 },
  { id: '4', player_name: 'PixelCrafter', diamonds_mined: 9, xp: 90, level: 9 },
];

export const portfolioApi = {
  // 1. Submit Direct Contact Transmission
  async sendContact(payload: ContactMessagePayload): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return await res.json();
      }

      if (res.status === 404) {
        // Fallback for local Vite dev server without Pages functions
        return this.localSendContact(payload);
      }

      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to dispatch transmission.');
    } catch (err: any) {
      if (err.message && err.message.includes('Failed to fetch')) {
        return this.localSendContact(payload);
      }
      throw err;
    }
  },

  localSendContact(payload: ContactMessagePayload) {
    const existing = JSON.parse(localStorage.getItem('mc_local_contact_messages') || '[]');
    existing.push({
      id: 'local-' + Date.now(),
      ...payload,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem('mc_local_contact_messages', JSON.stringify(existing));

    return {
      success: true,
      message: 'Transmission successfully delivered and recorded to ledger!',
    };
  },

  // 2. Fetch Guestbook Signatures
  async getGuestbook(): Promise<GuestbookEntry[]> {
    try {
      const res = await fetch('/api/guestbook');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.entries) && data.entries.length > 0) {
          return data.entries;
        }
      }
      return this.getLocalGuestbook();
    } catch {
      return this.getLocalGuestbook();
    }
  },

  getLocalGuestbook(): GuestbookEntry[] {
    const saved = localStorage.getItem('mc_local_guestbook');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_GUESTBOOK;
  },

  // 3. Sign the Guestbook
  async signGuestbook(entry: { author_name: string; character_skin: string; message: string }): Promise<GuestbookEntry> {
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        const data = await res.json();
        return data.entry;
      }

      if (res.status === 404) {
        return this.localSignGuestbook(entry);
      }

      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to sign guestbook.');
    } catch (err: any) {
      if (err.message && err.message.includes('Failed to fetch')) {
        return this.localSignGuestbook(entry);
      }
      throw err;
    }
  },

  localSignGuestbook(entry: { author_name: string; character_skin: string; message: string }): GuestbookEntry {
    const current = this.getLocalGuestbook();
    const newEntry: GuestbookEntry = {
      id: 'local-' + Date.now(),
      ...entry,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    localStorage.setItem('mc_local_guestbook', JSON.stringify(updated));
    return newEntry;
  },

  // 4. Fetch Miner Leaderboard
  async getLeaderboard(): Promise<MinerStat[]> {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.leaderboard) && data.leaderboard.length > 0) {
          return data.leaderboard;
        }
      }
      return this.getLocalLeaderboard();
    } catch {
      return this.getLocalLeaderboard();
    }
  },

  getLocalLeaderboard(): MinerStat[] {
    const saved = localStorage.getItem('mc_local_leaderboard');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_LEADERBOARD;
  },

  // 5. Sync/Claim Mining Score
  async recordMiner(stat: { player_name: string; diamonds_mined: number; xp: number; level: number }): Promise<MinerStat[]> {
    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stat),
      });

      if (res.ok) {
        return await this.getLeaderboard();
      }

      return this.localRecordMiner(stat);
    } catch {
      return this.localRecordMiner(stat);
    }
  },

  localRecordMiner(stat: { player_name: string; diamonds_mined: number; xp: number; level: number }): MinerStat[] {
    const list = this.getLocalLeaderboard();
    const existingIndex = list.findIndex(
      (m) => m.player_name.toLowerCase() === stat.player_name.toLowerCase()
    );

    if (existingIndex >= 0) {
      list[existingIndex].diamonds_mined = Math.max(list[existingIndex].diamonds_mined, stat.diamonds_mined);
      list[existingIndex].xp = Math.max(list[existingIndex].xp, stat.xp);
      list[existingIndex].level = Math.max(list[existingIndex].level, stat.level);
    } else {
      list.push({
        id: 'local-' + Date.now(),
        ...stat,
      });
    }

    list.sort((a, b) => b.diamonds_mined - a.diamonds_mined || b.xp - a.xp);
    localStorage.setItem('mc_local_leaderboard', JSON.stringify(list));
    return list;
  },

  // 6. Privacy Telemetry & Event Tracking
  async trackEvent(event_type: string, event_value: string = '') {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type, event_value }),
      });
    } catch {
      // Fire and forget
    }
  },

  // 7. Admin Dashboard Fetch
  async getAdminData(pin: string) {
    const cleanPin = pin.trim();
    const res = await fetch('/api/admin', {
      headers: {
        Authorization: `Bearer ${cleanPin}`,
        'X-Admin-Token': cleanPin,
      },
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(
        'Server returned HTML instead of JSON. Ensure the local dev server is restarted or Cloudflare Pages Functions are active.'
      );
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Invalid Admin Password');
    }
    return await res.json();
  },

  // 8. Admin Moderation Action
  async adminAction(action: string, id: string, pin: string) {
    const cleanPin = pin.trim();
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cleanPin}`,
        'X-Admin-Token': cleanPin,
      },
      body: JSON.stringify({ action, id }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Action failed');
    }
    return await res.json();
  },
};
