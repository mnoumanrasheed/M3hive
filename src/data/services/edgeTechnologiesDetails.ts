export interface EdgeTechnologiesDetail {
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

export const edgeTechnologiesDetails: EdgeTechnologiesDetail[] = [
  {
    slug: 'extended-reality',
    title: 'Extended Reality: AR, MR, and VR',
    eyebrow: 'Edge Technologies',
    intro: 'Create immersive experiences that blend physical and digital worlds for better engagement, training and visualisation.',
    overview: 'Extended Reality technologies including Augmented Reality (AR), Mixed Reality (MR) and Virtual Reality (VR) enable organisations to create immersive experiences that enhance how people interact with information, products and environments.',
    capabilities: [
      {
        title: 'AR Application Development',
        description: 'Build augmented reality experiences that overlay digital information onto the physical world.',
      },
      {
        title: 'VR Experience Design',
        description: 'Create fully immersive virtual environments for training, engagement and exploration.',
      },
      {
        title: 'Mixed Reality Solutions',
        description: 'Develop applications that seamlessly blend physical and digital elements.',
      },
      {
        title: 'Spatial Computing',
        description: 'Enable natural interaction with digital content in three-dimensional space.',
      },
      {
        title: 'Immersive Training',
        description: 'Create realistic training environments for skills development and scenario practice.',
      },
      {
        title: 'XR Content Creation',
        description: 'Produce 3D models, environments and interactive content for extended reality platforms.',
      },
    ],
    businessValue: [
      {
        title: 'Enhanced Engagement',
        description: 'Create memorable experiences that capture and hold attention.',
      },
      {
        title: 'Better Visualisation',
        description: 'Help users understand complex concepts through immersive 3D representation.',
      },
      {
        title: 'Effective Training',
        description: 'Provide realistic practice environments without real-world risks or costs.',
      },
      {
        title: 'Improved Decision-Making',
        description: 'Enable better spatial understanding and scenario planning.',
      },
      {
        title: 'Competitive Differentiation',
        description: 'Stand out through innovative customer and employee experiences.',
      },
    ],
    heroImage: '/assets/heroes/hero-edge-technologies.jpg',
  },
  {
    slug: 'media-and-content-creation',
    title: 'Media and Content Creation',
    eyebrow: 'Edge Technologies',
    intro: 'Combine digital artistry with technical expertise to create compelling interactive content and immersive media.',
    overview: 'Media and Content Creation brings together creative talent and technical capabilities to develop engaging digital experiences, from interactive 3D content to cinematic animations and immersive simulations.',
    capabilities: [
      {
        title: '3D Modeling & Animation',
        description: 'Create detailed three-dimensional assets and dynamic animations for various platforms.',
      },
      {
        title: 'Interactive Content Development',
        description: 'Build engaging experiences that respond to user interaction and input.',
      },
      {
        title: 'Real-Time Rendering',
        description: 'Deliver high-quality visual experiences with immediate responsiveness.',
      },
      {
        title: 'Motion Graphics',
        description: 'Design and animate visual elements for dynamic storytelling.',
      },
      {
        title: 'Audio Production',
        description: 'Integrate immersive sound design and spatial audio experiences.',
      },
      {
        title: 'Cross-Platform Delivery',
        description: 'Optimise content for web, mobile, VR and other distribution channels.',
      },
    ],
    businessValue: [
      {
        title: 'Engaging Experiences',
        description: 'Capture attention through visually compelling and interactive content.',
      },
      {
        title: 'Brand Differentiation',
        description: 'Stand out with premium, professional-quality digital media.',
      },
      {
        title: 'Better Communication',
        description: 'Convey complex ideas through visual storytelling and interaction.',
      },
      {
        title: 'Versatile Content',
        description: 'Deploy assets across multiple platforms and use cases.',
      },
      {
        title: 'Faster Production',
        description: 'Leverage reusable assets and streamlined workflows.',
      },
    ],
    heroImage: '/assets/heroes/hero-edge-technologies.jpg',
  },
  {
    slug: 'gaming-and-simulation',
    title: 'Gaming and Simulation',
    eyebrow: 'Edge Technologies',
    intro: 'Build interactive games and realistic simulations for entertainment, training and operational planning.',
    overview: 'Gaming and Simulation technologies create engaging interactive experiences that serve entertainment, education, professional training and business planning needs through realistic virtual environments and game mechanics.',
    capabilities: [
      {
        title: 'Game Development',
        description: 'Build engaging games for entertainment, education and brand engagement.',
      },
      {
        title: 'Simulation Engineering',
        description: 'Create realistic simulations for training, planning and decision support.',
      },
      {
        title: 'Gameplay Mechanics',
        description: 'Design intuitive controls, physics and interaction systems.',
      },
      {
        title: 'Multiplayer Systems',
        description: 'Enable collaborative and competitive multi-user experiences.',
      },
      {
        title: 'Performance Optimisation',
        description: 'Ensure smooth, responsive experiences across target platforms.',
      },
      {
        title: 'Analytics Integration',
        description: 'Track engagement, progression and performance metrics.',
      },
    ],
    businessValue: [
      {
        title: 'Effective Training',
        description: 'Provide hands-on practice in safe, controlled environments.',
      },
      {
        title: 'Higher Engagement',
        description: 'Maintain interest through interactive and rewarding experiences.',
      },
      {
        title: 'Better Preparation',
        description: 'Enable scenario planning and operational rehearsal.',
      },
      {
        title: 'Skills Development',
        description: 'Build competencies through progressive learning experiences.',
      },
      {
        title: 'Measurable Outcomes',
        description: 'Track performance and progression through built-in analytics.',
      },
    ],
    heroImage: '/assets/heroes/hero-edge-technologies.jpg',
  },
  {
    slug: 'iot-embedded-systems',
    title: 'IoT and Embedded Systems',
    eyebrow: 'Edge Technologies',
    intro: 'Connect devices, data and applications to create smarter, more responsive operations.',
    overview: 'IoT solutions connect physical devices and sensors with digital platforms, enabling organisations to monitor environments, automate processes and gain real-time operational insight.',
    capabilities: [
      {
        title: 'IoT Solution Architecture',
        description: 'Design connected ecosystems that integrate devices, platforms and applications.',
      },
      {
        title: 'Device & Sensor Integration',
        description: 'Connect physical devices and sensors with digital systems.',
      },
      {
        title: 'Real-Time Data Collection',
        description: 'Capture and transmit operational data continuously.',
      },
      {
        title: 'Remote Monitoring',
        description: 'Track device performance and environmental conditions from anywhere.',
      },
      {
        title: 'IoT Platform Integration',
        description: 'Connect IoT devices with enterprise applications and cloud platforms.',
      },
      {
        title: 'Device Security & Management',
        description: 'Secure and manage distributed IoT devices at scale.',
      },
    ],
    businessValue: [
      {
        title: 'Real-Time Visibility',
        description: 'Monitor operations and environments continuously.',
      },
      {
        title: 'Better Operational Control',
        description: 'Respond quickly to changing conditions and events.',
      },
      {
        title: 'Predictive Insights',
        description: 'Anticipate issues before they impact operations.',
      },
      {
        title: 'Reduced Manual Monitoring',
        description: 'Automate data collection and alerting processes.',
      },
      {
        title: 'New Connected Services',
        description: 'Create new business models through connected products.',
      },
    ],
    heroImage: '/assets/heroes/hero-edge-technologies.jpg',
  },
];
