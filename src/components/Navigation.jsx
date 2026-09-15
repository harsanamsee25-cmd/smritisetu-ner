import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Brain, Bell, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Navigation = () => {
  const { activeTab, setActiveTab, viewMode, t } = useApp();

  const navItems = [
    { id: 'home', label: t('home'), icon: Home, emoji: '🏠' },
    { id: 'games', label: t('games'), icon: Brain, emoji: '🧠' },
    { id: 'reminders', label: t('reminders'), icon: Bell, emoji: '🔔' },
    { id: 'caregiver', label: t('caregiver'), icon: ShieldCheck, emoji: '👩‍⚕️' },
  ];

  const handleSelect = (tabId) => {
    soundManager.playGentleClick();
    setActiveTab(tabId);
  };

  return (
    <>
      {/* Desktop & Tablet Navigation Bar */}
      <nav className="bg-teal-900 text-white shadow-lifted hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center space-x-2 px-6 py-3.5 font-bold text-base transition border-b-4 ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-teal-800/80'
                    : 'border-transparent text-teal-100 hover:text-white hover:bg-teal-800/40'
                }`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Fixed Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-teal-200/80 shadow-2xl md:hidden pb-safe">
        <div className="grid grid-cols-4 items-center h-16 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
                  isActive
                    ? 'text-tea-700 font-extrabold scale-105'
                    : 'text-gray-500 font-medium hover:text-gray-900'
                }`}
              >
                <span className="text-xl mb-0.5">{item.emoji}</span>
                <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
