import React, { useEffect, useRef } from 'react';
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
import { PremiumHeroMotion } from '../components/ui/PremiumHeroMotion';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export const ContactPage: React.FC = () => {
  const recaptchaLoaded = useRef(false);

  const {
    values,
    errors,
    isSubmitting,
    status,
    statusMessage,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      interest: '',
      message: '',
    },
    {
      firstName: validators.required('First name is required'),
      lastName: validators.required('Last name is required'),
      email: validators.email('Please enter a valid email address'),
      country: validators.required('Please select a country'),
      message: validators.required('Please enter a message'),
    }
  );

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!recaptchaSiteKey || recaptchaLoaded.current) {
      return;
    }

    const existingScript = document.querySelector(
      'script[data-m3hive-recaptcha="true"]'
    );

    if (existingScript) {
      recaptchaLoaded.current = true;
      return;
    }

    const script = document.createElement('script');

    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.m3hiveRecaptcha = 'true';

    document.head.appendChild(script);

    recaptchaLoaded.current = true;
  }, [recaptchaSiteKey]);

  const getRecaptchaToken = async (): Promise<string> => {
    if (!recaptchaSiteKey) {
      throw new Error('reCAPTCHA is not configured.');
    }

    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA is still loading. Please try again.');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha?.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(
            recaptchaSiteKey,
            {
              action: 'contact_form',
            }
          );

          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const onSubmit = async () => {
    const recaptchaToken = await getRecaptchaToken();

    const response = await fetch('/api/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        country: values.country,
        interest: values.interest,
        message: values.message,
        honeypot,
        recaptchaToken,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        result?.message ||
          'We could not send your message. Please try again.'
      );
    }
  };

  return (
    <PageShell title={contactPageData.title}>
      {/* HEADER */}
      <section 
        className="relative z-0 overflow-hidden border-b border-hive-border flex flex-col justify-center"
        style={{ minHeight: 'max(560px, calc(100svh - 80px))' }}
      >
        <HeroBackground imageUrl="/assets/heroes/hero-contact.jpg" />
        <PremiumHeroMotion variant="contact" />

        <Container
          size="md"
          className="relative z-10 text-center"
        >
          <FadeIn>
            <h1 
              className="mb-4 font-heading font-bold text-white drop-shadow-md sm:mb-6"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: '1.1' }}
            >
              {contactPageData.title}
            </h1>

            <p className="text-base leading-relaxed text-white/90 drop-shadow sm:text-xl">
              {contactPageData.subtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* CONTACT FORM & INFO */}
      <section className="bg-hive-white py-14 sm:py-20 lg:py-24">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
            {/* LEFT COLUMN */}
            <div className="space-y-8 sm:space-y-10 lg:col-span-5">
              <FadeIn>
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-hive-yellow/20 bg-hive-yellow/10">
                    <MessageSquare className="h-6 w-6 text-hive-yellow" />
                  </div>

                  <h2 className="font-heading text-2xl font-bold">
                    Let's Talk
                  </h2>

                  <p className="leading-relaxed text-hive-text-muted">
                    {contactPageData.description}
                  </p>
                </div>

                <div className="space-y-6 border-t border-hive-border pt-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-hive-gray">
                      <Mail className="h-5 w-5 text-hive-text-muted" />
                    </div>

                    <div>
                      <h4 className="font-heading text-sm font-bold text-hive-black">
                        Email Us
                      </h4>

                      <a
                        href={`mailto:${contactPageData.directEmail}`}
                        className="text-sm text-hive-orange hover:underline"
                      >
                        {contactPageData.directEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-hive-border bg-hive-white p-6 shadow-hive-lg sm:p-8 lg:p-10">
                  <h3 className="mb-6 font-heading text-xl font-bold sm:mb-8 sm:text-2xl">
                    {contactPageData.formTitle}
                  </h3>

                  {status === 'success' ? (
                    <div
                      className="animate-fade-in rounded-xl border border-hive-border bg-hive-gray p-6 text-center"
                      role="status"
                      aria-live="polite"
                    >
                      <p className="text-sm font-medium text-hive-black">
                        {statusMessage}
                      </p>

                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="mt-6"
                        size="sm"
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(event) =>
                        handleSubmit(event, onSubmit)
                      }
                      className="space-y-5"
                      noValidate
                    >
                      {/* Honeypot */}
                      <div
                        className="absolute -z-50 h-0 w-0 overflow-hidden opacity-0"
                        aria-hidden="true"
                      >
                        <label htmlFor="bot-field-contact">
                          Do not fill this out if you are human
                        </label>

                        <input
                          id="bot-field-contact"
                          name="bot-field"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(event) =>
                            setHoneypot(event.target.value)
                          }
                        />
                      </div>

                      {/* NAME */}
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-firstName"
                            className="text-sm font-semibold text-hive-black"
                          >
                            First Name{' '}
                            <span
                              aria-hidden="true"
                              className="text-hive-orange"
                            >
                              *
                            </span>
                          </label>

                          <input
                            id="contact-firstName"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            value={values.firstName}
                            onChange={handleChange}
                            aria-invalid={!!errors.firstName}
                            aria-describedby={
                              errors.firstName
                                ? 'contact-firstName-error'
                                : undefined
                            }
                            className={`w-full rounded-lg border bg-hive-gray px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
                              errors.firstName
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                            }`}
                          />

                          {errors.firstName && (
                            <p
                              id="contact-firstName-error"
                              className="mt-1 text-xs text-red-500"
                              role="alert"
                            >
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-lastName"
                            className="text-sm font-semibold text-hive-black"
                          >
                            Last Name{' '}
                            <span
                              aria-hidden="true"
                              className="text-hive-orange"
                            >
                              *
                            </span>
                          </label>

                          <input
                            id="contact-lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            value={values.lastName}
                            onChange={handleChange}
                            aria-invalid={!!errors.lastName}
                            aria-describedby={
                              errors.lastName
                                ? 'contact-lastName-error'
                                : undefined
                            }
                            className={`w-full rounded-lg border bg-hive-gray px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
                              errors.lastName
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                            }`}
                          />

                          {errors.lastName && (
                            <p
                              id="contact-lastName-error"
                              className="mt-1 text-xs text-red-500"
                              role="alert"
                            >
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="text-sm font-semibold text-hive-black"
                        >
                          Work Email Address{' '}
                          <span
                            aria-hidden="true"
                            className="text-hive-orange"
                          >
                            *
                          </span>
                        </label>

                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={handleChange}
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email
                              ? 'contact-email-error'
                              : undefined
                          }
                          className={`w-full rounded-lg border bg-hive-gray px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
                            errors.email
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                          }`}
                        />

                        {errors.email && (
                          <p
                            id="contact-email-error"
                            className="mt-1 text-xs text-red-500"
                            role="alert"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* COUNTRY + INTEREST */}
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-country"
                            className="text-sm font-semibold text-hive-black"
                          >
                            Country{' '}
                            <span
                              aria-hidden="true"
                              className="text-hive-orange"
                            >
                              *
                            </span>
                          </label>

                          <select
                            id="contact-country"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            aria-invalid={!!errors.country}
                            aria-describedby={
                              errors.country
                                ? 'contact-country-error'
                                : undefined
                            }
                            className={`w-full rounded-lg border bg-hive-gray px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
                              errors.country
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                            }`}
                          >
                            <option value="">
                              Select a country
                            </option>
                            <option value="UK">
                              United Kingdom
                            </option>
                            <option value="US">
                              United States
                            </option>
                            <option value="CA">
                              Canada
                            </option>
                            <option value="AE">
                              United Arab Emirates
                            </option>
                            <option value="PK">
                              Pakistan
                            </option>
                            <option value="Other">
                              Other
                            </option>
                          </select>

                          {errors.country && (
                            <p
                              id="contact-country-error"
                              className="mt-1 text-xs text-red-500"
                              role="alert"
                            >
                              {errors.country}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-interest"
                            className="text-sm font-semibold text-hive-black"
                          >
                            Area of Interest
                          </label>

                          <select
                            id="contact-interest"
                            name="interest"
                            value={values.interest}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-hive-border bg-hive-gray px-4 py-3 text-sm transition-all focus:border-hive-yellow focus:outline-none focus:ring-1 focus:ring-hive-yellow"
                          >
                            <option value="">
                              Select an area
                            </option>
                            <option value="AI">
                              Artificial Intelligence
                            </option>
                            <option value="Engineering">
                              Product Engineering
                            </option>
                            <option value="Cloud">
                              Cloud Platforms
                            </option>
                            <option value="Data">
                              Data & Analytics
                            </option>
                            <option value="Automation">
                              Intelligent Automation
                            </option>
                            <option value="Customer Experience">
                              Customer Experience
                            </option>
                            <option value="Edge">
                              Edge Technologies
                            </option>
                            <option value="Other">
                              Other
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* MESSAGE */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-message"
                          className="text-sm font-semibold text-hive-black"
                        >
                          Message{' '}
                          <span
                            aria-hidden="true"
                            className="text-hive-orange"
                          >
                            *
                          </span>
                        </label>

                        <textarea
                          id="contact-message"
                          name="message"
                          rows={6}
                          value={values.message}
                          onChange={handleChange}
                          aria-invalid={!!errors.message}
                          aria-describedby={
                            errors.message
                              ? 'contact-message-error'
                              : undefined
                          }
                          placeholder="Tell us about your requirements, goals, or challenges..."
                          className={`w-full resize-none rounded-lg border bg-hive-gray px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
                            errors.message
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
                          }`}
                        />

                        {errors.message && (
                          <p
                            id="contact-message-error"
                            className="mt-1 text-xs text-red-500"
                            role="alert"
                          >
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* DISCLAIMER */}
                      <div className="pt-2">
                        <p className="text-[11px] leading-relaxed text-hive-text-muted">
                          {contactPageData.disclaimer}
                        </p>

                        <p className="mt-2 text-[10px] leading-relaxed text-hive-text-muted">
                          This site is protected by reCAPTCHA and
                          the Google Privacy Policy and Terms of
                          Service apply.
                        </p>
                      </div>

                      {/* ERROR */}
                      {statusMessage &&
                        status === 'error' && (
                          <div
                            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                            role="alert"
                          >
                            {statusMessage}
                          </div>
                        )}

                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        size="lg"
                        className="mt-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? 'Sending...'
                          : contactPageData.submitButton}
                      </Button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* GLOBAL OFFICES */}
      <section className="border-t border-hive-border bg-hive-gray py-14 sm:py-20 lg:py-24">
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="Our Global Offices"
              description="M3 Hive operates 14+ offices and development centres across the world."
            />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officeLocations.map((office, idx) => (
              <FadeIn
                key={office.id}
                delay={(idx % 3) * 0.1}
              >
                <OfficeCard
                  office={office}
                  className="h-full bg-hive-white"
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};