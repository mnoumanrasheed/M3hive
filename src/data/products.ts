export type ProductId = 'leadhive-ai' | 'nourdoc' | 'smart-animal';

export interface ProductData {
  id: ProductId;
  name: string;
  category: string;
  dropdownDescription: string;
  positioningLine: string;
  overview: string;
  challenge: string;
  valueProposition: string[];
  intendedUsers: string[];
  collaborationOpportunities: string[];
  heroImage: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; external?: boolean };
}

export const products: ProductData[] = [
  {
    id: 'leadhive-ai', name: 'LeadHive AI', category: 'Lead Engagement & Qualification',
    dropdownDescription: 'Conversational AI for lead engagement and qualification.',
    positioningLine: 'Turn incoming interest into better-qualified sales conversations.',
    overview: 'LeadHive AI is positioned as an AI-enabled lead engagement and qualification engine for organisations that need to respond to enquiries, understand prospect intent and organise follow-up across digital and messaging channels. The story should focus on helping teams move from a raw enquiry to a more useful qualification and hand-off process, not simply on deploying a chatbot.',
    challenge: 'Marketing and sales teams may receive leads through websites, social channels and messaging platforms, while responses, qualification questions and follow-up can be inconsistent.',
    valueProposition: ['Engage prospects through structured conversational interactions.', 'Ask qualification questions.', 'Organise responses against business criteria.', 'Route enquiries to the right team.', 'Support a clearer hand-off to human sales or service teams.'],
    intendedUsers: ['Sales-led businesses', 'Service providers', 'Education and immigration consultancies', 'Real estate teams', 'Other organisations managing digital enquiries'],
    collaborationOpportunities: ['Channel partnerships', 'CRM integration', 'Industry-specific qualification playbooks', 'Pilot deployments', 'Lead-generation agency partnerships'],
    heroImage: '/assets/products/hero-leadhive.jpg',
    primaryCta: { label: 'Book a Demo', href: '/contact?interest=leadhive-ai' },
    secondaryCta: { label: 'Product Page', href: 'https://leadhive-ai.com/', external: true },
  },
  {
    id: 'nourdoc', name: 'NourDoc', category: 'HealthTech AI',
    dropdownDescription: 'AI-powered clinical documentation and healthcare workflows.',
    positioningLine: 'Let AI handle the documentation. Let clinicians focus on care.',
    overview: 'NourDoc is an AI-enabled clinical documentation platform designed to transform clinical conversations and notes into structured healthcare documentation. Its described workflow includes conversation capture, transcription, draft SOAP notes and support for clinical information workflows. Product direction also includes coding support and integration-oriented workflows for healthcare providers and organisations.',
    challenge: 'Clinicians and healthcare teams must capture detailed encounter information while maintaining attention on the patient. Manual or fragmented documentation can add administrative friction, and unstructured information may be difficult to reuse across downstream workflows.',
    valueProposition: ['Support structured draft clinical notes.', 'Help reduce repetitive documentation effort while keeping clinicians responsible for review and finalisation.', 'Support workflows that may include ICD-10 and CPT coding assistance, batch processing and EHR/EMR or HIMS integration, subject to configuration and validation.', 'Consider cloud-native or on-premises deployment according to requirements.'],
    intendedUsers: ['Clinicians', 'Clinics', 'Hospitals', 'Telemedicine providers', 'Medical coding and billing organisations', 'Healthcare technology partners'],
    collaborationOpportunities: ['Clinical pilots', 'Hospital adoption', 'Research and evaluation', 'EHR/EMR integration', 'Distribution', 'Coding and billing workflows', 'Market-specific implementation'],
    heroImage: '/assets/products/hero-nourdoc.jpg',
    primaryCta: { label: 'Book a Demo', href: '/contact?interest=nourdoc-demo' },
    secondaryCta: { label: 'Product Page', href: 'https://nour-doc.com/', external: true },
  },
  {
    id: 'smart-animal', name: 'Smart Animal', category: 'AgriTech & IoT',
    dropdownDescription: 'Connected livestock monitoring and agricultural IoT.',
    positioningLine: 'Connected livestock monitoring for more informed herd management.',
    overview: 'Smart Animal is an IoT-based livestock monitoring and insight platform described in M3 Hive materials as combining collars and digital interfaces to help monitor animal activity and herd information. Documented solution elements include heat detection, rumination and eating-pattern indicators, individual alerts, group-level digestion alerts and mobile herd-management features.',
    challenge: 'Livestock managers need timely visibility into animal behaviour and herd conditions. Periodic observation may not capture every change early enough to support an informed response.',
    valueProposition: ['Collect sensor-based activity and behaviour indicators.', 'Present alerts and herd information through digital interfaces.', 'Support timely attention to potential changes.', 'Create a foundation for analytics as data quality, models and validation mature.'],
    intendedUsers: ['Livestock farms', 'Dairy operations', 'Animal-health professionals', 'Agricultural researchers', 'Integrators', 'Distribution partners'],
    collaborationOpportunities: ['Farm pilots', 'Veterinary and research collaboration', 'Sensor/device integration', 'Field validation', 'Agriculture-sector distribution'],
    heroImage: '/assets/products/hero-smartanimal.jpg',
    primaryCta: { label: 'Discuss a Smart Animal Pilot', href: '/contact?interest=smart-animal' },
    secondaryCta: { label: 'Explore Collaboration', href: '/contact?pathway=research-validation' },
  },
];

export const productById = (id: string) => products.find((product) => product.id === id);
