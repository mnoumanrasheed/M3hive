import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Linkedin, Twitter } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { Container } from '../ui/Container';
import { serviceNavItems } from '../../data/navigation';

import { useForm, validators } from '../../hooks/useForm';

export const footerLinkMap = {
  about: '/about',
  ourApproach: '/our-approach',
  careers: '/contact?interest=careers',
  contact: '/contact',
  riskCompliance: '/risk-and-compliance',
  esg: '/about#esg',
  privacyNotice: null,
  termsPrivacy: null,
} as const;

// These links are now driven by footerLinkMap for verified destinations.
// Internal paths use <Link>, external URLs use <a target="_blank">.
interface FooterLink { label: string; href: string | null; external?: boolean; }

const companyLinks: FooterLink[] = [
  { label: 'About Us', href: footerLinkMap.about },
  { label: 'Partners', href: '/partners' },
  { label: 'Our Approach', href: footerLinkMap.ourApproach },
  { label: 'Risk & Compliance', href: footerLinkMap.riskCompliance },
  //{ label: 'Careers', href: footerLinkMap.careers },
  // { label: 'ESG', href: footerLinkMap.esg },
  { label: 'Privacy Notice', href: footerLinkMap.privacyNotice, external: true },
  { label: 'Contact Us', href: footerLinkMap.contact },
];

const NewsletterForm: React.FC = () => {
  const {
    values,
    errors,
    isSubmitting,
    status,
    statusMessage,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit
  } = useForm(
    { email: '' },
    { email: validators.email('Please enter a valid email address') }
  );

  const onSubmit = async () => {
    // Simulate network request without logging personal data
    await new Promise(resolve => setTimeout(resolve, 800));
  };

  if (status === 'success') {
    return (
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4" role="status" aria-live="polite">
        <p className="text-xs text-neutral-300">
          {statusMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} noValidate className="space-y-3">
      {/* Honeypot field */}
      <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="bot-field-newsletter">Do not fill this out if you are human</label>
        <input
          id="bot-field-newsletter"
          name="bot-field"
          type="text"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed">
        Subscribe to receive selected insights, company updates, and perspectives on emerging technology and digital transformation.
      </p>

      <div>
        <div className="flex gap-2">
          <input
            id="newsletter-email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Work email address"
            aria-label="Email address for newsletter"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className={[
              'flex-1 min-w-0 bg-neutral-900 border rounded-lg',
              'px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500',
              'focus:outline-none transition-colors duration-150',
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-hive-yellow'
            ].join(' ')}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label="Subscribe to newsletter"
            className={[
              'flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg',
              'bg-hive-yellow text-hive-black hover:bg-hive-orange hover:text-white',
              'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-hive-black',
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            ].join(' ')}
          >
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        {errors.email && <p id="newsletter-email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
        {status === 'error' && <p className="text-red-500 text-xs mt-1" role="alert">{statusMessage}</p>}
      </div>
    </form>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-hive-black text-white">
      {/* Top honeycomb accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #FDCF09 0%, #F69822 50%, #FDCF09 100%)' }}
        aria-hidden="true"
      />

      <Container size="lg">
        {/* Main grid */}
        <div className="pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-neutral-800">

          {/* Column 1–2: Brand */}
          <div className="sm:col-span-2 space-y-5 max-w-xs">
            <BrandLogo imgClassName="h-10 w-auto brightness-0 invert" />
            <p className="text-sm text-neutral-400 leading-relaxed">
              M3 Hive helps organisations transform ambitious ideas into secure, scalable, and high-performing digital solutions.
            </p>

            <div className="space-y-1.5">
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-neutral-500">
                Direct Enquiries
              </p>
              <a
                href="mailto:hello@m3hive.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-hive-yellow hover:text-hive-orange transition-colors duration-150"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                hello@m3hive.com
              </a>
            </div>

            {/* Social placeholder – enabled:false since links not supplied */}
            <div className="flex gap-2" aria-label="Social links (coming soon)">
              {[Linkedin, Twitter].map((Icon, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-700 text-neutral-600 cursor-not-allowed"
                  title="Link not yet available"
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-heading font-bold uppercase tracking-widest text-hive-yellow">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceNavItems.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="text-xs text-neutral-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-heading font-bold uppercase tracking-widest text-hive-yellow">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => {
                if (!link.href) return null;
                return link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs text-neutral-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-heading font-bold uppercase tracking-widest text-hive-yellow">
              Stay Updated
            </h3>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© M3 Hive 2002–2025. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {footerLinkMap.termsPrivacy && (
              <a
                href={footerLinkMap.termsPrivacy}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-300 transition-colors duration-150"
              >
                Terms &amp; Privacy
              </a>
            )}
            <Link
              to="/risk-and-compliance"
              className="hover:text-neutral-300 transition-colors duration-150"
            >
              Risk &amp; Compliance
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
