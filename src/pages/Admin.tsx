import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import HeroManager from '@/components/admin/HeroManager';
import CtaManager from '@/components/admin/CtaManager';
import MediaManager from '@/components/admin/MediaManager';
import QuoteManager from '@/components/admin/QuoteManager';
import PageManager from '@/components/admin/PageManager';
import AboutManager from '@/components/admin/AboutManager';
import ServicesManager from '@/components/admin/ServicesManager';
import HeaderManager from '@/components/admin/HeaderManager';
import { puterService } from '@/utils/puterService';
import FooterManager from '@/components/admin/FooterManager';
import CrmManager from '@/components/admin/CrmManager';
import WhatsappManager from '@/components/admin/WhatsappManager';
import AIAdminAssistant from '@/components/admin/AIAdminAssistant';
import PerformanceManager from '@/components/admin/PerformanceManager';
import SecurityManager from '@/components/admin/SecurityManager';
import { adminModulesByKey } from '@/components/admin/adminModules';

const AdminPage = () => {
  const [activeView, setActiveView] = useState('hero');

  useEffect(() => {
    // Initialize Puter.js service for admin AI
    puterService.initialize().catch(error => {
      console.error('Failed to initialize Puter.js in Admin:', error);
    });
  }, []);

  const renderContent = () => {
    // Use the config as the single source of truth
    const mod = adminModulesByKey[activeView];

    const ActiveComponent = mod?.component || adminModulesByKey["hero"].component;

    return (
      <div>
        <ActiveComponent />
        <AIAdminAssistant context={activeView} />
      </div>
    );
  };

  return (
    <AdminLayout activeView={activeView} setActiveView={setActiveView}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPage;
