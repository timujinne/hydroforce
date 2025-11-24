import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image = 'https://www.hydroforce.ee/wp-content/uploads/2025/09/HF-mainIMG.webp',
  type = 'website'
}) => {
  const location = useLocation();
  const siteName = "Hydroforce Engineering";
  const fullTitle = `${title} | ${siteName}`;
  const currentUrl = window.location.href;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to set meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Helper to set OG tags (property attribute)
    const setOg = (property: string, content: string) => {
       let element = document.querySelector(`meta[property="${property}"]`);
       if (!element) {
         element = document.createElement('meta');
         element.setAttribute('property', property);
         document.head.appendChild(element);
       }
       element.setAttribute('content', content);
    };

    // 4. Update Meta Tags
    setMeta('description', description);
    if (keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }
    setMeta('author', 'Hydroforce Engineering');
    setMeta('robots', 'index, follow');

    // 5. Open Graph / Facebook
    setOg('og:title', fullTitle);
    setOg('og:description', description);
    setOg('og:image', image);
    setOg('og:type', type);
    setOg('og:site_name', siteName);
    setOg('og:url', currentUrl);

    // 6. Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // 7. Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', currentUrl);

  }, [fullTitle, description, keywords, image, type, location, currentUrl]);

  return null;
};