import React from 'react';
import { ServicePageTemplate } from '../../components/services/ServicePageTemplate';
import { aiServicesData } from '../../data/services/aiServices';

export const AIServicesPage: React.FC = () => {
  return <ServicePageTemplate data={aiServicesData} serviceCategoryName="Artificial Intelligence" />;
};
