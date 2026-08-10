import { ServicePageData } from '../../types/content';

export const aiServicesData: ServicePageData = {
  id: 'artificial-intelligence',
  slug: '/services/artificial-intelligence',
  title: 'Artificial Intelligence Services',
  subtitle: 'Move from AI Ambition to Measurable Business Value',
  heroCta: {
    label: 'Talk to Our AI Experts',
    href: '/contact',
    enabled: true,
  },
  offerings: [
    {

      id: 'ai-enabled-engineering',
      title: 'AI-Enabled Engineering',
      description: 'Embed intelligence throughout the software-development lifecycle to accelerate delivery, reduce rework, improve code quality, and strengthen engineering consistency. Our AI-enabled workflows help teams develop faster without compromising security, governance, or technical standards.',
      ctaLabel: 'Explore AI-Enabled Engineering',
      ctaHref: '/services/artificial-intelligence/ai-enabled-engineering',
      enabled: true,
    },
    {
      id: 'agentic-ai',
      title: 'Agentic AI',
      description: 'Design intelligent agents that can reason, plan, take action, and adapt to changing conditions. By combining context, decision-making, and workflow integration, agentic AI enables proactive automation across complex business processes.',
      ctaLabel: 'Explore Agentic AI',
      ctaHref: '/services/artificial-intelligence/agentic-ai',
      enabled: true,
    },
    {
      id: 'generative-ai',
      title: 'Generative AI',
      description: 'Use generative AI to create content, personalise experiences, accelerate knowledge work, support decision-making, and reduce repetitive effort. We design solutions that integrate securely with your data and workflows to create practical and scalable business value.',
      ctaLabel: 'Explore Generative AI',
      ctaHref: '/services/artificial-intelligence/generative-ai',
      enabled: true,
    },
    {
      id: 'conversational-ai',
      title: 'Conversational AI',
      description: 'Transform customer and employee interactions through intelligent virtual assistants and conversational solutions. Our platforms improve responsiveness, reduce service costs, support round-the-clock availability, and integrate directly with existing business systems.',
      ctaLabel: 'Explore Conversational AI',
      ctaHref: '/services/artificial-intelligence/conversational-ai',
      enabled: true,
    },
    {
      id: 'mlops',
      title: 'MLOps',
      description: 'Move AI models into production faster and operate them reliably at scale. Our MLOps frameworks support deployment, monitoring, versioning, retraining, governance, and continuous performance improvement.',
      ctaLabel: 'Explore MLOps',
      ctaHref: '/services/artificial-intelligence/mlops',
      enabled: true,
    },
    {
      id: 'responsible-ai',
      title: 'Responsible AI',
      description: 'Build AI systems that are transparent, explainable, secure, and aligned with regulatory expectations. We integrate responsible-AI principles into governance, data protection, model design, bias management, monitoring, and operational controls.',
      ctaLabel: 'Explore Responsible AI',
      ctaHref: '/services/artificial-intelligence/responsible-ai',
      enabled: true,
    },
  ],
  deliveryApproach: [
    {
      stepNumber: '01',
      title: 'AI Technology Assessment and Opportunity Scan',
      description: 'We assess your business priorities, technology landscape, available data, and operational challenges to identify the most valuable AI opportunities. Collaborative workshops help prioritise use cases, evaluate technology and vendors, define business cases, and establish a practical implementation roadmap.',
    },
    {
      stepNumber: '02',
      title: 'Piloting and Integration Planning',
      description: 'We develop focused pilot solutions to validate feasibility, value, user adoption, and security requirements. At the same time, we evaluate infrastructure, architecture, data readiness, and operating-model requirements to prepare for successful integration and scale.',
    },
    {
      stepNumber: '03',
      title: 'Data Preparation and Live-Data Connectivity',
      description: 'We connect, structure, and manage historical and real-time data to give AI systems the context required for accurate decisions and relevant responses. This foundation supports stronger performance, continuous learning, and effective integration into business workflows.',
    },
    {
      stepNumber: '04',
      title: 'Model Fine-Tuning and Prompt Engineering',
      description: 'We evaluate model options, engineer prompts, optimise token usage, define safeguards, and test performance through structured experimentation. This process balances accuracy, speed, reliability, control, and operating cost.',
    },
    {
      stepNumber: '05',
      title: 'Integration into Complex Workflows',
      description: 'We embed AI into critical processes using model triggers, intelligent agents, secure tool access, and human-in-the-loop controls. Real-time monitoring, auditability, and exception handling provide the oversight required for dependable enterprise use.',
    },
    {
      stepNumber: '06',
      title: 'Enterprise-Scale Operations and Governance',
      description: 'We integrate AI into enterprise architecture and governance so that solutions remain secure, efficient, and adaptable. Monitoring, data protection, model updates, cost management, and performance controls help prevent successful AI systems from becoming tomorrow’s legacy technology.',
    },
  ],
  industries: [
    {
      title: 'Banking & Financial Services',
      description: 'Strengthen fraud prevention, automate decision-making, improve compliance, and deliver more responsive customer service through secure AI-powered intelligence.',
    },
    {
      title: 'Healthcare & Life Sciences',
      description: 'Support diagnostics, streamline care delivery, improve operational efficiency, and accelerate research through predictive analytics and intelligent automation.',
    },
    {
      title: 'Hi-Tech Services',
      description: 'Accelerate software development, improve testing, reduce defects, and strengthen product performance through AI-enabled engineering and intelligent quality assurance.',
    },
    {
      title: 'Retail & Consumer Goods',
      description: 'Create personalised experiences, optimise demand and inventory, improve supply-chain decisions, and increase conversion through predictive and real-time AI.',
    },
    {
      title: 'Travel & Hospitality',
      description: 'Personalise customer journeys, forecast demand, automate operations, and improve service responsiveness across the travel lifecycle.',
    },
    {
      title: 'Livestock & AgriTech',
      description: 'Improve productivity, predict equipment and operational issues, optimise resources, and strengthen decision-making through real-time data and intelligent automation.',
    },
  ],
  differentiators: [
    {
      title: 'Business Outcomes Before Technology',
      description: 'We begin with the problem, not the platform. Every AI initiative is connected to a measurable objective such as reducing cost, increasing speed, improving quality, strengthening compliance, or creating new revenue.',
    },
    {
      title: 'AI Designed Around Your Organisation',
      description: 'Our solutions are shaped around your industry, data, operating model, and existing workflows. This ensures the technology is relevant, secure, adoptable, and capable of creating sustained value.',
    },
    {
      title: 'Accessible, Multidisciplinary Expertise',
      description: 'Work directly with engineers, data scientists, architects, designers, and AI strategists who can translate complex technology into clear business decisions and practical delivery plans.',
    },
    {
      title: 'Responsible by Design',
      description: 'Security, transparency, fairness, privacy, and regulatory alignment are integrated from the beginning. We help clients innovate quickly without weakening trust or governance.',
    },
  ],
  faqs: [
    {
      question: 'Can you develop a custom AI solution for our data and business objectives?',
      answer: 'Yes. We design AI solutions around your specific business priorities, proprietary data, and operating workflows. We begin by identifying high-value use cases and validating technical feasibility through focused discovery and prototyping. Feedback from users and stakeholders is incorporated early so that the final solution is useful, relevant, and positioned for adoption.\n\nSuccess measures are agreed from the outset, helping ensure that investment in AI remains connected to measurable business outcomes.',
    },
    {
      question: 'How do you decide between fine-tuning an existing model and creating a more customised solution?',
      answer: 'We assess business requirements, data sensitivity, performance expectations, integration complexity, security, and budget. Depending on the use case, we may fine-tune a leading proprietary model through an API or private-cloud environment, or customise a smaller open-source model that can be hosted within the client’s own infrastructure.\n\nWhere appropriate, we use retrieval-augmented generation to provide secure, context-aware access to enterprise information without training a model from the beginning. The selected approach balances performance, control, privacy, scalability, and cost.',
    },
    {
      question: 'How do you integrate AI securely with existing systems and workflows?',
      answer: 'Our engineers design modular, secure integrations with enterprise platforms such as CRM, ERP, APIs, data lakes, databases, and operational applications. Solutions can be deployed in the cloud, on premises, or in hybrid environments.\n\nAccess controls, encrypted communication, secure pipelines, logging, and compliance requirements are defined as part of the architecture. We also design for interoperability so the solution can evolve as systems, data sources, and business needs change.',
    },
    {
      question: 'How do you ensure AI solutions remain scalable and maintainable?',
      answer: 'We use modular, loosely coupled architectures that allow models and system components to be updated, replaced, or scaled independently. CI/CD, microservices, automated testing, version control, and MLOps support reliable deployment and ongoing improvement.\n\nComprehensive documentation and governance reduce technical debt and ensure the solution remains adaptable as requirements and AI technologies evolve.',
    },
    {
      question: 'How do you monitor deployed AI models and manage performance degradation?',
      answer: 'Our monitoring frameworks track technical performance, business KPIs, anomalies, data quality, and output consistency. For higher-risk applications, we can add independent model evaluation and human review to detect issues before they affect business outcomes.\n\nVersion control, retraining pipelines, alerting, and structured review processes help address model drift, concept drift, declining accuracy, and changing regulatory requirements.',
    },
  ],
};
