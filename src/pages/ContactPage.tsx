import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { OfficeCard } from '../components/ui/OfficeCard';
import { Button } from '../components/ui/Button';
import { Mail, MessageSquare } from 'lucide-react';
import { contactPageData } from '../data/contact';
import { officeLocations } from '../data/offices';
import { useForm, validators } from '../hooks/useForm';
import { HeroBackground } from '../components/ui/HeroBackground';

export const ContactPage: React.FC = () => {
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
    { firstName: '', lastName: '', email: '', country: '', interest: '' },
    {
      firstName: validators.required('First name is required'),
      lastName: validators.required('Last name is required'),
      email: validators.email('Please enter a valid email address'),
      country: validators.required('Please select a country')
    }
  );

  const onSubmit = async () => {
    // Simulate network request without logging personal data
    await new Promise(resolve => setTimeout(resolve, 800));
  };

  return (
    <PageShell title={contactPageData.title}>
      {/* ─── HEADER ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-hive-border z-0">
        <HeroBackground imageUrl="/assets/heroes/hero-contact.jpg" />
        <Container size="md" className="relative z-10 text-center">
          <FadeIn>
            <h1 className="text-display-lg font-bold font-heading text-white drop-shadow-md mb-6">
              {contactPageData.title}
            </h1>
            <p className="text-xl text-white/90 drop-shadow">
              {contactPageData.subtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── CONTACT FORM & INFO ──────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Left Column: Info */}
            <div className="lg:col-span-5 space-y-10">
              <FadeIn>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-hive-yellow/10 rounded-xl flex items-center justify-center border border-hive-yellow/20">
                    <MessageSquare className="w-6 h-6 text-hive-yellow" />
                  </div>
                  <h2 className="text-2xl font-bold font-heading">Let's Talk</h2>
                  <p className="text-hive-text-muted leading-relaxed">
                    {contactPageData.description}
                  </p>
                </div>

                <div className="space-y-6 pt-6 border-t border-hive-border">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-hive-gray rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-hive-text-muted" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-heading text-hive-black">Email Us</h4>
                      <a href={`mailto:${contactPageData.directEmail}`} className="text-sm text-hive-orange hover:underline">
                        {contactPageData.directEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.2}>
                <div className="bg-hive-white border border-hive-border rounded-2xl p-8 lg:p-10 shadow-hive-lg">
                  <h3 className="text-2xl font-bold font-heading mb-8">{contactPageData.formTitle}</h3>

                  {status === 'success' ? (
                    <div className="bg-hive-gray border border-hive-border rounded-xl p-6 text-center animate-fade-in" role="status" aria-live="polite">
                      <p className="text-sm text-hive-black font-medium">
                        {statusMessage}
                      </p>
                      <Button onClick={() => window.location.reload()} variant="outline" className="mt-6" size="sm">
                        Submit Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-5" noValidate>
                      {/* Honeypot field */}
                      <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
                        <label htmlFor="bot-field-contact">Do not fill this out if you are human</label>
                        <input
                          id="bot-field-contact"
                          name="bot-field"
                          type="text"
                          tabIndex={-1}
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label htmlFor="contact-firstName" className="text-sm font-semibold text-hive-black">First Name <span aria-hidden="true" className="text-hive-orange">*</span></label>
                          <input
                            id="contact-firstName"
                            name="firstName"
                            type="text"
                            value={values.firstName}
                            onChange={handleChange}
                            aria-invalid={!!errors.firstName}
                            aria-describedby={errors.firstName ? "contact-firstName-error" : undefined}
                            className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${errors.firstName
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                              }`}
                          />
                          {errors.firstName && <p id="contact-firstName-error" className="text-red-500 text-xs mt-1" role="alert">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="contact-lastName" className="text-sm font-semibold text-hive-black">Last Name <span aria-hidden="true" className="text-hive-orange">*</span></label>
                          <input
                            id="contact-lastName"
                            name="lastName"
                            type="text"
                            value={values.lastName}
                            onChange={handleChange}
                            aria-invalid={!!errors.lastName}
                            aria-describedby={errors.lastName ? "contact-lastName-error" : undefined}
                            className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${errors.lastName
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                              }`}
                          />
                          {errors.lastName && <p id="contact-lastName-error" className="text-red-500 text-xs mt-1" role="alert">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-sm font-semibold text-hive-black">Work Email Address <span aria-hidden="true" className="text-hive-orange">*</span></label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "contact-email-error" : undefined}
                          className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${errors.email
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                            }`}
                        />
                        {errors.email && <p id="contact-email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label htmlFor="contact-country" className="text-sm font-semibold text-hive-black">Country <span aria-hidden="true" className="text-hive-orange">*</span></label>
                          <select
                            id="contact-country"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            aria-invalid={!!errors.country}
                            aria-describedby={errors.country ? "contact-country-error" : undefined}
                            className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${errors.country
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                              }`}
                          >
                            <option value="">Select a country</option>
                            <option value="UK">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="AE">United Arab Emirates</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.country && <p id="contact-country-error" className="text-red-500 text-xs mt-1" role="alert">{errors.country}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="contact-interest" className="text-sm font-semibold text-hive-black">Area of Interest</label>
                          <select
                            id="contact-interest"
                            name="interest"
                            value={values.interest}
                            onChange={handleChange}
                            className="w-full bg-hive-gray border border-hive-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-hive-yellow focus:ring-1 focus:ring-hive-yellow transition-all"
                          >
                            <option value="">Select an area</option>
                            <option value="AI">Artificial Intelligence</option>
                            <option value="Engineering">Product Engineering</option>
                            <option value="Cloud">Cloud Platforms</option>
                            <option value="Data">Data & Analytics</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-[11px] text-hive-text-muted leading-relaxed">
                          {contactPageData.disclaimer}
                        </p>
                      </div>

                      {statusMessage && status === 'error' && (
                        <div className="p-3 bg-red-50 text-red-800 text-sm rounded-lg border border-red-200" role="alert">
                          {statusMessage}
                        </div>
                      )}

                      <Button type="submit" variant="primary" fullWidth size="lg" className="mt-4" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : contactPageData.submitButton}
                      </Button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── GLOBAL OFFICES DIRECTORY ─────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-gray border-t border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading title="Our Global Offices" description="M3 Hive operates 14+ offices and development centres across the world." />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {officeLocations.map((office, idx) => (
              <FadeIn key={office.id} delay={(idx % 3) * 0.1}>
                <OfficeCard office={office} className="h-full bg-hive-white" />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
