import React from 'react';
import { ServicePageTemplate } from '../../components/services/ServicePageTemplate';
import { productEngineeringData } from '../../data/services/productEngineering';

export const ProductEngineeringPage: React.FC = () => {
  return <ServicePageTemplate data={productEngineeringData} serviceCategoryName="Product Engineering" />;
};
