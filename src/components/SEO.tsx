import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO = ({
  title = "SWENLOG - Global Logistics & Supply Chain Solutions",
  description = "Leading logistics company providing comprehensive supply chain solutions including ocean freight, air freight, ground transportation, customs brokerage, and warehousing services worldwide.",
  keywords = "logistics, supply chain, freight forwarding, ocean freight, air freight, customs brokerage, warehousing, transportation",
  image = "/favicon.ico",
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags
}: SEOProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (element) {
        element.content = content;
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.content = content;
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author || 'SWENLOG');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image.startsWith('http') ? image : `${window.location.origin}${image}`, true);
    updateMetaTag('og:url', url || window.location.href, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'SWENLOG', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `${window.location.origin}${image}`);

    // Article specific tags
    if (type === 'article') {
      if (author) updateMetaTag('article:author', author, true);
      if (publishedTime) updateMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, true);
      if (section) updateMetaTag('article:section', section, true);
      if (tags) {
        tags.forEach(tag => {
          updateMetaTag('article:tag', tag, true);
        });
      }
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url || window.location.href;

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === 'website' ? "Organization" : type === 'article' ? "Article" : "WebPage",
      "name": "SWENLOG",
      "description": description,
      "url": url || window.location.href,
      "logo": `${window.location.origin}/favicon.ico`,
      "sameAs": [
        "https://www.linkedin.com/company/swenlog",
        "https://twitter.com/swenlog"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-44-12345678",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Tamil"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Logistics Street",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600001",
        "addressCountry": "IN"
      }
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);

  return null; // This component doesn't render anything
};

export default SEO;
