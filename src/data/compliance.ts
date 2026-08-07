import { CompliancePillar, RiskCompliancePageData } from '../types/content';

export const legalLinkMap = {
  termsOfUse: null,
  codeOfConduct: null,
  compliancePolicy: null,
  dignityAndRespect: null,
  modernSlaveryStatement: null,
  whistleblowerPolicy: null,
  privacyNotice: null,
} as const;

export const compliancePageData: RiskCompliancePageData = {
  title: 'Risk & Compliance',
  subtitle: 'Integrity in Every Decision',
  intro: 'Integrity is fundamental to how M3 Hive operates. Our risk and compliance framework supports ethical decision-making, responsible business conduct, transparency, and accountability across every part of the organisation.',
  contactEmail: 'hello@m3hive.com',
  whistleblowerCta: {
    label: 'View the Whistleblower Policy',
    href: legalLinkMap.whistleblowerPolicy,
    enabled: false,
  },
};

export const compliancePillars: CompliancePillar[] = [
  {
    id: 'code-of-conduct',
    title: 'Code of Conduct',
    description: 'Our Code of Conduct explains how M3 Hive values should guide everyday decisions, professional behaviour, and interactions with colleagues, clients, partners, and communities. It defines the standards expected from everyone working with or on behalf of M3 Hive.',
    ctaLabel: 'Read the M3 Hive Code of Conduct',
    ctaHref: legalLinkMap.codeOfConduct,
    documentUrl: legalLinkMap.codeOfConduct,
    enabled: true,
  },
  {
    id: 'compliance-policy',
    title: 'Compliance Policy',
    description: 'M3 Hive operates according to clear principles of transparency and integrity. Our compliance policies establish robust standards relating to anti-corruption, bribery, fraud, conflicts of interest, and other forms of financial misconduct.',
    ctaLabel: 'Read the M3 Hive Compliance Policy',
    ctaHref: legalLinkMap.compliancePolicy,
    documentUrl: legalLinkMap.compliancePolicy,
    enabled: true,
  },
  {
    id: 'dignity-and-respect',
    title: 'Dignity and Respect',
    description: 'We are committed to providing a positive, inclusive, and equal-opportunity workplace across all global locations. Our policy defines the standards of behaviour required to maintain a professional environment free from discrimination, harassment, intimidation, and offensive conduct.',
    ctaLabel: 'Read the Dignity and Respect Policy',
    ctaHref: legalLinkMap.dignityAndRespect,
    documentUrl: legalLinkMap.dignityAndRespect,
    enabled: true,
  },
  {
    id: 'dei-report',
    title: 'Diversity, Equity and Inclusion',
    description: 'Our ESG and DE&I framework reflects our commitment to equal opportunity, dignity, and inclusive career growth for all employees worldwide.',
    ctaLabel: 'Read the Diversity, Equity and Inclusion Report',
    ctaHref: legalLinkMap.privacyNotice,
    documentUrl: legalLinkMap.privacyNotice,
    enabled: true,
  },
  {
    id: 'modern-slavery-statement',
    title: 'Slavery and Human Trafficking Statement 2023',
    description: 'M3 Hive maintains a zero-tolerance approach to slavery and human trafficking. We are committed to complying with the Modern Slavery Act 2015 and to promoting responsible practices throughout our operations and wider supply chain.',
    ctaLabel: 'Read the Slavery and Human Trafficking Statement',
    ctaHref: legalLinkMap.modernSlaveryStatement,
    documentUrl: legalLinkMap.modernSlaveryStatement,
    enabled: true,
  },
];
