export interface CustomerExperienceDetail {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  overview: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  businessValue: {
    title: string;
    description: string;
  }[];
  heroImage: string;
}

export const customerExperienceDetails: CustomerExperienceDetail[] = [
  {
    slug: 'user-research',
    title: 'User Research',
    eyebrow: 'Customer Experience',
    intro: 'Understand real users, their needs and behaviours before making critical product decisions.',
    overview: 'User Research brings evidence into product design and development. By understanding users, their goals, behaviours, frustrations and context, teams can make informed decisions instead of relying on assumptions.',
    capabilities: [
      {
        title: 'User Interviews',
        description: 'Explore needs, motivations and challenges through direct conversations.',
      },
      {
        title: 'Behavioural Research',
        description: 'Understand how users interact with existing products and services.',
      },
      {
        title: 'Usability Testing',
        description: 'Identify usability problems by observing users completing realistic tasks.',
      },
      {
        title: 'Personas & User Segments',
        description: 'Convert research findings into clear user groups and behavioural profiles.',
      },
      {
        title: 'Journey Mapping',
        description: 'Visualise the complete customer journey and identify friction points.',
      },
      {
        title: 'Research Insights',
        description: 'Turn qualitative and quantitative findings into actionable product recommendations.',
      },
    ],
    businessValue: [
      {
        title: 'Better Product Decisions',
        description: 'Make informed choices based on real user evidence rather than assumptions.',
      },
      {
        title: 'Reduced Design Risk',
        description: 'Identify usability issues and user needs before investing in development.',
      },
      {
        title: 'Improved Usability',
        description: 'Create products that users can easily understand and use effectively.',
      },
      {
        title: 'Stronger Customer Understanding',
        description: 'Develop deep insights into user behaviours, motivations and pain points.',
      },
      {
        title: 'Higher Adoption and Satisfaction',
        description: 'Deliver experiences that meet real user needs and expectations.',
      },
    ],
    heroImage: '/assets/heroes/hero-customer-experience.jpg',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI UX Design',
    eyebrow: 'Customer Experience',
    intro: 'Create intuitive, accessible and engaging digital experiences built around real user needs.',
    overview: 'UI/UX Design combines user insight, interaction design and visual design to transform complex requirements into simple and effective digital experiences.',
    capabilities: [
      {
        title: 'UX Strategy',
        description: 'Align experience goals with user needs and business objectives.',
      },
      {
        title: 'Information Architecture',
        description: 'Organise content and functionality into clear, intuitive structures.',
      },
      {
        title: 'Interaction Design',
        description: 'Design efficient flows, behaviours and user interactions.',
      },
      {
        title: 'Wireframing & Prototyping',
        description: 'Validate ideas before full implementation.',
      },
      {
        title: 'Visual UI Design',
        description: 'Create polished, consistent and brand-aligned interfaces.',
      },
      {
        title: 'Design Systems',
        description: 'Build reusable components and standards for scalable product experiences.',
      },
    ],
    businessValue: [
      {
        title: 'Improved Customer Experience',
        description: 'Deliver intuitive and enjoyable digital interactions that users value.',
      },
      {
        title: 'Higher Engagement',
        description: 'Create experiences that encourage users to explore and return.',
      },
      {
        title: 'Reduced User Friction',
        description: 'Remove obstacles that prevent users from completing their goals.',
      },
      {
        title: 'Greater Product Consistency',
        description: 'Maintain coherent experiences across all product touchpoints.',
      },
      {
        title: 'Faster Design and Development',
        description: 'Accelerate delivery with reusable design systems and clear specifications.',
      },
    ],
    heroImage: '/assets/heroes/hero-customer-experience.jpg',
  },
  {
    slug: 'product-discovery',
    title: 'Product Discovery',
    eyebrow: 'Customer Experience',
    intro: 'Validate opportunities, define the right product and create a clear path from idea to delivery.',
    overview: 'Product Discovery helps determine which problems are worth solving and which solutions can create meaningful user and business value before significant engineering investment is made.',
    capabilities: [
      {
        title: 'Opportunity Discovery',
        description: 'Identify valuable customer and market opportunities.',
      },
      {
        title: 'Problem Definition',
        description: 'Clearly define user problems and desired outcomes.',
      },
      {
        title: 'Idea Validation',
        description: 'Test product assumptions before committing resources.',
      },
      {
        title: 'MVP Definition',
        description: 'Prioritise the minimum capabilities needed to validate value.',
      },
      {
        title: 'Prototyping',
        description: 'Explore and test potential solutions rapidly.',
      },
      {
        title: 'Product Roadmapping',
        description: 'Establish priorities and a practical path toward delivery.',
      },
    ],
    businessValue: [
      {
        title: 'Reduced Product Risk',
        description: 'Validate ideas before making significant investment in development.',
      },
      {
        title: 'Faster Validation',
        description: 'Test assumptions quickly through prototyping and user feedback.',
      },
      {
        title: 'Better Investment Decisions',
        description: 'Focus resources on opportunities with demonstrated user and business value.',
      },
      {
        title: 'Stronger Product-Market Fit',
        description: 'Ensure products solve real problems for the right audience.',
      },
      {
        title: 'Clearer Development Priorities',
        description: 'Give engineering teams a validated roadmap and clear direction.',
      },
    ],
    heroImage: '/assets/heroes/hero-customer-experience.jpg',
  },
  {
    slug: 'product-management',
    title: 'Product Management',
    eyebrow: 'Customer Experience',
    intro: 'Turn product strategy into focused execution and measurable business outcomes.',
    overview: 'Product Management connects customer needs, business objectives and engineering delivery. It provides the direction, prioritisation and coordination needed to evolve successful digital products.',
    capabilities: [
      {
        title: 'Product Strategy',
        description: 'Define product vision, objectives and measurable outcomes.',
      },
      {
        title: 'Roadmap Management',
        description: 'Establish priorities across short and long-term initiatives.',
      },
      {
        title: 'Backlog Prioritisation',
        description: 'Ensure engineering effort focuses on highest-value work.',
      },
      {
        title: 'Stakeholder Alignment',
        description: 'Coordinate business, design and technology stakeholders.',
      },
      {
        title: 'Product Lifecycle Management',
        description: 'Guide products from discovery through launch and continuous evolution.',
      },
      {
        title: 'Performance Measurement',
        description: 'Use product metrics and customer feedback to drive future decisions.',
      },
    ],
    businessValue: [
      {
        title: 'Clear Product Direction',
        description: 'Establish a shared vision and strategic goals for the product.',
      },
      {
        title: 'Better Prioritisation',
        description: 'Focus team effort on the highest-impact work.',
      },
      {
        title: 'Faster Decision-Making',
        description: 'Make informed product decisions with clarity and confidence.',
      },
      {
        title: 'Stronger Stakeholder Alignment',
        description: 'Create shared understanding across business, design and engineering.',
      },
      {
        title: 'Continuous Product Improvement',
        description: 'Evolve products based on real performance data and user feedback.',
      },
    ],
    heroImage: '/assets/heroes/hero-customer-experience.jpg',
  },
];
