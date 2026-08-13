import { useState } from 'react';

export interface ValidationRules {
  [key: string]: (value: string) => string | null;
}

export const useForm = <T extends Record<string, string>>(
  initialValues: T,
  validationRules: ValidationRules
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Honeypot field - bots will likely fill this out
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof T]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};

    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key](values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    submitFn: (data: T) => Promise<void>
  ) => {
    e.preventDefault();
    
    // Check honeypot
    if (honeypot) {
      // Silently fail for bots
      setStatus('success');
      setStatusMessage('Thank you. Form submission integration will be connected before launch.');
      return;
    }

    if (!validate()) {
      setStatus('error');
      setStatusMessage('Please add correct information');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      await submitFn(values);
      setStatus('success');
      setStatusMessage('Thank you! This feature is coming soon. Stay tuned for updates.');
      setValues(initialValues); // Reset form
    } catch (err) {
      setStatus('error');
      setStatusMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    status,
    statusMessage,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit
  };
};

// Common validation helpers
export const validators = {
  required: (msg = 'This field is required') => (value: string) => !value.trim() ? msg : null,
  email: (msg = 'Please enter a valid email address') => (value: string) => {
    if (!value.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? msg : null;
  }
};
