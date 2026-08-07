import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from '../animation/PageTransition';
import { orgSchema } from '../../data/seo';

interface PageShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({
  title,
  description = 'M3 Hive helps organisations transform ambitious ideas into secure, scalable, and high-performing digital solutions.',
  children,
  className = '',
}) => {
  const location = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://m3hive.com';
  const canonicalUrl = `${siteUrl}${location.pathname === '/' ? '' : location.pathname}`;

  const fullTitle = title === 'Engineering Digital Experiences'
    ? 'M3 Hive — Engineering Digital Experiences That Move Business Forward'
    : `${title} | M3 Hive`;

  // Breadcrumb schema based on current location
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      ...(location.pathname !== '/' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": canonicalUrl
      }] : [])
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-hive-white text-hive-black">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="M3 Hive" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />

        <meta name="robots" content="index, follow" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-hive-yellow text-hive-black px-4 py-2 rounded-lg font-bold shadow-hive-lg focus:outline-none focus:ring-2 focus:ring-hive-black"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className={['flex-1 w-full outline-none', className].filter(Boolean).join(' ')} tabIndex={-1}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};
