export interface IntelligentAutomationDetail {
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

export const intelligentAutomationDetails: IntelligentAutomationDetail[] = [
  {
    slug: 'digital-adoption-platforms',
    title: 'Digital Adoption Platforms',
    eyebrow: 'Intelligent Automation',
    intro: 'Help users adopt enterprise applications faster with contextual guidance, in-app support and actionable usage insights.',
    overview: 'Digital Adoption Platforms improve how employees interact with enterprise applications by providing guidance directly inside the software they use. They help simplify onboarding, reduce training effort, improve process consistency and increase adoption of complex business systems.',
    capabilities: [
      {
        title: 'In-App Guidance',
        description: 'Provide contextual walkthroughs, prompts and assistance directly inside enterprise applications.',
      },
      {
        title: 'Employee Onboarding',
        description: 'Guide new users through important workflows, application features and day-to-day processes.',
      },
      {
        title: 'Contextual Support',
        description: 'Deliver relevant help at the point of need instead of relying only on external manuals or training.',
      },
      {
        title: 'Usage Analytics',
        description: 'Understand how employees use applications and identify friction, adoption gaps and areas for improvement.',
      },
      {
        title: 'Process Guidance',
        description: 'Help users follow complex business workflows consistently across enterprise platforms.',
      },
      {
        title: 'Continuous Adoption Optimisation',
        description: 'Use usage data and feedback to continuously improve application adoption and guidance.',
      },
    ],
    businessValue: [
      {
        title: 'Faster User Adoption',
        description: 'Help employees become productive with new systems sooner.',
      },
      {
        title: 'Reduced Training Effort',
        description: 'Lower reliance on repetitive classroom and manual training.',
      },
      {
        title: 'Improved Productivity',
        description: 'Reduce time spent searching for help or navigating unfamiliar systems.',
      },
      {
        title: 'Better Process Compliance',
        description: 'Guide users through required workflows more consistently.',
      },
      {
        title: 'Greater Technology ROI',
        description: 'Increase utilisation and value from existing enterprise applications.',
      },
    ],
    heroImage: '/assets/heroes/hero-intelligent-automation.jpg',
  },
  {
    slug: 'integration-platform-as-a-service',
    title: 'Integration Platform as a Service',
    eyebrow: 'Intelligent Automation',
    intro: 'Connect enterprise systems, applications, APIs and data through scalable integration and automation.',
    overview: 'Integration Platform as a Service provides a flexible way to connect cloud and on-premise applications, data sources and business processes. It reduces fragmented integrations, manual data transfers and operational handoffs by enabling systems to exchange information through structured, reusable integration services.',
    capabilities: [
      {
        title: 'Application Integration',
        description: 'Connect enterprise applications and platforms across different business functions.',
      },
      {
        title: 'API Integration',
        description: 'Create and manage reliable connections between internal and external APIs.',
      },
      {
        title: 'Data Integration',
        description: 'Synchronise information across systems and improve consistency of business data.',
      },
      {
        title: 'Workflow Automation',
        description: 'Automate processes that span multiple applications, systems and teams.',
      },
      {
        title: 'Integration Monitoring',
        description: 'Monitor integration health, failures, transaction flows and operational performance.',
      },
      {
        title: 'Reusable Integration Services',
        description: 'Build reusable connectors and integration patterns that accelerate future integration work.',
      },
    ],
    businessValue: [
      {
        title: 'Reduced Manual Work',
        description: 'Automate information transfer and repetitive system-to-system processes.',
      },
      {
        title: 'Better Data Consistency',
        description: 'Keep information aligned across connected applications.',
      },
      {
        title: 'Faster Integration Delivery',
        description: 'Reuse integration patterns instead of rebuilding connections repeatedly.',
      },
      {
        title: 'Improved Operational Visibility',
        description: 'Gain clearer insight into connected workflows and integration performance.',
      },
      {
        title: 'Greater Business Agility',
        description: 'Connect new applications and services faster as requirements evolve.',
      },
    ],
    heroImage: '/assets/heroes/hero-intelligent-automation.jpg',
  },
  {
    slug: 'rpa',
    title: 'Robotic Process Automation (RPA)',
    eyebrow: 'Intelligent Automation',
    intro: 'Automate repetitive, rules-based work and give your teams more time to focus on higher-value activities.',
    overview: 'Robotic Process Automation uses software bots to perform repetitive digital tasks across existing applications and systems. It can reduce manual effort, improve consistency and accelerate high-volume business processes without requiring organisations to replace their existing technology landscape.',
    capabilities: [
      {
        title: 'Process Assessment',
        description: 'Identify repetitive, rules-based processes with strong automation potential and measurable business value.',
      },
      {
        title: 'Workflow Automation',
        description: 'Automate structured tasks across applications, portals, spreadsheets and enterprise systems.',
      },
      {
        title: 'System Integration',
        description: 'Connect automated workflows across existing applications and legacy environments.',
      },
      {
        title: 'Exception Handling',
        description: 'Design workflows that recognise exceptions and route cases requiring human judgement appropriately.',
      },
      {
        title: 'Bot Monitoring & Governance',
        description: 'Track bot performance, failures, utilisation and operational outcomes through structured governance.',
      },
      {
        title: 'Automation Optimisation',
        description: 'Continuously improve automated processes as business rules, systems and requirements evolve.',
      },
    ],
    businessValue: [
      {
        title: 'Reduced Manual Effort',
        description: 'Free teams from repetitive operational work.',
      },
      {
        title: 'Faster Processing',
        description: 'Complete high-volume tasks more quickly and consistently.',
      },
      {
        title: 'Improved Accuracy',
        description: 'Reduce errors caused by repetitive manual processing.',
      },
      {
        title: 'Lower Operational Cost',
        description: 'Increase efficiency without proportionally increasing headcount.',
      },
      {
        title: 'Greater Scalability',
        description: 'Handle growing transaction volumes through automated capacity.',
      },
    ],
    heroImage: '/assets/heroes/hero-intelligent-automation.jpg',
  },
  {
    slug: 'process-mining',
    title: 'Process Mining',
    eyebrow: 'Intelligent Automation',
    intro: 'Turn operational data into a clear view of how your business processes actually perform.',
    overview: 'Process Mining analyses event data generated by enterprise systems to reconstruct real business processes. It helps organisations identify bottlenecks, variations, delays and automation opportunities based on evidence rather than assumptions.',
    capabilities: [
      {
        title: 'Process Discovery',
        description: 'Automatically reconstruct actual process flows from system event data.',
      },
      {
        title: 'Process Performance Analysis',
        description: 'Measure cycle times, delays, rework and operational inefficiencies.',
      },
      {
        title: 'Conformance Analysis',
        description: 'Compare real process execution with expected or designed workflows.',
      },
      {
        title: 'Bottleneck Identification',
        description: 'Identify stages where work repeatedly slows, queues or requires unnecessary intervention.',
      },
      {
        title: 'Automation Opportunity Detection',
        description: 'Find process steps that are strong candidates for automation or redesign.',
      },
      {
        title: 'Continuous Process Monitoring',
        description: 'Track improvements and detect emerging inefficiencies as processes evolve.',
      },
    ],
    businessValue: [
      {
        title: 'Greater Process Visibility',
        description: 'Understand how operations work in practice.',
      },
      {
        title: 'Reduced Bottlenecks',
        description: 'Identify and address sources of delay.',
      },
      {
        title: 'Better Automation Decisions',
        description: 'Prioritise automation opportunities using real process evidence.',
      },
      {
        title: 'Improved Compliance',
        description: 'Identify deviations from expected workflows.',
      },
      {
        title: 'Continuous Improvement',
        description: 'Measure whether process changes deliver sustainable results.',
      },
    ],
    heroImage: '/assets/heroes/hero-intelligent-automation.jpg',
  },
  {
    slug: 'low-code-no-code',
    title: 'Low-Code Applications',
    eyebrow: 'Intelligent Automation',
    intro: 'Build and evolve business applications faster with flexible low-code development.',
    overview: 'Low-code platforms allow organisations to digitise workflows and create business applications using reusable components, visual development and rapid integration capabilities. They can help teams respond faster to changing requirements while maintaining appropriate engineering standards, governance and integration with enterprise systems.',
    capabilities: [
      {
        title: 'Rapid Application Development',
        description: 'Create business applications and workflows faster using reusable low-code components.',
      },
      {
        title: 'Workflow Digitisation',
        description: 'Replace manual, spreadsheet-based and fragmented processes with structured digital workflows.',
      },
      {
        title: 'Enterprise Integration',
        description: 'Connect low-code applications with APIs, databases and existing enterprise platforms.',
      },
      {
        title: 'User Experience Design',
        description: 'Create intuitive interfaces tailored to business users and operational requirements.',
      },
      {
        title: 'Governance & Security',
        description: 'Apply appropriate access controls, development standards and lifecycle governance.',
      },
      {
        title: 'Application Modernisation',
        description: 'Replace ageing manual or legacy workflows with more adaptable digital solutions.',
      },
    ],
    businessValue: [
      {
        title: 'Faster Time to Value',
        description: 'Launch operational applications more quickly.',
      },
      {
        title: 'Reduced Development Effort',
        description: 'Use reusable components for common business requirements.',
      },
      {
        title: 'Greater Business Agility',
        description: 'Adapt workflows as business requirements change.',
      },
      {
        title: 'Improved User Experience',
        description: 'Replace fragmented processes with simpler digital experiences.',
      },
      {
        title: 'Scalable Digitalisation',
        description: 'Digitise more processes without creating unnecessary engineering complexity.',
      },
    ],
    heroImage: '/assets/heroes/hero-intelligent-automation.jpg',
  },
  {
    slug: 'intelligent-document-processing',
    title: 'Intelligent / Generative Automation',
    eyebrow: 'Intelligent Automation',
    intro: 'Combine automation and AI to handle more complex work, decisions and unstructured information.',
    overview: 'Intelligent Automation extends traditional workflow automation by combining AI with automated processes. This allows organisations to work with documents, natural language and complex business information while keeping people involved where judgement, approval or oversight is required.',
    capabilities: [
      {
        title: 'Intelligent Document Processing',
        description: 'Extract, classify and validate information from documents and other unstructured content.',
      },
      {
        title: 'AI-Assisted Workflows',
        description: 'Use AI capabilities within business workflows to analyse information and support decisions.',
      },
      {
        title: 'Natural Language Automation',
        description: 'Enable workflows that understand, generate or route text-based information.',
      },
      {
        title: 'Decision Support',
        description: 'Surface relevant information and recommendations to help teams make faster decisions.',
      },
      {
        title: 'Human-in-the-Loop Automation',
        description: 'Route sensitive or uncertain decisions to people for review and approval.',
      },
      {
        title: 'End-to-End Workflow Orchestration',
        description: 'Coordinate AI, automation, enterprise applications and human tasks in unified processes.',
      },
    ],
    businessValue: [
      {
        title: 'Automate More Complex Work',
        description: 'Go beyond simple rules-based processes.',
      },
      {
        title: 'Faster Decision Support',
        description: 'Give teams relevant information when they need it.',
      },
      {
        title: 'Improved Productivity',
        description: 'Reduce manual handling of documents and information-intensive tasks.',
      },
      {
        title: 'Better Customer & Employee Experience',
        description: 'Accelerate workflows and reduce unnecessary administrative effort.',
      },
      {
        title: 'Controlled Automation',
        description: 'Combine automation speed with appropriate human oversight.',
      },
    ],
    heroImage: '/assets/heroes/hero-intelligent-automation.jpg',
  },
];
