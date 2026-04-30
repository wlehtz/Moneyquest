const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '3000', 10);
const ROOT = path.resolve(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0] || '/';
  if (urlPath === '/') urlPath = '/index.html';

  // Protege contra path traversal
  const normalized = path.posix.normalize(urlPath).replace(/^\/+/, '');
  if (normalized.includes('..')) {
    res.writeHead(400); res.end('Invalid request');
    return;
  }

  const filePath = path.join(ROOT, normalized);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden');
    return;
  }

  // API endpoints
  if (req.method === 'GET' && req.url.startsWith('/api/db')) {
    fs.readFile(path.join(ROOT, 'db.json'), 'utf8', (err, data) => {
      if (err) { res.writeHead(500); res.end('Server error'); return; }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/api/login')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const {email, password} = JSON.parse(body || '{}');
        fs.readFile(path.join(ROOT, 'db.json'), 'utf8', (err, data) => {
          if (err) { res.writeHead(500); res.end('Server error'); return; }
          const db = JSON.parse(data);
          const user = db.users.find(u => u.email === email && u.password === password);
          if (!user) { res.writeHead(401); res.end(JSON.stringify({ error:'invalid credentials' })); return; }
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ email:user.email, name:user.name }));
        });
      } catch (e) {
        res.writeHead(400); res.end('Bad request');
      }
    });
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // fallback to index.html for client-side routing
      sendFile(res, path.join(ROOT, 'index.html'));
      return;
    }
    sendFile(res, filePath);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`MoneyQuest rodando na porta ${PORT}`);
});
