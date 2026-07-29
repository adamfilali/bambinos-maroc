import React, { useEffect } from 'react';
import { useData } from '../../context/DataContext';

export const SeoHead: React.FC = () => {
  const { settings, company, products } = useData();

  useEffect(() => {
    if (!settings) return;

    // Title
    document.title = settings.metaTitle || `${settings.siteName} – ${settings.tagline}`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', settings.metaDescription || '');

    // Schema.org LocalBusiness & Organization JSON-LD
    const schemaOrg = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": company?.name || settings.siteName,
      "description": settings.metaDescription,
      "image": settings.ogImage,
      "telephone": company?.phone,
      "email": company?.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": company?.address,
        "addressLocality": company?.city,
        "addressCountry": "MA"
      },
      "openingHours": company?.workingHours,
      "priceRange": "$$$$"
    };

    let schemaScript = document.getElementById('bambinos-schema-ld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'bambinos-schema-ld';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaOrg);

  }, [settings, company, products]);

  return null;
};
