// Client API service for apps/professional

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: string;
  created_at: string;
}

export interface AdminAnalytics {
  totalViews: number;
  biomeSwitches?: number;
  projectClicks: number;
  themeStats?: Array<{ theme: string; count: number }>;
  projectStats?: Array<{ project: string; count: number }>;
}

export interface AdminGuestbookEntry {
  id: string;
  author_name: string;
  character_skin?: string;
  message: string;
  is_approved: number;
  created_at: string;
}

export interface AdminDashboardData {
  messages: AdminMessage[];
  guestbook: AdminGuestbookEntry[];
  analytics: AdminAnalytics;
  source: 'd1-database' | 'local-fallback' | 'simulated';
}

export const professionalApi = {
  // Fetch admin dashboard telemetry and messages
  async getAdminData(secret: string): Promise<AdminDashboardData> {
    const res = await fetch('/api/admin', {
      headers: {
        Authorization: `Bearer ${secret}`,
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

    const data = await res.json();

    // Also merge any local fallback inquiries saved in localStorage (offline/local dev)
    try {
      const offlineInquiries: any[] = JSON.parse(
        localStorage.getItem('shreeharsha_offline_inquiries') || '[]'
      );
      if (offlineInquiries.length > 0) {
        const localFormatted: AdminMessage[] = offlineInquiries.map((inq, idx) => ({
          id: `local-${idx}-${Date.now()}`,
          name: inq.name || 'Anonymous',
          email: inq.email || 'no-email',
          subject: inq.subject || 'Portfolio Inquiry (Local)',
          message: inq.message || '',
          status: 'unread (local storage)',
          created_at: inq.timestamp || new Date().toISOString(),
        }));
        
        // Merge without duplicates by email+timestamp
        const existingSet = new Set(data.messages.map((m: AdminMessage) => `${m.email}-${m.created_at}`));
        for (const localMsg of localFormatted) {
          if (!existingSet.has(`${localMsg.email}-${localMsg.created_at}`)) {
            data.messages.unshift(localMsg);
          }
        }
      }
    } catch {
      // Ignore local storage parsing issues
    }

    return data;
  },

  // Execute admin moderation actions (e.g. delete message, toggle guestbook entry)
  async adminAction(action: 'delete_message' | 'delete_guestbook' | 'toggle_guestbook', id: string, secret: string) {
    // If it's a local inquiry, remove from localStorage
    if (id.startsWith('local-')) {
      try {
        const offlineInquiries: any[] = JSON.parse(
          localStorage.getItem('shreeharsha_offline_inquiries') || '[]'
        );
        const filtered = offlineInquiries.filter((_, idx) => !id.includes(`local-${idx}-`));
        localStorage.setItem('shreeharsha_offline_inquiries', JSON.stringify(filtered));
        return { success: true, message: 'Local inquiry removed' };
      } catch {
        return { success: true };
      }
    }

    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ action, id }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { success: true };
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Admin action failed');
    }

    return await res.json();
  },

  // Track client analytics event
  async trackEvent(event_type: string, event_value: string = '') {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type, event_value }),
      });
    } catch {
      // Silent telemetry
    }
  },
};
