import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function localDevApiPlugin(): Plugin {
  return {
    name: 'local-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/')) {
          return next();
        }

        let localSecret = '';
        try {
          const envFiles = ['.env', '.dev.vars'];
          for (const file of envFiles) {
            const p = path.resolve(__dirname, file);
            if (fs.existsSync(p)) {
              const content = fs.readFileSync(p, 'utf-8');
              const match = content.match(/(?:MC_ADMIN_SECRET|ADMIN_SECRET)\s*=\s*([^\r\n#]+)/);
              if (match && match[1]) {
                localSecret = match[1].trim();
                break;
              }
            }
          }
        } catch {}

        res.setHeader('Content-Type', 'application/json');

        if (url === '/api/admin' || url.startsWith('/api/admin?')) {
          const authHeader = req.headers['authorization'] || '';
          const token = authHeader.replace(/^Bearer\s+/i, '').trim();

          if (localSecret && token !== localSecret) {
            res.statusCode = 401;
            res.end(JSON.stringify({ error: 'Unauthorized: Invalid Admin Password' }));
            return;
          }

          if (req.method === 'POST') {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Action registered locally' }));
            return;
          }

          res.statusCode = 200;
          res.end(
            JSON.stringify({
              messages: [],
              guestbook: [],
              analytics: {
                totalViews: 42,
                biomeSwitches: 14,
                projectClicks: 18,
                themeStats: [],
                projectStats: [],
              },
              source: 'local-vite-dev',
            })
          );
          return;
        }

        if (url === '/api/contact') {
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, message: 'Transmission received (local dev mode)' }));
          return;
        }

        if (url === '/api/analytics') {
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true }));
          return;
        }

        if (url === '/api/guestbook') {
          res.statusCode = 200;
          res.end(JSON.stringify({ entries: [], source: 'local-vite-dev' }));
          return;
        }

        if (url === '/api/leaderboard') {
          res.statusCode = 200;
          res.end(JSON.stringify({ leaderboard: [], source: 'local-vite-dev' }));
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localDevApiPlugin()],
  server: {
    port: 3000,
    host: true,
  },
});
