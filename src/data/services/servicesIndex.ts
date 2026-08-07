import { ServicePageData } from '../../types/content';
import { aiServicesData } from './aiServices';
import { productEngineeringData } from './productEngineering';
import { customerExperienceData } from './customerExperience';
import { intelligentAutomationData } from './intelligentAutomation';
import { dataAnalyticsData } from './dataAnalytics';
import { cloudPlatformsData } from './cloudPlatforms';
import { edgeTechnologiesData } from './edgeTechnologies';

export const allServicesData: ServicePageData[] = [
  aiServicesData,
  productEngineeringData,
  customerExperienceData,
  intelligentAutomationData,
  dataAnalyticsData,
  cloudPlatformsData,
  edgeTechnologiesData,
];

export const getServiceBySlug = (slug: string): ServicePageData | undefined => {
  return allServicesData.find(
    (s) => s.slug === slug || s.id === slug.replace('/services/', '')
  );
};
