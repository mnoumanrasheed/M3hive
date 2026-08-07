import React from 'react';
import { ServicePageTemplate } from '../../components/services/ServicePageTemplate';
import { dataAnalyticsData } from '../../data/services/dataAnalytics';

export const DataAnalyticsPage: React.FC = () => {
  return <ServicePageTemplate data={dataAnalyticsData} serviceCategoryName="Data & Analytics" />;
};
