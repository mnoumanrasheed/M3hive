export interface OurApproachOffering {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface OurApproachDetail {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  overview: string;
  focusAreas: string[];
  value: string[];
  heroImage: string;
}

export const ourApproachOfferings: OurApproachOffering[] = [
  {
    id: 'co-labs',
    title: 'Co/LABS',
    description: 'A new way of partnering. Collaborate closely with M3 Hive experts to accelerate your digital journey, explore ideas and develop innovative solutions.',
    ctaLabel: 'Explore Details',
    ctaHref: '/our-approach/co-labs',
  },
  {
    id: 'data-insights-platform',
    title: 'Data & Insights Platform',
    description: 'Bring data and insight together to help teams understand opportunities, make informed decisions and create stronger digital experiences.',
    ctaLabel: 'Explore Details',
    ctaHref: '/our-approach/data-insights-platform',
  },
  {
    id: 'access-to-experts',
    title: 'Access to Experts',
    description: 'Test ideas, explore opportunities and connect directly with M3 Hive specialists for practical business and technology expertise.',
    ctaLabel: 'Explore Details',
    ctaHref: '/our-approach/access-to-experts',
  },
];

export const ourApproachDetails: OurApproachDetail[] = [
  {
    slug: 'co-labs',
    title: 'Co/LABS',
    eyebrow: 'Our Approach',
    intro: 'A new way of partnering.',
    overview: 'Co/LABS is built around close collaboration between clients and M3 Hive experts. It provides a practical environment for exploring ideas, solving challenges and developing innovative solutions that can accelerate the client\'s digital journey.',
    focusAreas: [
      'Collaborative discovery',
      'Exploring and validating ideas',
      'Innovation workshops',
      'Rapid solution exploration',
      'Access to multidisciplinary expertise',
      'Turning ideas into practical next steps',
    ],
    value: [
      'Faster exploration of opportunities',
      'Better stakeholder collaboration',
      'Reduced early-stage uncertainty',
      'Access to relevant expertise',
      'Clearer path from idea to execution',
    ],
    heroImage: '/assets/heroes/hero-resources.jpg',
  },
  {
    slug: 'data-insights-platform',
    title: 'Data & Insights Platform',
    eyebrow: 'Our Approach',
    intro: 'Use data and insight to create clearer decisions and stronger digital experiences.',
    overview: 'The Data & Insights Platform approach helps organisations make more effective use of their information by connecting relevant data, improving visibility and turning information into practical insights.',
    focusAreas: [
      'Bringing relevant data together',
      'Improving data accessibility',
      'Analytics and insight enablement',
      'Clearer performance visibility',
      'Supporting informed decisions',
      'Creating foundations for future data-driven initiatives',
    ],
    value: [
      'Better visibility',
      'Faster access to insight',
      'More informed decisions',
      'Reduced information silos',
      'Stronger data-driven capability',
    ],
    heroImage: '/assets/heroes/hero-resources.jpg',
  },
  {
    slug: 'access-to-experts',
    title: 'Access to Experts',
    eyebrow: 'Our Approach',
    intro: 'A direct bridge into M3 Hive expertise.',
    overview: 'Access to Experts enables organisations to explore ideas, questions and technology opportunities directly with experienced M3 Hive specialists. It provides practical access to expertise across areas such as engineering, product, data, design and emerging technologies.',
    focusAreas: [
      'Specialist consultation',
      'Exploring ideas and opportunities',
      'Technical guidance',
      'Product and engineering expertise',
      'Data and technology discussions',
      'Collaborative knowledge sharing',
    ],
    value: [
      'Faster access to specialist expertise',
      'Better informed decisions',
      'Reduced uncertainty',
      'Practical guidance',
      'Stronger internal capability',
    ],
    heroImage: '/assets/heroes/hero-resources.jpg',
  },
];
