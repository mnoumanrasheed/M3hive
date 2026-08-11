export interface CloudPlatformsDetail {
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

export const cloudPlatformsDetails: CloudPlatformsDetail[] = [
  {
    slug: 'cloud-engineering',
    title: 'Cloud Engineering',
    eyebrow: 'Cloud Platforms',
    intro: 'Build secure, scalable and resilient cloud environments designed around your business and technology needs.',
    overview: 'Cloud Engineering helps organisations design, build and operate modern cloud platforms that improve scalability, reliability and delivery speed while maintaining appropriate security and governance.',
    capabilities: [
      {
        title: 'Cloud Architecture',
        description: 'Design scalable and resilient cloud environments.',
      },
      {
        title: 'Cloud Migration',
        description: 'Move applications and workloads to modern cloud platforms.',
      },
      {
        title: 'Infrastructure as Code',
        description: 'Automate infrastructure provisioning and configuration.',
      },
      {
        title: 'Cloud-Native Engineering',
        description: 'Build applications using modern cloud patterns and services.',
      },
      {
        title: 'Platform Automation',
        description: 'Reduce manual infrastructure and operational effort.',
      },
      {
        title: 'Cloud Governance',
        description: 'Apply security, standards, access controls and operational policies.',
      },
    ],
    businessValue: [
      {
        title: 'Greater Scalability',
        description: 'Scale infrastructure efficiently to meet changing business demands.',
      },
      {
        title: 'Faster Delivery',
        description: 'Accelerate application deployment and feature releases.',
      },
      {
        title: 'Improved Reliability',
        description: 'Build resilient systems that maintain high availability.',
      },
      {
        title: 'Reduced Infrastructure Complexity',
        description: 'Simplify infrastructure management through modern cloud patterns.',
      },
      {
        title: 'Stronger Governance',
        description: 'Maintain security, compliance and operational controls at scale.',
      },
    ],
    heroImage: '/assets/heroes/hero-cloud-platforms.jpg',
  },
  {
    slug: 'salesforce',
    title: 'Salesforce',
    eyebrow: 'Cloud Platforms',
    intro: 'Create connected customer experiences with a scalable Salesforce platform aligned to your business processes and growth goals.',
    overview: 'Salesforce helps organisations unify customer data, automate workflows and improve engagement across sales, service and other business functions. A well-designed Salesforce environment should reflect the organisation\'s real processes, reduce unnecessary manual work and provide teams with a consistent view of customer interactions.',
    capabilities: [
      {
        title: 'Salesforce Strategy',
        description: 'Define the right Salesforce architecture, operating model and implementation roadmap.',
      },
      {
        title: 'Sales Cloud',
        description: 'Improve lead, opportunity and pipeline management through structured sales workflows.',
      },
      {
        title: 'Service Cloud',
        description: 'Enable more consistent customer support through case management, automation and service workflows.',
      },
      {
        title: 'Salesforce Integration',
        description: 'Connect Salesforce with enterprise applications, APIs and data platforms.',
      },
      {
        title: 'Workflow Automation',
        description: 'Automate repetitive processes, approvals and customer-facing workflows.',
      },
      {
        title: 'Salesforce Optimisation',
        description: 'Improve adoption, performance, data quality and platform efficiency over time.',
      },
    ],
    businessValue: [
      {
        title: 'Unified Customer View',
        description: 'Bring relevant customer information into a more consistent platform experience.',
      },
      {
        title: 'Improved Sales Productivity',
        description: 'Reduce administrative effort and support more efficient sales processes.',
      },
      {
        title: 'Better Customer Service',
        description: 'Give service teams clearer information and structured workflows.',
      },
      {
        title: 'Greater Automation',
        description: 'Reduce repetitive manual tasks across customer-facing processes.',
      },
      {
        title: 'Scalable CRM Foundation',
        description: 'Create a platform that can evolve with changing business requirements.',
      },
    ],
    heroImage: '/assets/heroes/hero-cloud-platforms.jpg',
  },
  {
    slug: 'devops',
    title: 'DevOps',
    eyebrow: 'Cloud Platforms',
    intro: 'Accelerate software delivery through automation, collaboration and reliable engineering pipelines.',
    overview: 'DevOps connects development and operations through automation, continuous integration, continuous delivery and shared engineering practices, enabling teams to release software faster and more reliably.',
    capabilities: [
      {
        title: 'CI/CD Pipelines',
        description: 'Automate build, testing and deployment workflows.',
      },
      {
        title: 'Release Automation',
        description: 'Improve speed and consistency of software releases.',
      },
      {
        title: 'Infrastructure Automation',
        description: 'Provision and manage environments automatically.',
      },
      {
        title: 'Observability',
        description: 'Monitor application and infrastructure health.',
      },
      {
        title: 'DevSecOps',
        description: 'Integrate security into development and delivery pipelines.',
      },
      {
        title: 'Engineering Enablement',
        description: 'Give teams reusable tools and platforms for efficient delivery.',
      },
    ],
    businessValue: [
      {
        title: 'Faster Releases',
        description: 'Deploy software more frequently with greater confidence.',
      },
      {
        title: 'Reduced Deployment Risk',
        description: 'Minimize failures through automated testing and validation.',
      },
      {
        title: 'Improved Engineering Productivity',
        description: 'Free developers from manual deployment and infrastructure tasks.',
      },
      {
        title: 'Greater Operational Reliability',
        description: 'Maintain stable systems through continuous monitoring and automation.',
      },
      {
        title: 'Better Collaboration',
        description: 'Break down silos between development and operations teams.',
      },
    ],
    heroImage: '/assets/heroes/hero-cloud-platforms.jpg',
  },
];
