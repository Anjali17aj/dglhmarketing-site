import site from '../content/site.json';
import product from '../content/product.json';
import pricing from '../content/pricing.json';
import contact from '../content/contact.json';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: site.logo,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: [site.social.youtube, site.social.linkedin],
  };
}

export function buildProductSchema(data = product.productSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    applicationCategory: data.category,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency,
    },
    provider: {
      '@type': 'Organization',
      name: site.name,
    },
  };
}

export function buildFAQSchema(faqs = pricing.faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function absoluteUrl(path) {
  return `${site.url}${path === '/' ? '' : path}`;
}

function pageTitle(title) {
  return title.includes(site.name) ? title : `${title} | ${site.name}`;
}


export const pages = {
  '/': {
    path: '/',
    title: pageTitle(`${site.name} — ${site.tagline}`),
    description: site.description,
    ogType: 'website',
    jsonLd: [],
  },
  '/product': {
    path: '/product',
    title: pageTitle('Product — DigitalHeros Platform'),
    description: product.hero.subtitle,
    ogType: 'website',
    jsonLd: [buildProductSchema()],
  },
  '/pricing': {
    path: '/pricing',
    title: pageTitle('Pricing — Plans for every stage'),
    description: pricing.intro.subtitle,
    ogType: 'website',
    jsonLd: [buildFAQSchema()],
  },
  '/contact': {
    path: '/contact',
    title: pageTitle('Contact — Talk to our team'),
    description: contact.hero.subtitle,
    ogType: 'website',
    jsonLd: [],
  },
};

export function getPageMeta(path = '/') {
  return pages[path] || pages['/'];
}


export function applySeoToHtml(html, path = '/') {
  const page = getPageMeta(path);
  const url = absoluteUrl(page.path);
  const image = `${site.url}/og-image.svg`;
  const org = buildOrganizationSchema();
  const pageSchemas = page.jsonLd || [];

  const headExtras = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeAttr(page.description)}" />
    <link rel="canonical" href="${escapeAttr(url)}" />
    <meta property="og:title" content="${escapeAttr(page.title)}" />
    <meta property="og:description" content="${escapeAttr(page.description)}" />
    <meta property="og:type" content="${escapeAttr(page.ogType)}" />
    <meta property="og:url" content="${escapeAttr(url)}" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta property="og:site_name" content="${escapeAttr(site.name)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(page.title)}" />
    <meta name="twitter:description" content="${escapeAttr(page.description)}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />
    <script type="application/ld+json" id="schema-organization">${JSON.stringify(org)}</script>
    ${pageSchemas
      .map(
        (schema, index) =>
          `<script type="application/ld+json" id="schema-page-${index}">${JSON.stringify(schema)}</script>`,
      )
      .join('\n    ')}
  `;

  let next = html.replace(/<title>[\s\S]*?<\/title>/i, '');
  next = next.replace(/<meta\s+name="description"[^>]*>/i, '');
  next = next.replace(/<!--\s*seo:start\s*-->[\s\S]*?<!--\s*seo:end\s*-->/i, '');
  next = next.replace(
    /<\/head>/i,
    `<!-- seo:start -->${headExtras}<!-- seo:end -->\n  </head>`,
  );

  return next;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', '&quot;');
}
