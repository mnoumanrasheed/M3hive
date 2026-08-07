export interface ContactPageData {
  title: string;
  subtitle: string;
  description: string;
  directEmail: string;
  formTitle: string;
  formFields: string[];
  disclaimer: string;
  submitButton: string;
}

export const contactPageData: ContactPageData = {
  title: 'Contact Us',
  subtitle: 'We’re Here to Help',
  description: 'Tell us what you are trying to achieve, and our specialists will help you identify the right technology, delivery approach, and next steps.',
  directEmail: 'hello@m3hive.com',
  formTitle: 'Book Your Free Discovery Call',
  formFields: ['First Name', 'Last Name', 'Work Email Address', 'Country', 'Area of Interest'],
  disclaimer: 'By submitting the form, you agree to receive relevant communications from M3 Hive. You may unsubscribe at any time. Please review our Terms and Privacy Notice for information on how we process personal data.',
  submitButton: 'Book My Free Discovery Call',
};
