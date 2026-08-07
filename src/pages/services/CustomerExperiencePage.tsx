import React from 'react';
import { ServicePageTemplate } from '../../components/services/ServicePageTemplate';
import { customerExperienceData } from '../../data/services/customerExperience';

export const CustomerExperiencePage: React.FC = () => {
  return <ServicePageTemplate data={customerExperienceData} serviceCategoryName="Customer Experience" />;
};
