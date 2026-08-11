export interface DataAnalyticsDetail {
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

export const dataAnalyticsDetails: DataAnalyticsDetail[] = [
  {
    slug: 'data-science',
    title: 'Data Science',
    eyebrow: 'Data & Analytics',
    intro: 'Turn complex data into predictive insights and practical business decisions.',
    overview: 'Data Science combines statistical analysis, machine learning and domain expertise to uncover patterns, predict outcomes and support better business decisions.',
    capabilities: [
      {
        title: 'Data Exploration',
        description: 'Identify trends, patterns and relationships across complex datasets.',
      },
      {
        title: 'Predictive Analytics',
        description: 'Use historical data to forecast future outcomes.',
      },
      {
        title: 'Machine Learning Models',
        description: 'Build models for prediction, classification and optimisation.',
      },
      {
        title: 'Customer Analytics',
        description: 'Understand behaviour, segmentation and engagement.',
      },
      {
        title: 'Forecasting',
        description: 'Improve demand, performance and operational planning.',
      },
      {
        title: 'Model Evaluation',
        description: 'Validate and continuously improve analytical models.',
      },
    ],
    businessValue: [
      {
        title: 'Better Decision-Making',
        description: 'Make informed choices based on data-driven insights.',
      },
      {
        title: 'Improved Forecasting',
        description: 'Predict future trends and outcomes more accurately.',
      },
      {
        title: 'Greater Customer Insight',
        description: 'Understand customer behaviour and preferences deeply.',
      },
      {
        title: 'New Opportunity Identification',
        description: 'Discover untapped opportunities and revenue streams.',
      },
      {
        title: 'Reduced Uncertainty',
        description: 'Minimise risk through evidence-based predictions.',
      },
    ],
    heroImage: '/assets/heroes/hero-data-analytics.jpg',
  },
  {
    slug: 'modern-data-technology',
    title: 'Modern Data Tech',
    eyebrow: 'Data & Analytics',
    intro: 'Build a scalable, reliable data foundation that makes information accessible across the organisation.',
    overview: 'Modern Data Tech transforms fragmented and legacy data environments into flexible platforms that collect, integrate, govern and deliver trusted data efficiently.',
    capabilities: [
      {
        title: 'Data Platform Modernisation',
        description: 'Upgrade legacy data environments.',
      },
      {
        title: 'Data Integration',
        description: 'Connect data across applications, databases and cloud platforms.',
      },
      {
        title: 'Data Pipelines',
        description: 'Build reliable automated data flows.',
      },
      {
        title: 'Cloud Data Platforms',
        description: 'Design scalable modern data environments.',
      },
      {
        title: 'Data Governance',
        description: 'Improve ownership, quality, security and control.',
      },
      {
        title: 'Data Architecture',
        description: 'Create foundations for analytics, AI and future growth.',
      },
    ],
    businessValue: [
      {
        title: 'Trusted Data',
        description: 'Ensure data quality and reliability across the organisation.',
      },
      {
        title: 'Faster Access to Information',
        description: 'Reduce time to access and use critical business data.',
      },
      {
        title: 'Reduced Data Silos',
        description: 'Break down barriers between disconnected data sources.',
      },
      {
        title: 'Better Scalability',
        description: 'Handle growing data volumes efficiently.',
      },
      {
        title: 'Stronger Analytics and AI Foundation',
        description: 'Create the platform needed for advanced analytics and AI.',
      },
    ],
    heroImage: '/assets/heroes/hero-data-analytics.jpg',
  },
  {
    slug: 'business-intelligence',
    title: 'Business Intelligence',
    eyebrow: 'Data & Analytics',
    intro: 'Transform operational data into clear, timely insights that support confident decisions.',
    overview: 'Business Intelligence combines trusted data, dashboards and reporting to give teams a clear view of performance and enable faster, evidence-based decisions.',
    capabilities: [
      {
        title: 'BI Strategy',
        description: 'Define reporting priorities and KPIs.',
      },
      {
        title: 'Dashboard Development',
        description: 'Build intuitive business dashboards.',
      },
      {
        title: 'Data Visualisation',
        description: 'Present complex information clearly.',
      },
      {
        title: 'KPI & Performance Reporting',
        description: 'Track critical business measures.',
      },
      {
        title: 'Self-Service Analytics',
        description: 'Enable teams to explore trusted data independently.',
      },
      {
        title: 'Reporting Automation',
        description: 'Reduce repetitive manual reporting.',
      },
    ],
    businessValue: [
      {
        title: 'Faster Decisions',
        description: 'Accelerate decision-making with timely information.',
      },
      {
        title: 'Better Visibility',
        description: 'Gain clear insight into business performance.',
      },
      {
        title: 'Consistent Metrics',
        description: 'Ensure everyone uses the same definitions and measurements.',
      },
      {
        title: 'Reduced Manual Reporting',
        description: 'Automate repetitive reporting tasks.',
      },
      {
        title: 'Improved Organisational Alignment',
        description: 'Create shared understanding across teams.',
      },
    ],
    heroImage: '/assets/heroes/hero-data-analytics.jpg',
  },
  {
    slug: 'big-data-platforms',
    title: 'Big Data Platforms',
    eyebrow: 'Data & Analytics',
    intro: 'Create reliable data pipelines and platforms capable of handling growing data volume, complexity and speed.',
    overview: 'Data Engineering provides the infrastructure required to collect, transform and deliver reliable data for analytics, applications and AI.',
    capabilities: [
      {
        title: 'Data Pipeline Engineering',
        description: 'Build robust, automated pipelines for data movement and transformation.',
      },
      {
        title: 'ETL / ELT Development',
        description: 'Extract, transform and load data efficiently at scale.',
      },
      {
        title: 'Data Warehousing',
        description: 'Design centralised repositories for analytical workloads.',
      },
      {
        title: 'Data Lake Architecture',
        description: 'Store and process diverse data types at scale.',
      },
      {
        title: 'Real-Time Processing',
        description: 'Enable streaming data for immediate insight and action.',
      },
      {
        title: 'Data Quality & Reliability',
        description: 'Ensure consistent, accurate and available data.',
      },
    ],
    businessValue: [
      {
        title: 'Reliable Data Availability',
        description: 'Ensure data is consistently available when needed.',
      },
      {
        title: 'Scalable Processing',
        description: 'Handle increasing data volumes without performance degradation.',
      },
      {
        title: 'Faster Analytics',
        description: 'Accelerate time to insight through efficient data processing.',
      },
      {
        title: 'Better Data Quality',
        description: 'Improve accuracy and consistency of enterprise data.',
      },
      {
        title: 'Stronger AI/Data Foundation',
        description: 'Create the infrastructure needed for advanced AI and analytics.',
      },
    ],
    heroImage: '/assets/heroes/hero-data-analytics.jpg',
  },
];
