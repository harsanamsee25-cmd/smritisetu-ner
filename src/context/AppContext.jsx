import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PATIENT_PROFILE,
  INITIAL_REMINDERS,
  INITIAL_VOICE_NOTES,
  DICTIONARY
} from '../data/mockData';
import { soundManager } from '../utils/audio';
import { speakText, stopSpeech } from '../utils/speech';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Intro Screen State
  const [isIntroFinished, setIsIntroFinished] = useState(() => {
    return localStorage.getItem('smritisetu_intro_done') === 'true';
  });

  // 2. View Mode (Patient vs Caregiver)
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('smritisetu_mode') || 'patient';
  });

  // 3. Language (English vs Assamese)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('smritisetu_lang') || 'en';
  });

  // 4. Navigation Active Tab
  const [activeTab, setActiveTab] = useState('home');

  // 5. Accessibility Font Scaler
  const [fontScale, setFontScale] = useState(() => {
    return localStorage.getItem('smritisetu_font_scale') || 'md';
  });

  // 6. Sound Settings
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('smritisetu_sound') !== 'false';
  });

  // 7. Demo Mode Switch
  const [demoMode, setDemoMode] = useState(false);

  // 8. Patient Profile & Metrics State
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('smritisetu_profile');
    return saved ? JSON.parse(saved) : INITIAL_PATIENT_PROFILE;
  });

  // 9. Reminders State
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('smritisetu_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  // 10. Voice Notes State
  const [voiceNotes, setVoiceNotes] = useState(() => {
    const saved = localStorage.getItem('smritisetu_voicenotes');
    return saved ? JSON.parse(saved) : INITIAL_VOICE_NOTES;
  });

  // 11. Offline & Sync State
  const [offlineState, setOfflineState] = useState({
    isOnline: true,
    pendingItems: 2,
    lastSynced: '9:42 AM Today',
    isSyncing: false
  });

  // 12. AI Dynamic Difficulty Settings
  const [aiDifficulty, setAiDifficulty] = useState('adaptive'); // gentle, adaptive, challenging
  const [aiStats, setAiStats] = useState({
    avgResponseTimeSec: 3.4,
    recentAttempts: 1.2,
    hintsUsedCount: 1,
    completionRate: 94
  });

  // 13. Active Game Launcher State
  const [activeGame, setActiveGame] = useState(null); // null | 'memory' | 'routine'

  // 14. Audio Player / Voice Simulation Modal State
  const [playingVoice, setPlayingVoice] = useState(null); // voice note object currently playing

  // 15. Active Modal State
  const [activeModal, setActiveModal] = useState(null); // null | 'reminder_detail' | 'voice_record' | 'game_complete' | 'difficulty_info' | 'offline_sync' | 'profile' | 'notifications'
  const [modalPayload, setModalPayload] = useState(null);

  // 16. Notifications list
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Medication Reminder', desc: 'Blood Pressure medicine scheduled for 2:00 PM', time: '10m ago', read: false },
    { id: 'n2', title: 'Family Voice Note', desc: 'Daughter Bimala sent a new morning message', time: '1h ago', read: false }
  ]);

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('smritisetu_intro_done', isIntroFinished);
  }, [isIntroFinished]);

  useEffect(() => {
    localStorage.setItem('smritisetu_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('smritisetu_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('smritisetu_font_scale', fontScale);
    // Apply scale class to root html element
    const htmlEl = document.documentElement;
    htmlEl.classList.remove('scale-sm', 'scale-md', 'scale-lg');
    htmlEl.classList.add(`scale-${fontScale}`);
  }, [fontScale]);

  useEffect(() => {
    localStorage.setItem('smritisetu_sound', soundEnabled);
    soundManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('smritisetu_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('smritisetu_voicenotes', JSON.stringify(voiceNotes));
  }, [voiceNotes]);

  useEffect(() => {
    localStorage.setItem('smritisetu_profile', JSON.stringify(profile));
  }, [profile]);

  // Handle Demo Mode state shifts
  const toggleDemoMode = () => {
    const nextDemo = !demoMode;
    setDemoMode(nextDemo);
    soundManager.playGentleClick();
    if (nextDemo) {
      setProfile(prev => ({
        ...prev,
        adherenceRate: 87,
        hydrationCount: 6,
        cognitiveSessionsCompleted: 5,
        missedDosesCount: 2
      }));
    }
  };

  // Switch View Mode (Patient <-> Caregiver)
  const switchViewMode = (mode) => {
    soundManager.playGentleClick();
    setViewMode(mode);
    if (mode === 'caregiver') {
      setActiveTab('caregiver');
    } else {
      setActiveTab('home');
    }
  };

  // Helper dictionary getter
  const t = (key) => {
    return DICTIONARY[lang]?.[key] || DICTIONARY['en']?.[key] || key;
  };

  // Helper action: Mark Reminder as Taken
  const markReminderTaken = (id) => {
    soundManager.playSoftChime();
    setReminders(prev => prev.map(rem => {
      if (rem.id === id) {
        return { ...rem, status: 'taken' };
      }
      return rem;
    }));

    // Increment adherence and pending sync log
    setProfile(prev => {
      const newAdherence = Math.min(100, prev.adherenceRate + 3);
      return { ...prev, adherenceRate: newAdherence };
    });
    setOfflineState(prev => ({ ...prev, pendingItems: prev.pendingItems + 1 }));
  };

  // Helper action: Snooze Reminder
  const snoozeReminder = (id) => {
    soundManager.playGentleClick();
    setReminders(prev => prev.map(rem => {
      if (rem.id === id) {
        return { ...rem, status: 'snoozed', time: '15m later' };
      }
      return rem;
    }));
  };

  // Play Family Voice Simulation
  const handlePlayVoice = (voiceItem) => {
    soundManager.playGentleClick();
    setPlayingVoice(voiceItem);
    speakText(
      voiceItem.text || voiceItem.audioMessage,
      lang,
      () => setPlayingVoice(null),
      () => setPlayingVoice(null)
    );
  };

  const handleStopVoice = () => {
    stopSpeech();
    setPlayingVoice(null);
  };

  // Accessibility screen reader
  const handleReadScreenAloud = (textToRead) => {
    const text = textToRead || `${t('welcomeBack')}. ${t('todaysReminders')}. ${reminders.filter(r => r.status === 'upcoming').length} upcoming items today.`;
    speakText(text, lang);
  };

  // Trigger Sync Simulation
  const triggerSync = () => {
    soundManager.playGentleClick();
    setOfflineState(prev => ({ ...prev, isSyncing: true }));
    setTimeout(() => {
      setOfflineState({
        isOnline: true,
        pendingItems: 0,
        lastSynced: 'Just Now',
        isSyncing: false
      });
      soundManager.playSoftChime();
    }, 1800);
  };

  // Modal Controllers
  const openModal = (type, payload = null) => {
    soundManager.playGentleClick();
    setActiveModal(type);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
    handleStopVoice();
  };

  return (
    <AppContext.Provider value={{
      isIntroFinished,
      setIsIntroFinished,
      viewMode,
      setViewMode,
      switchViewMode,
      lang,
      setLang,
      activeTab,
      setActiveTab,
      fontScale,
      setFontScale,
      soundEnabled,
      setSoundEnabled,
      demoMode,
      toggleDemoMode,
      profile,
      setProfile,
      reminders,
      setReminders,
      markReminderTaken,
      snoozeReminder,
      voiceNotes,
      setVoiceNotes,
      offlineState,
      triggerSync,
      aiDifficulty,
      setAiDifficulty,
      aiStats,
      activeGame,
      setActiveGame,
      playingVoice,
      handlePlayVoice,
      handleStopVoice,
      handleReadScreenAloud,
      activeModal,
      modalPayload,
      openModal,
      closeModal,
      notifications,
      setNotifications,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
