export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  enabled?: boolean;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface IndustryItem {
  title: string;
  description: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  text: string;
  authorName: string | null;
  authorRole: string | null;
  logo: string | null;
}

export interface ServicePageData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroCta?: {
    label: string;
    href: string;
    enabled: boolean;
  } | null;
  offerings: ServiceOffering[];
  deliveryApproach?: ProcessStep[];
  industries?: IndustryItem[];
  differentiators?: Differentiator[];
  faqs?: FAQItem[];
  testimonials?: Testimonial[];
  successStories?: string[];
}

export interface OfficeLocation {
  id: string;
  country: string;
  city: string | null;
  title: string;
  address: string;
  phone: string | null;
  email: string | null;
  contactPerson: string | null;
  isDevCenter?: boolean;
}

export interface ArticleContent {
  introduction: string;
  keyChallenges: string;
  mainInsights: string;
  practicalImplications: string;
  conclusion: string;
}

export interface CaseStudyContent {
  challenge: string;
  approach: string;
  solution: string;
  outcomes: string;
  keyTakeaway: string;
}

export type ResourceContent = 
  | { type: 'article'; data: ArticleContent }
  | { type: 'case-study'; data: CaseStudyContent };

export interface ResourceItem {
  id: string;
  title: string;
  /** Official heading to display; replaces title on the card when set. */
  displayTitle?: string;
  type: 'article' | 'case-study' | 'resource';
  publishDate: string | null;
  /**
   * Authoritative publish date from officialResourceLinks.
   * null  → hide the date entirely (do NOT fall back to publishDate).
   * undefined → link was not found; fall back to publishDate.
   */
  officialDate?: string | null;
  /** Attribution label shown on the card (e.g. "Salesforce", "Microsoft"). */
  sourceName?: string | null;
  category?: string;
  articleUrl: string | null;
  documentUrl: string | null;
  enabled: boolean;
  internalPath?: string;
  externalUrl?: string | null;
  officialIndexUrl?: string | null;
  content?: ResourceContent;
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string | null;
}

export interface CompliancePillar {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string | null;
  documentUrl: string | null;
  enabled: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  enabled: boolean;
  description?: string;
  dropdown?: NavigationItem[];
}

export interface CompanyStat {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface HomepageData {
  hero: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  intro: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  servicesSummary: {
    title: string;
    services: {
      title: string;
      description: string;
      ctaLabel: string;
      ctaHref: string;
    }[];
  };
  clientsOverview: {
    title: string;
    description: string;
  };
  contactCTA: {
    title: string;
    description: string;
    ctaLabel: string;
    formFields: string[];
    disclaimer: string;
    submitButton: string;
  };
  footer: {
    servicesLinks: string[];
    companyLinks: string[];
    newsletterBlurb: string;
    directEmail: string;
    copyright: string;
    termsAndPrivacy: string;
  };
}

export interface AboutPageData {
  title: string;
  subtitle: string;
  whoWeAreTitle: string;
  whoWeAreDescription: string[];
  clientsTitle: string;
  clientsDescription: string;
  valuesTitle: string;
  values: {
    title: string;
    description: string;
  }[];
  pillarsTitle: string;
  pillars: {
    title: string;
    description: string;
  }[];
  esgCommitment: string;
}

export interface RiskCompliancePageData {
  title: string;
  subtitle: string;
  intro: string;
  contactEmail: string;
  whistleblowerCta: {
    label: string;
    href: string | null;
    enabled: boolean;
  };
}
