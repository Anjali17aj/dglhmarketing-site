import fs from 'node:fs';
import path from 'node:path';
import { applySeoToHtml, pages } from './src/seo/siteMeta.js';

/**
 * Puts meta + JSON-LD into the built HTML for every route so crawlers and
 * social scrapers do not depend on client-side JavaScript.
 */
export function seoHtmlPlugin() {
  return {
    name: 'seo-html',
    transformIndexHtml(html) {
      return applySeoToHtml(html, '/');
    },
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const baseHtml = fs.readFileSync(indexPath, 'utf8');

      Object.keys(pages).forEach((route) => {
        if (route === '/') {
          fs.writeFileSync(indexPath, applySeoToHtml(baseHtml, '/'));
          return;
        }

        const routeDir = path.join(distDir, route.replace(/^\//, ''));
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(
          path.join(routeDir, 'index.html'),
          applySeoToHtml(baseHtml, route),
        );
      });
    },
  };
}
