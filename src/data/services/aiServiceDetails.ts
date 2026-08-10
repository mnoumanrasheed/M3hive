export interface AIServiceDetail {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  overview: string;
  capabilities: {
    title: string;
    description?: string;
  }[];
  businessValue: {
    title: string;
    description: string;
  }[];
  whyM3Hive?: {
    title: string;
    description: string;
  }[];
  heroImage: string;
}

export const aiServiceDetails: AIServiceDetail[] = [
  {
    slug: 'ai-enabled-engineering',
    title: 'AI-Enabled Engineering',
    eyebrow: 'Artificial Intelligence',
    intro: 'Embed intelligence throughout the software-development lifecycle to accelerate delivery, reduce rework, improve code quality, and strengthen engineering consistency.',
    overview: 'Our AI-enabled workflows help teams develop faster without compromising security, governance, or technical standards. We integrate intelligent assistants and automated tools directly into your engineering practices.',
    capabilities: [
      {
        title: 'Speed Up Onboarding with Context-Aware Insights',
        description: 'New engineers and stakeholders often face delays ramping up due to scattered documentation and lack of contextual understanding. We deploy intelligent AI assistants that transform technical documents, specifications, and internal resources into an interactive, searchable knowledge layer. Designed with guardrails to ensure responses stay grounded in verified documentation and avoid misinterpretations.',
      },
      { title: 'Align Documentation, Backlog, & Code from Day One', description: 'Automatically map business requirements to code implementations, ensuring full traceability and reducing the risk of misalignment as projects scale.' },
      { title: 'Modernize Documentation with Intelligent Workflows', description: 'Keep technical documentation up to date automatically as code changes, reducing the burden on engineering teams and ensuring accuracy.' },
      { title: 'Automate Backlog Refinement & Task Structuring', description: 'Leverage AI to analyze complex epics and break them down into actionable, well-structured stories with clear acceptance criteria.' },
      { title: 'Built for Enterprise Grade Security & Privacy', description: 'Deploy AI tools within secure environments that respect data privacy regulations and corporate IP protection standards.' },
      { title: 'Navigate Complex Codebases with LLM Driven Intelligence', description: 'Enable developers to quickly understand legacy systems or unfamiliar code architectures through natural language queries and AI-guided exploration.' },
    ],
    businessValue: [
      { title: 'Faster Delivery', description: 'Accelerate the software development lifecycle with intelligent code generation and review.' },
      { title: 'Improved Quality', description: 'Reduce bugs and technical debt through continuous AI-driven code analysis.' },
      { title: 'Reduced Manual Effort', description: 'Automate repetitive tasks like documentation updates and backlog refinement.' },
      { title: 'Better Developer Experience', description: 'Empower engineers with context-aware tools that reduce friction and cognitive load.' }
    ],
    heroImage: '/assets/heroes/hero-services.jpg', 
  },
  {
    slug: 'agentic-ai',
    title: 'Agentic AI',
    eyebrow: 'Artificial Intelligence',
    intro: 'Design intelligent agents that can reason, plan, take action, and adapt to changing conditions.',
    overview: 'By combining context, decision-making, and workflow integration, agentic AI enables proactive automation across complex business processes.',
    capabilities: [
      { title: 'Autonomous reasoning', description: 'Enable systems to independently analyze situations, form logical conclusions, and determine the optimal sequence of actions.' },
      { title: 'Context-aware decision making', description: 'Agents leverage real-time data and historical context to make informed decisions that align with complex business rules.' },
      { title: 'Workflow integration', description: 'Seamlessly connect autonomous agents with your existing enterprise systems, databases, and APIs for end-to-end execution.' },
      { title: 'Agentic Process Automation', description: 'Move beyond traditional RPA by deploying agents that can handle unstructured data and adapt to workflow exceptions dynamically.' },
      { title: 'CRM / ERP integration', description: 'Directly interface with core business platforms to execute updates, retrieve context, and trigger downstream processes.' },
      { title: 'Enterprise security', description: 'Ensure agent actions are governed by strict access controls, audit logging, and human-in-the-loop oversight where required.' },
      { title: 'POC within 5 weeks', description: 'Rapidly design, build, and validate agentic use cases to demonstrate tangible business value in a matter of weeks.' },
    ],
    businessValue: [
      { title: 'Proactive Operations', description: 'Move from reactive to proactive problem solving with autonomous agents.' },
      { title: 'Process Efficiency', description: 'Automate complex, multi-step processes across different business systems.' },
      { title: 'Scalability', description: 'Scale operations without a proportional increase in manual overhead.' }
    ],
    whyM3Hive: [
      { title: 'Guaranteed Success', description: 'Measured by NPS and tangible business outcomes.' },
      { title: 'Rapid Delivery', description: 'POC within 5 Weeks to prove value quickly.' },
      { title: 'Agents That Speak Your Industry', description: 'Tailored context and reasoning for your specific domain.' },
      { title: 'Pioneering AI', description: 'Pioneering AI for a changing business environment.' },
    ],
    heroImage: '/assets/heroes/hero-services.jpg',
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    eyebrow: 'Artificial Intelligence',
    intro: 'Use generative AI to create content, personalise experiences, accelerate knowledge work, support decision-making, and reduce repetitive effort.',
    overview: 'We design solutions that integrate securely with your data and workflows to create practical and scalable business value.',
    capabilities: [
      { title: 'Content generation', description: 'Automatically produce high-quality text, images, and code tailored to your specific brand voice and requirements.' },
      { title: 'Knowledge work', description: 'Accelerate research, analysis, and synthesis of large volumes of unstructured data to empower decision-makers.' },
      { title: 'Personalised experiences', description: 'Dynamically generate customized interactions, recommendations, and communications for individual users at scale.' },
      { title: 'Coding assistance', description: 'Boost developer productivity with intelligent autocomplete, code generation, and automated refactoring tools.' },
      { title: 'Customer service', description: 'Deploy advanced generative models to handle complex customer inquiries with natural, context-aware responses.' },
      { title: 'Marketing content', description: 'Streamline the creation of marketing copy, campaign assets, and personalized outreach materials.' },
      { title: 'Research and summarisation', description: 'Quickly distill lengthy documents, reports, and meeting transcripts into concise, actionable summaries.' },
    ],
    businessValue: [
      { title: 'Enhanced Creativity', description: 'Augment human creativity with rapid iteration and content generation.' },
      { title: 'Personalisation at Scale', description: 'Deliver highly tailored experiences to customers without manual effort.' },
      { title: 'Knowledge Accessibility', description: 'Make enterprise knowledge easily discoverable and actionable.' }
    ],
    heroImage: '/assets/heroes/hero-services.jpg',
  },
  {
    slug: 'conversational-ai',
    title: 'Conversational AI',
    eyebrow: 'Artificial Intelligence',
    intro: 'Transform customer and employee interactions through intelligent virtual assistants and conversational solutions.',
    overview: 'Our platforms improve responsiveness, reduce service costs, support round-the-clock availability, and integrate directly with existing business systems.',
    capabilities: [
      { title: 'Virtual assistants', description: 'Deploy intelligent bots capable of handling complex, multi-turn conversations with natural language understanding.' },
      { title: 'Customer support', description: 'Automate tier-1 support inquiries, triage complex issues, and seamlessly hand off to human agents when necessary.' },
      { title: 'Employee support', description: 'Streamline internal IT, HR, and operational queries with accessible, 24/7 conversational interfaces.' },
      { title: 'Appointment scheduling', description: 'Enable users to seamlessly book, modify, and cancel appointments through natural dialogue.' },
      { title: 'Omnichannel interactions', description: 'Deliver a consistent conversational experience across web, mobile, SMS, and messaging platforms.' },
      { title: 'Data collection', description: 'Gather user information, feedback, and context dynamically through engaging, conversational flows.' },
    ],
    businessValue: [
      { title: 'Better Customer Experience', description: 'Provide instant, accurate, and helpful responses 24/7.' },
      { title: 'Reduced Service Costs', description: 'Automate high-volume, repetitive inquiries to free up human agents.' },
      { title: 'Improved Employee Support', description: 'Streamline internal IT and HR support with conversational interfaces.' }
    ],
    heroImage: '/assets/heroes/hero-services.jpg',
  },
  {
    slug: 'mlops',
    title: 'MLOps',
    eyebrow: 'Artificial Intelligence',
    intro: 'Move AI models into production faster and operate them reliably at scale.',
    overview: 'Our MLOps frameworks support deployment, monitoring, versioning, retraining, governance, and continuous performance improvement.',
    capabilities: [
      { title: 'Model deployment', description: 'Streamline the transition of machine learning models from development to scalable production environments.' },
      { title: 'Monitoring', description: 'Continuously track model performance, data drift, and operational metrics to ensure sustained accuracy.' },
      { title: 'Versioning', description: 'Maintain strict version control for models, datasets, and pipelines to ensure reproducibility and traceability.' },
      { title: 'Retraining', description: 'Automate model retraining pipelines to quickly adapt to new data and changing business conditions.' },
      { title: 'Governance', description: 'Implement robust access controls, audit trails, and compliance checks across the ML lifecycle.' },
      { title: 'Production readiness', description: 'Ensure models are optimized for latency, throughput, and reliability before facing live traffic.' },
      { title: 'Continuous performance improvement', description: 'Establish feedback loops that automatically capture outcomes and inform ongoing model enhancements.' },
    ],
    businessValue: [
      { title: 'Production Reliability', description: 'Ensure models run consistently and reliably in production environments.' },
      { title: 'Faster Time-to-Market', description: 'Streamline the path from model development to deployment.' },
      { title: 'Governance and Security', description: 'Maintain strict control and auditability over AI assets.' }
    ],
    whyM3Hive: [
      { title: 'Proven MLOps Expertise Across ...', description: 'Our engineering heritage ensures your models are operationalized with rigor and scale.' }
    ],
    heroImage: '/assets/heroes/hero-services.jpg',
  },
  {
    slug: 'responsible-ai',
    title: 'Responsible AI',
    eyebrow: 'Artificial Intelligence',
    intro: 'Build AI systems that are transparent, explainable, secure, and aligned with regulatory expectations.',
    overview: 'We integrate responsible-AI principles into governance, data protection, model design, bias management, monitoring, and operational controls.',
    capabilities: [
      { title: 'Transparency', description: 'Ensure stakeholders understand how AI models are developed, the data they use, and their intended limitations.' },
      { title: 'Explainability', description: 'Implement techniques that make complex model decisions interpretable and understandable to human operators.' },
      { title: 'Fairness', description: 'Actively detect and mitigate algorithmic biases to ensure equitable outcomes across diverse user groups.' },
      { title: 'Data protection', description: 'Integrate robust privacy-enhancing technologies and data anonymization techniques into AI pipelines.' },
      { title: 'Bias management', description: 'Establish ongoing processes to monitor, measure, and correct systemic biases throughout the model lifecycle.' },
      { title: 'Model governance', description: 'Define clear policies, roles, and accountability structures for the development and deployment of AI.' },
      { title: 'Monitoring', description: 'Continuously track AI systems for ethical drift, unexpected behaviors, and compliance violations.' },
      { title: 'Human oversight', description: 'Design human-in-the-loop workflows to ensure critical AI decisions are validated by domain experts.' },
      { title: 'Regulatory alignment', description: 'Ensure AI initiatives comply with evolving global standards, industry regulations, and legal frameworks.' },
    ],
    businessValue: [
      { title: 'Risk Mitigation', description: 'Proactively identify and address potential biases and vulnerabilities.' },
      { title: 'Regulatory Compliance', description: 'Ensure AI systems meet evolving legal and industry standards.' },
      { title: 'Brand Trust', description: 'Build user and stakeholder confidence through transparent and fair AI.' }
    ],
    heroImage: '/assets/heroes/hero-services.jpg',
  }
];
