import React from 'react';
import { ServicePageTemplate } from '../../components/services/ServicePageTemplate';
import { intelligentAutomationData } from '../../data/services/intelligentAutomation';

export const IntelligentAutomationPage: React.FC = () => {
  return <ServicePageTemplate data={intelligentAutomationData} serviceCategoryName="Intelligent Automation" />;
};
