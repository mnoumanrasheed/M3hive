import React from 'react';
import { Button } from '../ui/Button';
import { homepageData } from '../../data/homepage';
import { useForm, validators } from '../../hooks/useForm';

export const DiscoveryForm: React.FC = () => {
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
      email: validators.email('Please enter a valid work email'),
      country: validators.required('Please select a country')
    }
  );

  const onSubmit = async () => {
    // Simulate network request without logging personal data
    await new Promise(resolve => setTimeout(resolve, 800));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-5 text-left bg-hive-white p-8 rounded-2xl border border-hive-border text-hive-black" noValidate>
      {/* Honeypot field (hidden from screen readers and visual layout) */}
      <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="bot-field">Do not fill this out if you are human</label>
        <input
          id="bot-field"
          name="bot-field"
          type="text"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="firstName" className="text-sm font-semibold text-hive-black">First Name <span aria-hidden="true" className="text-hive-orange">*</span></label>
          <input 
            id="firstName"
            name="firstName"
            type="text" 
            value={values.firstName}
            onChange={handleChange}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
              errors.firstName 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
            }`} 
          />
          {errors.firstName && <p id="firstName-error" className="text-red-500 text-xs mt-1" role="alert">{errors.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lastName" className="text-sm font-semibold text-hive-black">Last Name <span aria-hidden="true" className="text-hive-orange">*</span></label>
          <input 
            id="lastName"
            name="lastName"
            type="text" 
            value={values.lastName}
            onChange={handleChange}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
              errors.lastName 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
            }`} 
          />
          {errors.lastName && <p id="lastName-error" className="text-red-500 text-xs mt-1" role="alert">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-hive-black">Work Email Address <span aria-hidden="true" className="text-hive-orange">*</span></label>
        <input 
          id="email"
          name="email"
          type="email" 
          value={values.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
            errors.email 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-hive-border focus:border-hive-yellow focus:ring-hive-yellow'
          }`} 
        />
        {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="country" className="text-sm font-semibold text-hive-black">Country <span aria-hidden="true" className="text-hive-orange">*</span></label>
          <select 
            id="country"
            name="country"
            value={values.country}
            onChange={handleChange}
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
            className={`w-full bg-hive-gray border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
              errors.country 
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
          {errors.country && <p id="country-error" className="text-red-500 text-xs mt-1" role="alert">{errors.country}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="interest" className="text-sm font-semibold text-hive-black">Area of Interest</label>
          <select 
            id="interest"
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
          {homepageData.contactCTA.disclaimer}
        </p>
      </div>

      {statusMessage && status === 'success' && (
        <div className="p-3 bg-green-50 text-green-800 text-sm rounded-lg border border-green-200" role="alert">
          {statusMessage}
        </div>
      )}

      {statusMessage && status === 'error' && (
        <div className="p-3 bg-red-50 text-red-800 text-sm rounded-lg border border-red-200" role="alert">
          {statusMessage}
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth size="lg" className="mt-4" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : homepageData.contactCTA.submitButton}
      </Button>
    </form>
  );
};
