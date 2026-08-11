import { ServicePageData } from '../../types/content';

export const customerExperienceData: ServicePageData = {
  id: 'customer-experience',
  slug: '/services/customer-experience',
  title: 'Customer Experience',
  subtitle: 'Design Experiences That Customers Value and Businesses Can Measure',
  heroCta: {
    label: 'Talk to Our CX Experts',
    href: '/contact',
    enabled: true,
  },
  offerings: [
    {
      id: 'user-research',
      title: 'User Research',
      description: 'Engage real users early to understand needs, behaviours, expectations, and pain points. Actionable insight reduces assumptions, lowers delivery risk, and enables better product decisions.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/customer-experience/user-research',
    },
    {
      id: 'ui-ux-design',
      title: 'UI and UX Design',
      description: 'Create intuitive, accessible, and visually coherent interfaces that help users complete tasks with confidence. We balance aesthetics, usability, functionality, and business objectives across every interaction.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/customer-experience/ui-ux-design',
    },
    {
      id: 'product-discovery',
      title: 'Product Discovery',
      description: 'Validate the problem, opportunity, audience, and solution direction before full development. Early testing reduces waste, strengthens product-market fit, and improves time to value.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/customer-experience/product-discovery',
    },
    {
      id: 'product-management',
      title: 'Product Management',
      description: 'Define product vision, priorities, roadmaps, and success measures. We help teams respond to market change, make evidence-based decisions, and deliver the right capabilities to the right users at the right time.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/customer-experience/product-management',
    },
  ],
  deliveryApproach: [
    {
      stepNumber: '01',
      title: 'Customer Insight and Research',
      description: 'We combine interviews, observation, analytics, and behavioural data to understand user motivations, barriers, and opportunities.',
    },
    {
      stepNumber: '02',
      title: 'Journey Mapping and Experience Design',
      description: 'We map customer journeys across channels to identify friction, improve consistency, and strengthen engagement at every touchpoint.',
    },
    {
      stepNumber: '03',
      title: 'Rapid Prototyping and UX Testing',
      description: 'Interactive prototypes, usability testing, feedback loops, and experimentation allow experiences to be refined before and during development.',
    },
    {
      stepNumber: '04',
      title: 'Agile Product Development',
      description: 'Design and engineering work together throughout delivery, enabling faster iteration, stronger alignment, and reduced implementation risk.',
    },
    {
      stepNumber: '05',
      title: 'Continuous Improvement',
      description: 'We use analytics, user feedback, market insight, and design audits to improve experiences after launch and maintain relevance over time.',
    },
  ],
  industries: [
    {
      title: 'Banking & Financial Services',
      description: 'Design secure and intuitive financial experiences for digital onboarding, fraud prevention, risk assessment, servicing, and customer self-service.',
    },
    {
      title: 'Retail & Consumer',
      description: 'Create personalised omnichannel journeys that improve discovery, conversion, loyalty, and the overall shopping experience.',
    },
    {
      title: 'Healthcare & Life Sciences',
      description: 'Design human-centred experiences for telehealth, patient portals, diagnostics, and care-management platforms while maintaining security and accessibility.',
    },
    {
      title: 'Hi-Tech',
      description: 'Build and evolve digital products through continuous research, product management, automation, and data-informed experience design.',
    },
    {
      title: 'Travel & Hospitality',
      description: 'Improve booking, personalisation, support, and service experiences through customer research, journey design, and connected digital touchpoints.',
    },
    {
      title: 'Livestock & AgriTech',
      description: 'Create practical digital tools that improve visibility, usability, field adoption, and decision-making across livestock and agricultural operations.',
    },
  ],
  differentiators: [
    {
      title: 'Decisions Grounded in User Evidence',
      description: 'Research, analytics, and usability testing ensure design decisions are based on real behaviour rather than assumption—supporting stronger retention, satisfaction, and customer value.',
    },
    {
      title: 'End-to-End UX and UI Capability',
      description: 'We connect research, strategy, interaction design, visual design, prototyping, and engineering to create cohesive experiences across the product lifecycle.',
    },
    {
      title: 'Cross-Functional Collaboration',
      description: 'Researchers, designers, product specialists, data experts, and engineers work as one team to improve consistency, feasibility, and speed.',
    },
    {
      title: 'AI-Powered Experience Insight',
      description: 'We use AI-enabled analytics, design audits, and journey intelligence to identify friction, prioritise improvements, and increase engagement and conversion.',
    },
  ],
};
