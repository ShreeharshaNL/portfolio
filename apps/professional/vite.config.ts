import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

/**
 * Local development middleware for /api/* during pure Vite development
 */
function localDevApiPlugin(): Plugin {
  return {
    name: 'local-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/')) {
          return next();
        }

        // Read local secret from root .env or .dev.vars
        let localSecret = '';
        try {
          const rootDir = path.resolve(__dirname, '../..');
          const envFiles = ['.env', '.dev.vars'];
          for (const file of envFiles) {
            const p = path.join(rootDir, file);
            if (fs.existsSync(p)) {
              const content = fs.readFileSync(p, 'utf-8');
              const match = content.match(/(?:PRO_ADMIN_SECRET|ADMIN_SECRET)\s*=\s*([^\r\n#]+)/);
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

          // If a local secret is configured, authenticate against it
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
                projectClicks: 18,
                themeStats: [],
                projectStats: [
                  { project: 'LegalLens', count: 14 },
                  { project: 'LabelWise', count: 10 },
                  { project: 'Freelancing Platform', count: 6 },
                ],
              },
              source: 'local-vite-dev',
            })
          );
          return;
        }

        if (url === '/api/contact') {
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, message: 'Inquiry received (local dev mode)' }));
          return;
        }

        if (url === '/api/analytics') {
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true }));
          return;
        }

        next();
      });
    },
  };
}

// Professional Portfolio Vite Configuration
export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react(), localDevApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  publicDir: path.resolve(__dirname, 'public'),
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js'),
  },
  server: {
    port: 3001,
    host: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: false,
  },
});
