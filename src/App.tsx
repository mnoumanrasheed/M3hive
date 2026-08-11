import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from './components/animation/ScrollToTop';

// Critical path: HomePage is loaded immediately
import { HomePage } from './pages/HomePage';

// Lazy loaded routes
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PartnersPage = React.lazy(() => import('./pages/PartnersPage').then(module => ({ default: module.PartnersPage })));
const OurApproachPage = React.lazy(() => import('./pages/OurApproachPage').then(module => ({ default: module.OurApproachPage })));
const OurApproachDetailPage = React.lazy(() => import('./pages/OurApproachDetailPage').then(module => ({ default: module.OurApproachDetailPage })));
const RiskCompliancePage = React.lazy(() => import('./pages/RiskCompliancePage').then(module => ({ default: module.RiskCompliancePage })));
const RiskPolicyDetailPage = React.lazy(() => import('./pages/risk-and-compliance/RiskPolicyDetailPage').then(module => ({ default: module.RiskPolicyDetailPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const ServicesIndexPage = React.lazy(() => import('./pages/services/ServicesIndexPage').then(module => ({ default: module.ServicesIndexPage })));
const AIServicesPage = React.lazy(() => import('./pages/services/AIServicesPage').then(module => ({ default: module.AIServicesPage })));
const AIServiceDetailPage = React.lazy(() => import('./pages/services/AIServiceDetailPage').then(module => ({ default: module.AIServiceDetailPage })));
const ProductEngineeringPage = React.lazy(() => import('./pages/services/ProductEngineeringPage').then(module => ({ default: module.ProductEngineeringPage })));
const ProductEngineeringDetailPage = React.lazy(() => import('./pages/services/ProductEngineeringDetailPage').then(module => ({ default: module.ProductEngineeringDetailPage })));
const CustomerExperiencePage = React.lazy(() => import('./pages/services/CustomerExperiencePage').then(module => ({ default: module.CustomerExperiencePage })));
const CustomerExperienceDetailPage = React.lazy(() => import('./pages/services/CustomerExperienceDetailPage').then(module => ({ default: module.CustomerExperienceDetailPage })));
const IntelligentAutomationPage = React.lazy(() => import('./pages/services/IntelligentAutomationPage').then(module => ({ default: module.IntelligentAutomationPage })));
const IntelligentAutomationDetailPage = React.lazy(() => import('./pages/services/IntelligentAutomationDetailPage').then(module => ({ default: module.IntelligentAutomationDetailPage })));
const DataAnalyticsPage = React.lazy(() => import('./pages/services/DataAnalyticsPage').then(module => ({ default: module.DataAnalyticsPage })));
const DataAnalyticsDetailPage = React.lazy(() => import('./pages/services/DataAnalyticsDetailPage').then(module => ({ default: module.DataAnalyticsDetailPage })));
const CloudPlatformsPage = React.lazy(() => import('./pages/services/CloudPlatformsPage').then(module => ({ default: module.CloudPlatformsPage })));
const CloudPlatformsDetailPage = React.lazy(() => import('./pages/services/CloudPlatformsDetailPage').then(module => ({ default: module.CloudPlatformsDetailPage })));
const EdgeTechnologiesPage = React.lazy(() => import('./pages/services/EdgeTechnologiesPage').then(module => ({ default: module.EdgeTechnologiesPage })));
const EdgeTechnologiesDetailPage = React.lazy(() => import('./pages/services/EdgeTechnologiesDetailPage').then(module => ({ default: module.EdgeTechnologiesDetailPage })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-hive-white">
    <div className="w-8 h-8 rounded-full border-2 border-hive-border border-t-hive-yellow animate-spin" />
  </div>
);

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/our-approach" element={<OurApproachPage />} />
            <Route path="/our-approach/:slug" element={<OurApproachDetailPage />} />
            <Route path="/risk-and-compliance" element={<RiskCompliancePage />} />
            <Route path="/risk-and-compliance/:slug" element={<RiskPolicyDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServicesIndexPage />} />
            <Route path="/services/artificial-intelligence" element={<AIServicesPage />} />
            <Route path="/services/artificial-intelligence/:slug" element={<AIServiceDetailPage />} />
            <Route path="/services/product-engineering" element={<ProductEngineeringPage />} />
            <Route path="/services/product-engineering/:slug" element={<ProductEngineeringDetailPage />} />
            <Route path="/services/customer-experience" element={<CustomerExperiencePage />} />
            <Route path="/services/customer-experience/:slug" element={<CustomerExperienceDetailPage />} />
            <Route path="/services/intelligent-automation" element={<IntelligentAutomationPage />} />
            <Route path="/services/intelligent-automation/:slug" element={<IntelligentAutomationDetailPage />} />
            <Route path="/services/data-and-analytics" element={<DataAnalyticsPage />} />
            <Route path="/services/data-and-analytics/:slug" element={<DataAnalyticsDetailPage />} />
            <Route path="/services/cloud-platforms" element={<CloudPlatformsPage />} />
            <Route path="/services/cloud-platforms/:slug" element={<CloudPlatformsDetailPage />} />
            <Route path="/services/edge-technologies" element={<EdgeTechnologiesPage />} />
            <Route path="/services/edge-technologies/:slug" element={<EdgeTechnologiesDetailPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;
