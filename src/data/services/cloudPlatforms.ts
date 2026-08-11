import { ServicePageData } from '../../types/content';

export const cloudPlatformsData: ServicePageData = {
  id: 'cloud-platforms',
  slug: '/services/cloud-platforms',
  title: 'Cloud Platforms',
  subtitle: 'Modernise, Migrate, and Operate the Cloud with Confidence',
  heroCta: {
    label: 'Talk to Our Cloud Experts',
    href: '/contact',
    enabled: true,
  },
  offerings: [
    {
      id: 'cloud-engineering',
      title: 'Cloud Engineering',
      description: 'Design, build, migrate, and optimise secure cloud platforms without the limitations of legacy infrastructure. Our engineers work as an extension of your team to simplify complexity and create measurable operational value.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/cloud-platforms/cloud-engineering',
    },
    {
      id: 'salesforce',
      title: 'Salesforce',
      description: 'Create a Salesforce environment that reflects how your organisation sells, markets, and supports customers. We centralise data, automate workflows, improve adoption, and configure the platform around real business processes.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/cloud-platforms/salesforce',
    },
    {
      id: 'devops',
      title: 'DevOps',
      description: 'Connect development and operations to accelerate releases, improve quality, and strengthen reliability. Automation, continuous delivery, observability, and infrastructure as code help organisations scale with confidence.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/cloud-platforms/devops',
    },
  ],
  deliveryApproach: [
    {
      stepNumber: '01',
      title: 'Assess Existing Workloads',
      description: 'We review the current environment to determine which workloads should be migrated, modernised, rehosted, retained, or retired.',
    },
    {
      stepNumber: '02',
      title: 'Design the Target Architecture',
      description: 'A detailed architecture blueprint defines the cloud environment, networking, security, identity, data, integration, and operational requirements.',
    },
    {
      stepNumber: '03',
      title: 'Execute the Migration',
      description: 'We migrate applications and data through a controlled delivery plan, optimise performance, manage risk, and support business continuity throughout the transition.',
    },
    {
      stepNumber: '04',
      title: 'Scale Cloud Operations',
      description: 'Automation, standardised platforms, governance, and operational practices enable cloud capabilities to expand across teams, workloads, and regions.',
    },
    {
      stepNumber: '05',
      title: 'Optimise Cost and Continuously Improve',
      description: 'We identify underused resources, establish policies and guardrails, improve forecasting, and continuously evolve the environment as business requirements change.',
    },
  ],
  industries: [
    {
      title: 'Banking & Financial Services',
      description: 'Build secure and scalable infrastructure for intelligent financial products while meeting demanding operational and regulatory requirements.',
    },
    {
      title: 'Retail & Consumer',
      description: 'Support personalised commerce, automated inventory, high-volume transactions, and frictionless checkout through resilient cloud platforms.',
    },
    {
      title: 'Healthcare & Life Sciences',
      description: 'Improve patient services and operational efficiency through secure, scalable, and compliant cloud environments.',
    },
    {
      title: 'Hi-Tech',
      description: 'Develop and scale AI-powered digital products on cloud platforms designed to evolve with changing markets and customer expectations.',
    },
    {
      title: 'Travel & Hospitality',
      description: 'Deliver responsive, personalised, and reliable travel experiences through scalable cloud infrastructure and connected services.',
    },
    {
      title: 'Livestock & AgriTech',
      description: 'Enable connected operations, real-time monitoring, data access, and digital decision-making through secure cloud platforms.',
    },
  ],
  differentiators: [
    {
      title: 'Certified Multi-Cloud Expertise',
      description: 'Our specialists bring hands-on capability across AWS, Microsoft Azure, and Google Cloud, combined with an understanding of wider business and operational objectives.',
    },
    {
      title: 'Solutions Designed Around Your Challenge',
      description: 'From legacy modernisation and application refactoring to pipeline automation and cloud migration, our recommendations are based on the specific problem and expected value.',
    },
    {
      title: 'Speed and Scalability',
      description: 'Automation, CI/CD, infrastructure as code, and modern DevOps practices help organisations launch faster and scale more reliably.',
    },
    {
      title: 'Cost-Conscious Value',
      description: 'Our approach improves the value of cloud investment by reducing avoidable expenditure without compromising performance, security, or resilience.',
    },
  ],
};
