import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlatformProvider, usePlatform } from './contexts/PlatformContext';

import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { EmergencyModal } from './components/common/EmergencyModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { CertificateModal } from './components/common/CertificateModal';
import { AuthModal } from './components/auth/AuthModal';
import { MidwifeAssistantModal } from './components/ai/MidwifeAssistantModal';

import { HomeView } from './components/views/HomeView';
import { PregnancyView } from './components/views/PregnancyView';
import { ReproductiveHealthView } from './components/views/ReproductiveHealthView';
import { NewbornView } from './components/views/NewbornView';
import { CoursesView } from './components/views/CoursesView';
import { QuizzesView } from './components/views/QuizzesView';
import { StudentsView } from './components/views/StudentsView';
import { MidwivesView } from './components/views/MidwivesView';
import { YouthView } from './components/views/YouthView';
import { PharmacyView } from './components/views/PharmacyView';
import { ArticlesView } from './components/views/ArticlesView';
import { DashboardView } from './components/views/DashboardView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { AboutContactView } from './components/views/AboutContactView';

const AppContent: React.FC = () => {
  const { currentRoute } = usePlatform();

  const renderActiveView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'pregnancy':
        return <PregnancyView />;
      case 'reproductive_health':
        return <ReproductiveHealthView />;
      case 'newborn':
        return <NewbornView />;
      case 'courses':
        return <CoursesView />;
      case 'quizzes':
        return <QuizzesView />;
      case 'students':
        return <StudentsView />;
      case 'midwives':
        return <MidwivesView />;
      case 'youth':
        return <YouthView />;
      case 'pharmacy':
        return <PharmacyView />;
      case 'articles':
        return <ArticlesView />;
      case 'dashboard':
        return <DashboardView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'about':
      case 'contact':
        return <AboutContactView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F5] text-[#2D3748] font-sans antialiased selection:bg-[#007A7A] selection:text-white">
      {/* Sticky Global Navigation Header */}
      <Header />

      {/* Main Routed Content */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Global Comprehensive Footer & Disclaimers */}
      <Footer />

      {/* Interactive Global Modals */}
      <EmergencyModal />
      <GlobalSearchModal />
      <CertificateModal />
      <AuthModal />
      <MidwifeAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <PlatformProvider>
          <AppContent />
        </PlatformProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
