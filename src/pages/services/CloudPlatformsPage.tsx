import React from 'react';
import { ServicePageTemplate } from '../../components/services/ServicePageTemplate';
import { cloudPlatformsData } from '../../data/services/cloudPlatforms';

export const CloudPlatformsPage: React.FC = () => {
  return <ServicePageTemplate data={cloudPlatformsData} serviceCategoryName="Cloud Platforms" />;
};
