import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';

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

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  interest: string;
  message: string;
  honeypot: string;
};

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  interest: '',
  message: '',
  honeypot: '',
};

export const DiscoveryForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [statusMessage, setStatusMessage] = useState('');

  const recaptchaLoaded = useRef(false);

  const recaptchaSiteKey =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY;

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

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const getRecaptchaToken = async (): Promise<string> => {
    if (!recaptchaSiteKey) {
      throw new Error(
        'reCAPTCHA is not configured. Please try again later.'
      );
    }

    if (!window.grecaptcha) {
      throw new Error(
        'reCAPTCHA is still loading. Please try again.'
      );
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha?.ready(async () => {
        try {
          const token =
            await window.grecaptcha!.execute(
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !values.firstName.trim() ||
      !values.lastName.trim() ||
      !values.email.trim() ||
      !values.country.trim() ||
      !values.message.trim()
    ) {
      setStatus('error');
      setStatusMessage(
        'Please complete all required fields.'
      );
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const recaptchaToken =
        await getRecaptchaToken();

      const response = await fetch(
        '/api/contact.php',
        {
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
            honeypot: values.honeypot,
            recaptchaToken,
          }),
        }
      );

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            'We could not send your message. Please try again.'
        );
      }

      setStatus('success');
      setStatusMessage(
        result?.message ||
          'Thank you! Your message has been sent successfully.'
      );

      setValues(initialValues);
    } catch (error) {
      setStatus('error');

      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'We could not send your message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.06]
          p-6
          text-center
          backdrop-blur-sm
          sm:p-8
        "
        role="status"
        aria-live="polite"
      >
        <div
          className="
            mx-auto
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-hive-yellow
            text-lg
            font-bold
            text-hive-black
          "
        >
          ✓
        </div>

        <h3 className="mb-2 font-heading text-xl font-bold text-white">
          Thank You
        </h3>

        <p className="text-sm leading-relaxed text-white/70">
          {statusMessage}
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            setStatus('idle');
            setStatusMessage('');
          }}
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        p-5
        backdrop-blur-sm
        sm:p-7
      "
      noValidate
    >
      {/* Honeypot */}
      <div
        className="
          absolute
          -z-50
          h-0
          w-0
          overflow-hidden
          opacity-0
        "
        aria-hidden="true"
      >
        <label htmlFor="home-bot-field">
          Do not fill this out
        </label>

        <input
          id="home-bot-field"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={handleChange}
        />
      </div>

      {/* First + Last Name */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="home-firstName"
            className="
              mb-1.5
              block
              text-xs
              font-semibold
              text-white/80
            "
          >
            First Name *
          </label>

          <input
            id="home-firstName"
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
            className="
              w-full
              rounded-lg
              border
              border-white/10
              bg-white/[0.06]
              px-4
              py-3
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-white/30
              focus:border-hive-yellow
              focus:ring-1
              focus:ring-hive-yellow
            "
            placeholder="First name"
          />
        </div>

        <div>
          <label
            htmlFor="home-lastName"
            className="
              mb-1.5
              block
              text-xs
              font-semibold
              text-white/80
            "
          >
            Last Name *
          </label>

          <input
            id="home-lastName"
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
            className="
              w-full
              rounded-lg
              border
              border-white/10
              bg-white/[0.06]
              px-4
              py-3
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-white/30
              focus:border-hive-yellow
              focus:ring-1
              focus:ring-hive-yellow
            "
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mt-4">
        <label
          htmlFor="home-email"
          className="
            mb-1.5
            block
            text-xs
            font-semibold
            text-white/80
          "
        >
          Work Email Address *
        </label>

        <input
          id="home-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          required
          className="
            w-full
            rounded-lg
            border
            border-white/10
            bg-white/[0.06]
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-white/30
            focus:border-hive-yellow
            focus:ring-1
            focus:ring-hive-yellow
          "
          placeholder="name@company.com"
        />
      </div>

      {/* Country + Interest */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="home-country"
            className="
              mb-1.5
              block
              text-xs
              font-semibold
              text-white/80
            "
          >
            Country *
          </label>

          <input
            id="home-country"
            name="country"
            type="text"
            value={values.country}
            onChange={handleChange}
            required
            className="
              w-full
              rounded-lg
              border
              border-white/10
              bg-white/[0.06]
              px-4
              py-3
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-white/30
              focus:border-hive-yellow
              focus:ring-1
              focus:ring-hive-yellow
            "
            placeholder="Your country"
          />
        </div>

        <div>
          <label
            htmlFor="home-interest"
            className="
              mb-1.5
              block
              text-xs
              font-semibold
              text-white/80
            "
          >
            Area of Interest
          </label>

          <select
            id="home-interest"
            name="interest"
            value={values.interest}
            onChange={handleChange}
            className="
              w-full
              rounded-lg
              border
              border-white/10
              bg-[#1a1a1a]
              px-4
              py-3
              text-sm
              text-white
              outline-none
              transition
              focus:border-hive-yellow
              focus:ring-1
              focus:ring-hive-yellow
            "
          >
            <option value="">
              Select an area
            </option>

            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>

            <option value="Product Engineering">
              Product Engineering
            </option>

            <option value="Customer Experience">
              Customer Experience
            </option>

            <option value="Intelligent Automation">
              Intelligent Automation
            </option>

            <option value="Data & Analytics">
              Data & Analytics
            </option>

            <option value="Cloud Platforms">
              Cloud Platforms
            </option>

            <option value="Edge Technologies">
              Edge Technologies
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mt-4">
        <label
          htmlFor="home-message"
          className="
            mb-1.5
            block
            text-xs
            font-semibold
            text-white/80
          "
        >
          Message *
        </label>

        <textarea
          id="home-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          required
          placeholder="Tell us briefly about your project, requirements, or challenge..."
          className="
            w-full
            resize-none
            rounded-lg
            border
            border-white/10
            bg-white/[0.06]
            px-4
            py-3
            text-sm
            leading-relaxed
            text-white
            outline-none
            transition
            placeholder:text-white/30
            focus:border-hive-yellow
            focus:ring-1
            focus:ring-hive-yellow
          "
        />
      </div>

      {/* Privacy */}
      <div className="mt-4">
        <p className="text-[10px] leading-relaxed text-white/45">
          By submitting the form, you agree to receive
          relevant communications from M3 Hive. You may
          unsubscribe at any time.
        </p>

        <p className="mt-1 text-[9px] leading-relaxed text-white/35">
          This site is protected by reCAPTCHA and the Google
          Privacy Policy and Terms of Service apply.
        </p>
      </div>

      {/* Error */}
      {status === 'error' && statusMessage && (
        <div
          className="
            mt-4
            rounded-lg
            border
            border-red-400/30
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-200
          "
          role="alert"
        >
          {statusMessage}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        size="lg"
        className="mt-5"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Sending...'
          : 'Book My Free Discovery Call'}
      </Button>
    </form>
  );
};