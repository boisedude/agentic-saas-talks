// Simple HTTP server that mimics Apache .htaccess URL rewriting
// Used for testing static export routing behavior

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const OUT_DIR = path.join(__dirname, 'out');

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

const server = http.createServer((req, res) => {
  let filePath = req.url;

  // Remove query parameters
  filePath = filePath.split('?')[0];

  // Handle trailing slash
  if (filePath.endsWith('/') && filePath !== '/') {
    filePath = filePath.slice(0, -1);
  }

  // Rewrite rules (mimicking .htaccess)
  if (filePath === '/' || filePath === '') {
    filePath = '/index.html';
  } else if (filePath === '/episodes') {
    filePath = '/episodes.html';
  } else if (filePath === '/hosts') {
    filePath = '/hosts.html';
  } else if (!path.extname(filePath)) {
    // Try to serve .html version
    const htmlPath = path.join(OUT_DIR, filePath + '.html');
    if (fs.existsSync(htmlPath)) {
      filePath = filePath + '.html';
    }
  }

  const fullPath = path.join(OUT_DIR, filePath);

  // Check if file exists
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, serve 404.html
      const notFoundPath = path.join(OUT_DIR, '404.html');
      fs.readFile(notFoundPath, (err404, content404) => {
        if (err404) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found', 'utf-8');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content404, 'utf-8');
        }
      });
      return;
    }

    // Read and serve the file
    fs.readFile(fullPath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end('Server Error: ' + error.code, 'utf-8');
        return;
      }

      const ext = path.extname(fullPath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });
});

server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${OUT_DIR}`);
  console.log(`Mimicking Apache .htaccess URL rewriting`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
