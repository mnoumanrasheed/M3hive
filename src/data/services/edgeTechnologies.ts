import { ServicePageData } from '../../types/content';

export const edgeTechnologiesData: ServicePageData = {
  id: 'edge-technologies',
  slug: '/services/edge-technologies',
  title: 'Edge Technologies',
  subtitle: 'Create Immersive, Connected Experiences Beyond the Screen',
  heroCta: {
    label: 'Talk to Our Edge Technology Experts',
    href: '/contact',
    enabled: true,
  },
  offerings: [
    {
      id: 'extended-reality',
      title: 'Extended Reality: AR, MR, and VR',
      description: 'Create augmented, mixed, and virtual-reality experiences that combine physical and digital environments to improve engagement, visualisation, training, and decision-making.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/edge-technologies/extended-reality',
    },
    {
      id: 'media-content-creation',
      title: 'Media and Content Creation',
      description: 'Blend digital artistry with engineering to develop interactive content, 3D models, animation, simulations, and immersive media across multiple platforms.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/edge-technologies/media-and-content-creation',
    },
    {
      id: 'gaming-simulation',
      title: 'Gaming and Simulation',
      description: 'Build games and realistic simulations for entertainment, education, professional training, operational planning, and customer engagement.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/edge-technologies/gaming-and-simulation',
    },
    {
      id: 'iot-embedded-systems',
      title: 'IoT and Embedded Systems',
      description: 'Connect devices, sensors, applications, and data to create intelligent ecosystems that improve visibility, automation, and operational efficiency.',
      ctaLabel: 'Explore Details',
      ctaHref: '/services/edge-technologies/iot-embedded-systems',
    },
  ],
  successStories: [
    'Engineering One of the World’s Largest Food-Delivery Platforms',
    'Optimising and Future-Proofing Payment Infrastructure for Betsson',
    'Transforming Santander’s Mortgage-Transfer Process',
    'Smart Shipping: AI-Driven CO₂ Reduction for Stena Line',
    'Enabling Digital Transformation for Denmark’s Largest Retail Group',
  ],
};
