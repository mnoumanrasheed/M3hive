import React from 'react';
import { ServicePageTemplate } from '../../components/services/ServicePageTemplate';
import { edgeTechnologiesData } from '../../data/services/edgeTechnologies';

export const EdgeTechnologiesPage: React.FC = () => {
  return <ServicePageTemplate data={edgeTechnologiesData} serviceCategoryName="Edge Technologies" />;
};
