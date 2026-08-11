export interface ProductEngineeringDetail {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  overview: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  approach?: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
  businessValue: {
    title: string;
    description: string;
  }[];
  heroImage: string;
}

export const productEngineeringDetails: ProductEngineeringDetail[] = [
  {
    slug: 'solution-discovery',
    title: 'Solution Discovery',
    eyebrow: 'Product Engineering',
    intro: 'Turn complex ideas into clear, validated product directions before committing to full-scale development. We work with stakeholders to understand business objectives, user expectations, technical constraints and market opportunities. Through structured discovery, we reduce uncertainty and create a practical roadmap for successful product delivery.',
    overview: 'Solution Discovery provides the foundation for successful digital product development. Rather than moving directly into engineering, we first establish what should be built, why it matters, who it serves and how it can be delivered effectively. The process brings business, product, design and engineering perspectives together to validate assumptions early and identify potential risks before significant investment is made.',
    capabilities: [
      {
        title: 'Business & Product Alignment',
        description: 'Translate business goals into clear product objectives, measurable outcomes and prioritised requirements.',
      },
      {
        title: 'User & Market Discovery',
        description: 'Understand customer needs, behavioural patterns, market opportunities and competitive pressures before defining the solution.',
      },
      {
        title: 'Technical Feasibility',
        description: 'Evaluate architectures, platforms, integrations and technology options to ensure the proposed product can be delivered securely and effectively.',
      },
      {
        title: 'Product Scope & Prioritisation',
        description: 'Separate essential capabilities from lower-priority features and establish a realistic MVP and future roadmap.',
      },
      {
        title: 'Prototyping & Validation',
        description: 'Use early concepts, workflows and prototypes to test assumptions before committing significant engineering resources.',
      },
      {
        title: 'Delivery Roadmap',
        description: 'Create a structured implementation plan covering milestones, dependencies, risks, resources and future product evolution.',
      },
    ],
    businessValue: [
      {
        title: 'Lower Delivery Risk',
        description: 'Identify technical and business risks before expensive development begins.',
      },
      {
        title: 'Better Investment Decisions',
        description: 'Focus resources on functionality with demonstrated user and commercial value.',
      },
      {
        title: 'Faster Development',
        description: 'Give engineering teams clearer requirements and fewer unresolved questions.',
      },
      {
        title: 'Stronger Product-Market Fit',
        description: 'Align the product with real user needs rather than assumptions.',
      },
      {
        title: 'Clearer Stakeholder Alignment',
        description: 'Create a shared understanding across business, technology and product teams.',
      },
    ],
    heroImage: '/assets/heroes/hero-product-engineering.jpg',
  },
  {
    slug: 'digital-assurance',
    title: 'Digital Assurance',
    eyebrow: 'Product Engineering',
    intro: 'Build secure, reliable and high-performing digital products with quality engineered into every stage of delivery. Our Digital Assurance capabilities combine quality engineering, intelligent automation, security validation and continuous testing to identify issues earlier and support confident releases.',
    overview: 'Quality should not be something tested only at the end of development. Embed assurance across the product lifecycle, from early code and API validation through automated regression, UI testing, security, compliance and performance testing. This shift-left approach helps teams identify defects earlier, reduce rework and release faster.',
    capabilities: [
      {
        title: 'Prevent Production Defects',
        description: 'Embed quality earlier in development through code reviews, API validation and acceptance testing so defects are identified before customers encounter them.',
      },
      {
        title: 'Test Automation at Scale',
        description: 'Use automation and intelligent testing approaches to increase coverage, accelerate regression cycles and reduce repetitive manual testing across web, mobile and enterprise platforms.',
      },
      {
        title: 'Enterprise QA Strategy',
        description: 'Assess existing quality processes, tooling and teams, then design a QA approach aligned with release cadence, business objectives and technical architecture.',
      },
      {
        title: 'Security & Compliance Testing',
        description: 'Combine penetration testing, compliance testing, stress testing and secure engineering practices to improve application resilience.',
      },
      {
        title: 'Agile & DevOps Integrated QA',
        description: 'Embed QA specialists directly into engineering teams and CI/CD workflows instead of treating quality as a separate final activity.',
      },
    ],
    approach: [
      {
        stepNumber: '01',
        title: 'Discovery & Onboarding',
        description: 'Align objectives, systems and expectations.',
      },
      {
        stepNumber: '02',
        title: 'QA Assessment',
        description: 'Review testing processes, tooling, coverage and risks.',
      },
      {
        stepNumber: '03',
        title: 'Strategy Design',
        description: 'Create a tailored quality and automation strategy.',
      },
      {
        stepNumber: '04',
        title: 'Implementation',
        description: 'Embed appropriate tools, frameworks and specialists into delivery pipelines.',
      },
      {
        stepNumber: '05',
        title: 'Transparent Reporting',
        description: 'Provide dashboards, metrics and visibility into quality outcomes.',
      },
      {
        stepNumber: '06',
        title: 'Continuous Optimisation',
        description: 'Continuously improve assurance practices as products and organisations evolve.',
      },
    ],
    businessValue: [
      {
        title: 'Higher Product Quality',
        description: 'Deliver more reliable and robust digital products to customers.',
      },
      {
        title: 'Reduced Production Defects',
        description: 'Catch and fix issues before they reach production environments.',
      },
      {
        title: 'Faster Release Cycles',
        description: 'Accelerate time to market with automated testing and continuous validation.',
      },
      {
        title: 'Better Test Coverage',
        description: 'Increase confidence in releases through comprehensive test automation.',
      },
      {
        title: 'Reduced Manual QA Effort',
        description: 'Free QA specialists to focus on strategic testing rather than repetitive tasks.',
      },
      {
        title: 'Improved Security and Compliance Confidence',
        description: 'Validate security and compliance requirements continuously throughout delivery.',
      },
    ],
    heroImage: '/assets/heroes/hero-product-engineering.jpg',
  },
  {
    slug: 'scaled-agile-delivery',
    title: 'Scaled Agile Delivery',
    eyebrow: 'Product Engineering',
    intro: 'Coordinate complex products, teams and workstreams without sacrificing speed, quality or visibility. We help organisations scale agile delivery across multidisciplinary teams while maintaining clear priorities, strong governance and measurable outcomes.',
    overview: 'Agile methods work effectively within individual teams, but complexity increases significantly when multiple teams, vendors, systems and business units must deliver together. Scaled Agile Delivery establishes the operating model, governance and engineering practices required to coordinate these dependencies while preserving agile principles.',
    capabilities: [
      {
        title: 'Multi-Team Delivery',
        description: 'Coordinate product, engineering, QA, design and platform teams around shared objectives and milestones.',
      },
      {
        title: 'Agile Programme Governance',
        description: 'Provide structured governance without slowing teams through excessive process.',
      },
      {
        title: 'Backlog & Dependency Management',
        description: 'Identify cross-team dependencies early and maintain transparent prioritisation.',
      },
      {
        title: 'Delivery Forecasting',
        description: 'Use delivery data and forecasting techniques to improve predictability and planning confidence.',
      },
      {
        title: 'Continuous Integration & Delivery',
        description: 'Support automated engineering pipelines that make frequent and reliable releases possible.',
      },
      {
        title: 'Transparent Delivery Metrics',
        description: 'Track progress, risks, blockers, quality and outcomes in ways stakeholders can understand.',
      },
    ],
    businessValue: [
      {
        title: 'Faster Enterprise Delivery',
        description: 'Coordinate work across teams while retaining iterative delivery.',
      },
      {
        title: 'Improved Predictability',
        description: 'Use transparent planning and delivery metrics to provide stronger forecasting.',
      },
      {
        title: 'Reduced Coordination Risk',
        description: 'Identify dependencies and blockers before they create major programme delays.',
      },
      {
        title: 'Consistent Quality',
        description: 'Apply engineering and quality practices across all delivery teams.',
      },
      {
        title: 'Greater Visibility',
        description: 'Give stakeholders a clearer view of programme health and outcomes.',
      },
    ],
    heroImage: '/assets/heroes/hero-product-engineering.jpg',
  },
  {
    slug: 'runops',
    title: 'RunOps',
    eyebrow: 'Product Engineering',
    intro: 'Keep critical digital products reliable, available and continuously improving after launch. We combine proactive monitoring, operational support, incident management and continual optimisation to protect business continuity and product performance.',
    overview: 'Launching software is only the beginning of its lifecycle. Modern digital platforms need ongoing monitoring, maintenance, optimisation and operational expertise to remain secure, responsive and reliable as user demand, infrastructure and business requirements evolve. RunOps establishes a structured operational capability around those systems.',
    capabilities: [
      {
        title: 'Application Monitoring',
        description: 'Monitor application health, availability, infrastructure and key performance indicators.',
      },
      {
        title: 'Incident Management',
        description: 'Detect, prioritise and resolve operational incidents with clearly defined escalation processes.',
      },
      {
        title: 'Performance Optimisation',
        description: 'Analyse application and infrastructure behaviour to identify performance bottlenecks and opportunities for improvement.',
      },
      {
        title: 'Operational Support',
        description: 'Provide structured support for production environments and critical business applications.',
      },
      {
        title: 'Reliability Engineering',
        description: 'Improve resilience by identifying recurring failures and addressing root causes instead of repeatedly treating symptoms.',
      },
      {
        title: 'Continuous Improvement',
        description: 'Use operational data and incident insights to continuously enhance reliability, efficiency and user experience.',
      },
    ],
    businessValue: [
      {
        title: 'Higher Availability',
        description: 'Reduce disruption to customer-facing and business-critical services.',
      },
      {
        title: 'Faster Incident Resolution',
        description: 'Create clear processes for detection, escalation and recovery.',
      },
      {
        title: 'Improved Customer Experience',
        description: 'Maintain consistent application performance.',
      },
      {
        title: 'Reduced Operational Risk',
        description: 'Identify vulnerabilities and recurring problems proactively.',
      },
      {
        title: 'Continuous Product Improvement',
        description: 'Feed real production insights back into engineering teams.',
      },
    ],
    heroImage: '/assets/heroes/hero-product-engineering.jpg',
  },
  {
    slug: 'software-architecture',
    title: 'Software Architecture',
    eyebrow: 'Product Engineering',
    intro: 'Build resilient technology foundations that support today\'s requirements and tomorrow\'s growth. Our architects help organisations design secure, scalable and maintainable systems that balance immediate product requirements with long-term technology strategy.',
    overview: 'Architecture decisions influence almost every aspect of a digital product: scalability, performance, security, maintainability, integration capability and future development speed. We analyse business and technical requirements before defining architectures designed to remain adaptable as products and organisations grow.',
    capabilities: [
      {
        title: 'Architecture Assessment',
        description: 'Evaluate existing applications and technology estates to identify structural limitations, security risks and scalability challenges.',
      },
      {
        title: 'Solution Architecture',
        description: 'Translate product requirements into clear application, integration and infrastructure architecture.',
      },
      {
        title: 'Cloud-Native Architecture',
        description: 'Design distributed and cloud-based systems capable of scaling efficiently.',
      },
      {
        title: 'API & Integration Architecture',
        description: 'Create reliable integration patterns that connect applications, platforms and external services.',
      },
      {
        title: 'Modernisation Architecture',
        description: 'Define practical migration paths from tightly coupled or legacy systems towards more flexible architectures.',
      },
      {
        title: 'Security by Design',
        description: 'Incorporate identity, access, data protection and security controls at architecture level.',
      },
    ],
    businessValue: [
      {
        title: 'Scalable Foundations',
        description: 'Allow applications to grow without repeatedly redesigning core systems.',
      },
      {
        title: 'Lower Technical Debt',
        description: 'Make architectural decisions that improve long-term maintainability.',
      },
      {
        title: 'Improved Reliability',
        description: 'Design systems around resilience and failure recovery.',
      },
      {
        title: 'Faster Future Development',
        description: 'Give engineering teams clearer architecture and reusable foundations.',
      },
      {
        title: 'Greater Technology Flexibility',
        description: 'Avoid unnecessary dependency on rigid technologies or architectures.',
      },
    ],
    heroImage: '/assets/heroes/hero-product-engineering.jpg',
  },
];
