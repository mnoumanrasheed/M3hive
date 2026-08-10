import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from './components/animation/ScrollToTop';

// Critical path: HomePage is loaded immediately
import { HomePage } from './pages/HomePage';

// Lazy loaded routes
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PartnersPage = React.lazy(() => import('./pages/PartnersPage').then(module => ({ default: module.PartnersPage })));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage').then(module => ({ default: module.ResourcesPage })));
const ResourceDetailPage = React.lazy(() => import('./pages/ResourceDetailPage').then(module => ({ default: module.ResourceDetailPage })));
const RiskCompliancePage = React.lazy(() => import('./pages/RiskCompliancePage').then(module => ({ default: module.RiskCompliancePage })));
const RiskPolicyDetailPage = React.lazy(() => import('./pages/risk-and-compliance/RiskPolicyDetailPage').then(module => ({ default: module.RiskPolicyDetailPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const ServicesIndexPage = React.lazy(() => import('./pages/services/ServicesIndexPage').then(module => ({ default: module.ServicesIndexPage })));
const AIServicesPage = React.lazy(() => import('./pages/services/AIServicesPage').then(module => ({ default: module.AIServicesPage })));
const AIServiceDetailPage = React.lazy(() => import('./pages/services/AIServiceDetailPage').then(module => ({ default: module.AIServiceDetailPage })));
const ProductEngineeringPage = React.lazy(() => import('./pages/services/ProductEngineeringPage').then(module => ({ default: module.ProductEngineeringPage })));
const CustomerExperiencePage = React.lazy(() => import('./pages/services/CustomerExperiencePage').then(module => ({ default: module.CustomerExperiencePage })));
const IntelligentAutomationPage = React.lazy(() => import('./pages/services/IntelligentAutomationPage').then(module => ({ default: module.IntelligentAutomationPage })));
const DataAnalyticsPage = React.lazy(() => import('./pages/services/DataAnalyticsPage').then(module => ({ default: module.DataAnalyticsPage })));
const CloudPlatformsPage = React.lazy(() => import('./pages/services/CloudPlatformsPage').then(module => ({ default: module.CloudPlatformsPage })));
const EdgeTechnologiesPage = React.lazy(() => import('./pages/services/EdgeTechnologiesPage').then(module => ({ default: module.EdgeTechnologiesPage })));

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
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            <Route path="/risk-and-compliance" element={<RiskCompliancePage />} />
            <Route path="/risk-and-compliance/:slug" element={<RiskPolicyDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServicesIndexPage />} />
            <Route path="/services/artificial-intelligence" element={<AIServicesPage />} />
            <Route path="/services/artificial-intelligence/:slug" element={<AIServiceDetailPage />} />
            <Route path="/services/product-engineering" element={<ProductEngineeringPage />} />
            <Route path="/services/customer-experience" element={<CustomerExperiencePage />} />
            <Route path="/services/intelligent-automation" element={<IntelligentAutomationPage />} />
            <Route path="/services/data-and-analytics" element={<DataAnalyticsPage />} />
            <Route path="/services/cloud-platforms" element={<CloudPlatformsPage />} />
            <Route path="/services/edge-technologies" element={<EdgeTechnologiesPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;
