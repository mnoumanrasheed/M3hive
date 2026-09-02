import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Plus,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

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

interface Step1Option {
  id: string;
  label: string;
  description: string;
}

const step1Options: Step1Option[] = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    description: 'GenAI, LLMs, Computer Vision & Autonomous Agents',
  },
  {
    id: 'engineering',
    label: 'Product Engineering',
    description: 'Custom Web/Mobile Platforms & Resilient Architecture',
  },
  {
    id: 'ux',
    label: 'Customer Experience (UX/UI)',
    description: 'UX/UI Design Systems, User Research & Design Strategy',
  },
  {
    id: 'automation',
    label: 'Intelligent Automation',
    description: 'RPA, Workflow Modernisation & Process Intelligence',
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    description: 'Modern Data Platforms, BI, Pipelines & Governance',
  },
  {
    id: 'cloud',
    label: 'Cloud Platforms',
    description: 'Cloud Migration, DevOps, Multi-Cloud & Salesforce',
  },
  {
    id: 'edge',
    label: 'Edge & IoT',
    description: 'Extended Reality (XR), IoT, Simulation & Embedded Systems',
  },
  {
    id: 'advice',
    label: 'Not sure yet',
    description: 'We need strategic advice to evaluate technical options',
  },
];

interface Step2Option {
  id: string;
  label: string;
}

const step2Options: Step2Option[] = [
  { id: 'idea', label: 'Exploring an idea / Discovery' },
  { id: 'planning', label: 'Planning & Architecture' },
  { id: 'ready', label: 'Ready to build (MVP / v1)' },
  { id: 'active', label: 'Already in development' },
  { id: 'modernising', label: 'Modernising legacy tech' },
  { id: 'scaling', label: 'Scaling an existing solution' },
];

const timelineOptions = [
  { id: 'urgent', label: 'As soon as possible' },
  { id: '1-3m', label: '1–3 months' },
  { id: '3-6m', label: '3–6 months' },
  { id: 'exploring', label: 'Exploring / Flexible' },
];

export interface StartProjectFormState {
  services: string[];
  journeyStage: string;
  message: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  honeypot: string;
}

const initialFormState: StartProjectFormState = {
  services: [],
  journeyStage: '',
  message: '',
  timeline: '',
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  country: '',
  phone: '',
  honeypot: '',
};

const ErrorSlot: React.FC<{
  message?: string;
  className?: string;
}> = ({
  message,
  className = '',
}) => {
  if (!message) return null;

  return (
    <p
      className={`text-[10px] font-semibold leading-[18px] text-red-400 ${className}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
};

interface StartProjectWorkflowProps {
  initialService?: string;
}

export const StartProjectWorkflow: React.FC<StartProjectWorkflowProps> = ({
  initialService,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<StartProjectFormState>(() => {
    if (initialService) {
      const match = step1Options.find(
        (opt) => opt.label.toLowerCase() === initialService.toLowerCase()
      );
      return {
        ...initialFormState,
        services: match ? [match.label] : [initialService],
      };
    }
    return initialFormState;
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const recaptchaLoaded = useRef(false);
  const formTopRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // reCAPTCHA v3 initialization
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

  const scrollToTop = (force = false) => {
    if (formTopRef.current && !reducedMotion && force) {
      formTopRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const toggleService = (label: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(label);
      const updated = exists
        ? prev.services.filter((s) => s !== label)
        : [...prev.services, label];
      return { ...prev, services: updated };
    });
    if (validationErrors.services) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.services;
        return next;
      });
    }
  };

  const selectJourneyStage = (stage: string) => {
    setFormData((prev) => ({ ...prev, journeyStage: stage }));
    if (validationErrors.journeyStage) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.journeyStage;
        return next;
      });
    }
  };

  const selectTimeline = (timeline: string) => {
    setFormData((prev) => ({ ...prev, timeline }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (formData.services.length === 0) {
        errors.services = 'Please select at least one capability.';
      }
    } else if (step === 2) {
      if (!formData.journeyStage) {
        errors.journeyStage = 'Please select where you are in your journey.';
      }
    } else if (step === 3) {
      if (!formData.message.trim()) {
        errors.message = 'Please share a brief note about what you want to achieve.';
      } else if (formData.message.trim().length < 10) {
        errors.message = 'Please provide a bit more detail (at least 10 characters).';
      }
    } else if (step === 4) {
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required.';
      }
      if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required.';
      }
      if (!formData.email.trim()) {
        errors.email = 'Work email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = 'Please enter a valid work email address.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setValidationErrors({});
  };

  const jumpToStep = (targetStep: number) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      setValidationErrors({});
    } else if (targetStep > currentStep) {
      for (let s = currentStep; s < targetStep; s++) {
        if (!validateStep(s)) return;
      }
      setCurrentStep(targetStep);
    }
  };

  const getRecaptchaToken = async (): Promise<string> => {
    if (!recaptchaSiteKey) {
      return 'recaptcha-not-configured';
    }

    if (!window.grecaptcha) {
      return 'recaptcha-fallback-token';
    }

    return new Promise((resolve) => {
      window.grecaptcha?.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(recaptchaSiteKey, {
            action: 'contact_form',
          });
          resolve(token);
        } catch {
          resolve('recaptcha-fallback-token');
        }
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const recaptchaToken = await getRecaptchaToken();

      const primaryInterest =
        formData.services.join(', ') || 'Not specified';
      const formattedMessage = [
        `PROJECT BRIEF SUMMARY:`,
        `• Capability: ${primaryInterest}`,
        `• Stage: ${formData.journeyStage || 'Not specified'}`,
        `• Timeline: ${formData.timeline || 'Not specified'}`,
        `• Company: ${formData.company || 'Not specified'}`,
        `• Phone: ${formData.phone || 'Not provided'}`,
        ``,
        `OBJECTIVES & SCOPE:`,
        formData.message,
      ].join('\n');

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        country: formData.country.trim() || 'United Kingdom',
        interest: primaryInterest,
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        journeyStage: formData.journeyStage,
        timeline: formData.timeline,
        message: formattedMessage,
        honeypot: formData.honeypot,
        recaptchaToken,
      };

      let response: Response;
      try {
        response = await fetch('/api/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json().catch(() => null);

      if (!response.ok && response.status !== 200) {
        throw new Error(
          result?.message ||
            'We could not process your enquiry. Please check your information and try again.'
        );
      }

      setSubmitStatus('success');
      scrollToTop(true);
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again or reach out directly at contact@m3hive.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================================================
     SUCCESS STATE
  ============================================================ */
  if (submitStatus === 'success') {
    return (
      <div
        ref={formTopRef}
        className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#0c0c0c] p-8 text-center text-white shadow-2xl sm:p-12"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-hive-yellow/30 bg-hive-yellow/10 text-hive-yellow shadow-lg shadow-hive-yellow/10">
          <CheckCircle2 className="h-9 w-9" />
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-hive-yellow uppercase">
          BRIEF RECEIVED
        </div>

        <h2 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">
          Thanks. Let's explore what's next.
        </h2>

        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
          Our engineering leads will review your project brief and reply with direct, actionable technology recommendations within 1 business day.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-hive-yellow px-7 py-3 font-heading text-sm font-bold text-hive-black shadow-lg shadow-hive-yellow/20 transition-all hover:bg-hive-orange hover:text-white"
        >
          <span>Return to M3 Hive</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  /* ============================================================
     STEP METADATA
  ============================================================ */
  const stepsMetadata = [
    { number: '1', title: 'WHAT YOU NEED' },
    { number: '2', title: 'STAGE' },
    { number: '3', title: 'GOALS' },
    { number: '4', title: 'DETAILS' },
  ];

  return (
    <div ref={formTopRef} className="mx-auto max-w-7xl">
      {/* 2-Column High-Converting Layout */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        
        {/* ============================================================
            LEFT COLUMN: Direct, Honest, High-End Value Prop
        ============================================================ */}
        <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28">
          
          {/* Eyebrow badge with live indicator */}
          <div className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/10 px-3.5 py-1.5 text-xs font-semibold text-hive-yellow backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hive-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-hive-yellow" />
            </span>
            <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
              START A PROJECT
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            Let's see if we're the{' '}
            <span className="bg-gradient-to-r from-hive-yellow via-amber-300 to-hive-orange bg-clip-text text-transparent">
              right partner
            </span>{' '}
            for this.
          </h2>

          {/* Subtitle */}
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
            A short brief so our technology leadership and architects can give you a real answer. Takes 2 minutes.
          </p>

          {/* 2 Trust Cards */}
          <div className="space-y-3 pt-2">
            <div className="group flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-200 hover:border-hive-yellow/30 hover:bg-white/[0.04]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-hive-yellow group-hover:border-hive-yellow/40 group-hover:bg-hive-yellow/10 transition-colors">
                <Plus className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold text-white group-hover:text-hive-yellow transition-colors">
                  A tech lead reads every brief
                </h4>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-400">
                  Direct engineering review — no SDR or generic sales script in the middle.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-200 hover:border-hive-yellow/30 hover:bg-white/[0.04]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-hive-yellow group-hover:border-hive-yellow/40 group-hover:bg-hive-yellow/10 transition-colors">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold text-white group-hover:text-hive-yellow transition-colors">
                  We'll say no if it's wrong
                </h4>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-400">
                  Honest feasibility, practical architecture advice, or a referral if needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: The Sleek Multi-Step Card (Technyder Style)
        ============================================================ */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0c0c0c]/95 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-xl sm:p-8">
            
            {/* Ambient subtle glow inside card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-hive-yellow/10 blur-3xl"
            />

            {/* Stepper Header (Technyder Style) */}
            <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-1 sm:gap-2">
                {stepsMetadata.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isCurrent = stepNum === currentStep;
                  const isCompleted = stepNum < currentStep;

                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => jumpToStep(stepNum)}
                      disabled={stepNum > currentStep}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider transition-all sm:text-[11px] ${
                        isCurrent
                          ? 'bg-hive-yellow/15 text-hive-yellow shadow-sm shadow-hive-yellow/10'
                          : isCompleted
                          ? 'text-neutral-300 hover:text-white'
                          : 'text-neutral-500 opacity-50'
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                          isCurrent
                            ? 'bg-hive-yellow text-hive-black'
                            : isCompleted
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-neutral-500'
                        }`}
                      >
                        {isCompleted ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : step.number}
                      </span>
                      <span className="hidden sm:inline uppercase">{step.title}</span>
                    </button>
                  );
                })}
              </div>

              <span className="font-mono text-[11px] text-neutral-400">
                Step {currentStep} of 4
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="relative z-10">
              
              {/* Honeypot */}
              <div className="absolute -z-50 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                <input
                  name="honeypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                />
              </div>

              {/* Error Banner */}
              {submitStatus === 'error' && errorMessage && (
                <div
                  className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-200"
                  aria-live="polite"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <div>{errorMessage}</div>
                </div>
              )}

              <div className="form-step-content">

              {/* ============================================================
                  STEP 1: What are you looking to build? (Pill Chips)
              ============================================================ */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                      What are you looking to build?
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Pick all that apply.
                    </p>
                  </div>

                  <ErrorSlot
                    message={validationErrors.services}
                    className="text-xs"
                  />

                  {/* Technyder style Pill Chips wrap */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {step1Options.map((opt) => {
                      const isSelected = formData.services.includes(opt.label);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleService(opt.label)}
                          className={`group inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                            isSelected
                              ? 'border-hive-yellow bg-hive-yellow text-hive-black shadow-md shadow-hive-yellow/20 scale-[1.01]'
                              : 'border-white/[0.12] bg-white/[0.03] text-neutral-300 hover:border-hive-yellow/50 hover:bg-white/[0.07] hover:text-white'
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                              isSelected
                                ? 'border-hive-black bg-hive-black text-hive-yellow'
                                : 'border-neutral-500 bg-transparent group-hover:border-neutral-300'
                            }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ============================================================
                  STEP 2: Where are you in the journey?
              ============================================================ */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                      Where are you in the journey?
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Select your project's current phase.
                    </p>
                  </div>

                  <ErrorSlot
                    message={validationErrors.journeyStage}
                    className="text-xs"
                  />

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {step2Options.map((opt) => {
                      const isSelected = formData.journeyStage === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => selectJourneyStage(opt.label)}
                          className={`group inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                            isSelected
                              ? 'border-hive-yellow bg-hive-yellow text-hive-black shadow-md shadow-hive-yellow/20 scale-[1.01]'
                              : 'border-white/[0.12] bg-white/[0.03] text-neutral-300 hover:border-hive-yellow/50 hover:bg-white/[0.07] hover:text-white'
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                              isSelected
                                ? 'border-hive-black bg-hive-black'
                                : 'border-neutral-500 bg-transparent group-hover:border-neutral-300'
                            }`}
                          >
                            {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-hive-yellow" />}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ============================================================
                  STEP 3: Goals & Timeline
              ============================================================ */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                      What are you looking to achieve?
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      A few sentences about your core challenge, scope, or desired outcome.
                    </p>
                  </div>

                  <ErrorSlot
                    message={validationErrors.message}
                    className="text-xs"
                  />

                  <div className="space-y-3">
                    <textarea
                      id="project-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g. We want to build an AI-driven workflow platform that integrates with our CRM and automates client onboarding..."
                      className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 text-xs text-white placeholder:text-neutral-500 focus:border-hive-yellow focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-hive-yellow transition-all"
                    />

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        Target Timeline
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {timelineOptions.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => selectTimeline(t.label)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                              formData.timeline === t.label
                                ? 'border-hive-yellow bg-hive-yellow text-hive-black font-semibold'
                                : 'border-white/[0.1] bg-white/[0.03] text-neutral-300 hover:border-white/30'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================
                  STEP 4: Contact Details
              ============================================================ */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                      Tell us about you
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Where should our technical leads send their initial evaluation?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex flex-col">
                      <label className="block text-[11px] font-semibold text-neutral-300">
                        First Name <span className="text-hive-yellow">*</span>
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Alex"
                        className="mt-1 w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-hive-yellow focus:outline-none transition-all"
                      />
                      <ErrorSlot message={validationErrors.firstName} />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[11px] font-semibold text-neutral-300">
                        Last Name <span className="text-hive-yellow">*</span>
                      </label>
                      <input
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Morgan"
                        className="mt-1 w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-hive-yellow focus:outline-none transition-all"
                      />
                      <ErrorSlot message={validationErrors.lastName} />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[11px] font-semibold text-neutral-300">
                        Work Email <span className="text-hive-yellow">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="alex@company.com"
                        className="mt-1 w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-hive-yellow focus:outline-none transition-all"
                      />
                      <ErrorSlot message={validationErrors.email} />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[11px] font-semibold text-neutral-300">
                        Company Name
                      </label>
                      <input
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Corp"
                        className="mt-1 w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-hive-yellow focus:outline-none transition-all"
                      />
                      <ErrorSlot />
                    </div>

                    <div className="flex flex-col sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-300">
                        Phone <span className="text-neutral-500">(optional)</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44 20 7946 0912"
                        className="mt-1 w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-hive-yellow focus:outline-none transition-all"
                      />
                      <ErrorSlot />
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500">
                    Protected by reCAPTCHA. We respect your privacy and never share your data.
                  </p>
                </div>
              )}

              </div>

              {/* Card Bottom Controls (Technyder Style) */}
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="inline-flex min-w-[92px] items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-heading text-xs font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div className="min-w-[92px]" />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex min-w-[108px] items-center justify-center gap-1.5 rounded-lg bg-hive-yellow px-5 py-2 font-heading text-xs font-bold text-hive-black shadow-md shadow-hive-yellow/15 transition-all hover:-translate-y-px hover:bg-hive-orange hover:text-white active:translate-y-0"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-w-[108px] items-center justify-center gap-2 rounded-lg bg-hive-yellow px-6 py-2.5 font-heading text-xs font-bold text-hive-black shadow-md shadow-hive-yellow/20 transition-all hover:-translate-y-px hover:bg-hive-orange hover:text-white active:translate-y-0 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
