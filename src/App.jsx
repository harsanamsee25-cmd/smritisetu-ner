import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { IntroScreen } from './components/IntroScreen';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { AccessibilityBar } from './components/AccessibilityBar';
import { PatientHome } from './pages/PatientHome';
import { GamesHub } from './pages/GamesHub';
import { RemindersPage } from './pages/RemindersPage';
import { CaregiverPortal } from './pages/CaregiverPortal';

// Modals
import { DetailModal } from './components/Modals/DetailModal';
import { VoiceRecordModal } from './components/Modals/VoiceRecordModal';
import { GameCompleteModal } from './components/Modals/GameCompleteModal';
import { DifficultyInfoModal } from './components/Modals/DifficultyInfoModal';
import { OfflineSyncModal } from './components/Modals/OfflineSyncModal';
import { PatientProfileModal } from './components/Modals/PatientProfileModal';
import { NotificationDrawer } from './components/Modals/NotificationDrawer';

const MainLayout = () => {
  const { isIntroFinished, activeTab, viewMode } = useApp();

  if (!isIntroFinished) {
    return <IntroScreen />;
  }

  return (
    <div className="min-h-screen bg-bgwarm flex flex-col font-sans text-gray-900 selection:bg-tea-100 selection:text-tea-800">
      {/* Persistent App Header */}
      <Header />

      {/* Accessibility Control Banner */}
      <AccessibilityBar />

      {/* Navigation (Desktop Top Bar) */}
      <Navigation />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-20 md:pb-12">
        {activeTab === 'home' && <PatientHome />}
        {activeTab === 'games' && <GamesHub />}
        {activeTab === 'reminders' && <RemindersPage />}
        {activeTab === 'caregiver' && <CaregiverPortal />}
      </main>

      {/* Global Modals Stack */}
      <DetailModal />
      <VoiceRecordModal />
      <GameCompleteModal />
      <DifficultyInfoModal />
      <OfflineSyncModal />
      <PatientProfileModal />
      <NotificationDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
