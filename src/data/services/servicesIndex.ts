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

export const getServiceBySlug = (
  slug: string
): ServicePageData | undefined => {
  const normalizedSlug = slug.startsWith('/services/')
    ? slug
    : `/services/${slug}`;

  return allServicesData.find(
    (service) =>
      service.slug === normalizedSlug ||
      service.id === slug.replace('/services/', '')
  );
};