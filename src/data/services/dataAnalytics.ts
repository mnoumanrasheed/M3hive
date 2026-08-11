import { ServicePageData } from '../../types/content';

export const dataAnalyticsData: ServicePageData = {
  id: 'data-and-analytics',
  slug: '/services/data-and-analytics',
  title: 'Data & Analytics',
  subtitle: 'Turn Data Complexity into Clear, Actionable Insight',
  heroCta: {
    label: 'Talk to Our Data Experts',
    href: '/contact',
    enabled: true,
  },
  offerings: [
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Use advanced analytics, machine learning, and statistical modelling to identify patterns, forecast outcomes, support decisions, and uncover new opportunities.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/data-and-analytics/data-science',
    },
    {
      id: 'modern-data-technology',
      title: 'Modern Data Technology',
      description: 'Modernise data architecture, engineering, integration, and storage to improve speed, scalability, resilience, and AI readiness.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/data-and-analytics/modern-data-technology',
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      description: 'Provide decision-makers with timely dashboards, reporting, and self-service analytics that translate data into practical business action.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/data-and-analytics/business-intelligence',
    },
    {
      id: 'big-data-platforms',
      title: 'Big Data Platforms',
      description: 'Design and operate scalable platforms capable of processing large, complex, and rapidly changing data while improving transparency and performance.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/data-and-analytics/big-data-platforms',
    },
  ],
  deliveryApproach: [
    {
      stepNumber: '01',
      title: 'Data Maturity and Discovery Assessment',
      description: 'We assess the current data landscape, business priorities, governance, technology, and user needs. This identifies capability gaps, priority use cases, and a practical roadmap for analytics and future AI adoption.',
    },
    {
      stepNumber: '02',
      title: 'MVP Delivery and Environment Design',
      description: 'Focused MVPs validate value and reveal operational requirements early. In parallel, we design secure, scalable data environments and governance models using modern architectural patterns.',
    },
    {
      stepNumber: '03',
      title: 'Enterprise Integration',
      description: 'We build reliable data flows across operational systems, analytics platforms, reporting tools, and AI pipelines so information remains consistent, timely, and useful throughout the organisation.',
    },
    {
      stepNumber: '04',
      title: 'Operational Adoption',
      description: 'Dashboards, alerts, self-service tools, and workflow automation integrate insight into everyday decisions. Training, feedback, and change support help users adopt new capabilities effectively.',
    },
    {
      stepNumber: '05',
      title: 'Enterprise Scaling and Governance',
      description: 'We monitor usage, performance, quality, and return on investment to guide expansion. Governance and change-management frameworks keep the data ecosystem secure, compliant, resilient, and ready for future innovation.',
    },
  ],
  industries: [
    {
      title: 'Banking & Financial Services',
      description: 'Improve fraud detection, automate compliance, and strengthen customer insight through secure, governed, and high-frequency data platforms.',
    },
    {
      title: 'Retail & Consumer',
      description: 'Use real-time insight to personalise experiences, predict demand, optimise inventory, and improve decisions across merchandising, marketing, and supply chains.',
    },
    {
      title: 'Healthcare & Life Sciences',
      description: 'Support clinical decisions, monitor patient journeys, improve diagnostics, and manage sensitive data securely through predictive and operational analytics.',
    },
    {
      title: 'Hi-Tech',
      description: 'Use engineering, product-usage, and performance data to improve development, adoption, quality assurance, and release decisions.',
    },
    {
      title: 'Travel & Hospitality',
      description: 'Improve forecasting, pricing, personalisation, and operational performance by turning customer and service data into timely insight.',
    },
    {
      title: 'Livestock & AgriTech',
      description: 'Use production data and predictive models to improve quality, reduce downtime, strengthen resource planning, and create more resilient operations.',
    },
  ],
  differentiators: [
    {
      title: 'End-to-End Data Observability',
      description: 'Monitor lineage, usage, quality, performance, and cost across the data estate. Greater transparency helps identify issues earlier and supports regulatory confidence.',
    },
    {
      title: 'Faster Delivery Through Automation',
      description: 'Automate profiling, schema mapping, testing, and pipeline recovery to reduce manual effort and bring new data products into production more quickly.',
    },
    {
      title: 'Trusted, Enterprise-Ready Data',
      description: 'Strengthen governance through cataloguing, quality controls, master-data management, security, and clearly defined ownership.',
    },
    {
      title: 'AI-Assisted Operational Resilience',
      description: 'Use intelligent agents to identify issues, support root-cause analysis, and trigger automated recovery workflows—improving uptime and reducing manual intervention.',
    },
  ],
};
