import { useEffect } from 'react';
import site from '../content/site.json';
import {
  absoluteUrl,
  buildOrganizationSchema,
  getPageMeta,
} from '../seo/siteMeta';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  document.getElementById(id)?.remove();
}

/**
 * Keeps document head in sync during client-side route changes.
 * Initial HTML already includes meta + schema from the Vite SEO plugin.
 */
export default function SEO({
  title,
  description,
  path = '/',
  ogType = 'website',
  jsonLd = [],
}) {
  const defaults = getPageMeta(path);
  const fullTitle = title
    ? (title.includes(site.name) ? title : `${title} | ${site.name}`)
    : defaults.title;
  const metaDescription = description || defaults.description;
  const type = ogType || defaults.ogType;
  const url = absoluteUrl(path);
  const image = `${site.url}/og-image.svg`;
  const jsonLdKey = JSON.stringify(jsonLd);

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', metaDescription);
    upsertMeta('name', 'robots', 'index, follow');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', metaDescription);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', site.name);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', metaDescription);
    upsertMeta('name', 'twitter:image', image);

    upsertJsonLd('schema-organization', buildOrganizationSchema());

    const schemas = JSON.parse(jsonLdKey);
    schemas.forEach((schema, index) => {
      upsertJsonLd(`schema-page-${index}`, schema);
    });

    const extraCount = schemas.length;
    return () => {
      for (let i = 0; i < extraCount; i += 1) {
        removeJsonLd(`schema-page-${i}`);
      }
    };
  }, [fullTitle, metaDescription, url, image, type, jsonLdKey]);

  return null;
}
