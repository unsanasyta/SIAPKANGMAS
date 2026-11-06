// Prepares the Netlify publish directory ("dist") after `vite build`.
// The Laravel Vite plugin writes compiled assets to public/build, so the
// public/ folder (assets, images, favicon, robots.txt, _redirects) is copied
// into dist/. Laravel renders pages with PHP, which Netlify cannot run, so a
// static placeholder index.html is generated when none exists.
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';

const src = 'public';
const out = 'dist';

rmSync(out, { recursive: true, force: true });
cpSync(src, out, {
    recursive: true,
    filter: (path) => !/\.(php|htaccess)$/.test(path) && !path.endsWith('.htaccess'),
});

if (!existsSync(`${out}/index.html`)) {
    writeFileSync(
        `${out}/index.html`,
        `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SIAPKANGMAS</title>
  <link rel="icon" href="/favicon.ico">
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#f8fafc;color:#0f172a}
    main{text-align:center;padding:2rem;max-width:32rem}
    img{max-width:220px;height:auto;margin-bottom:1.5rem}
    h1{font-size:1.5rem;margin:0 0 .5rem}
    p{color:#475569;line-height:1.6}
  </style>
</head>
<body>
  <main>
    <img src="/images/logo.png" alt="SIAPKANGMAS">
    <h1>SIAPKANGMAS</h1>
    <p>Layanan sedang disiapkan. Silakan kembali lagi nanti.</p>
  </main>
</body>
</html>
`,
    );
}

console.log(`Prepared ${out}/ from ${src}/`);
