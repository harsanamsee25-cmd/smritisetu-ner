import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PATIENT_PROFILE,
  INITIAL_REMINDERS,
  INITIAL_VOICE_NOTES,
  INITIAL_HISTORICAL_SESSIONS,
  DICTIONARY
} from '../data/mockData';
import { soundManager } from '../utils/audio';
import { speakText, stopSpeech } from '../utils/speech';
import { predictDifficulty, getLastPrediction, savePrediction } from '../ml/adaptiveModel';

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

  // 11. Historical Sessions for Personal Baseline & ML Features
  const [historicalSessions, setHistoricalSessions] = useState(() => {
    const saved = localStorage.getItem('smritisetu_historical_sessions');
    return saved ? JSON.parse(saved) : INITIAL_HISTORICAL_SESSIONS;
  });

  // 12. ML Prediction State
  const [lastPrediction, setLastPrediction] = useState(() => {
    return getLastPrediction() || {
      difficulty: 'adaptive',
      confidence: 84,
      reason: 'Initial baseline initialized. Adaptive mode active.'
    };
  });

  // 13. Offline & Sync State
  const [offlineState, setOfflineState] = useState({
    isOnline: true,
    pendingItems: 2,
    lastSynced: '9:42 AM Today',
    isSyncing: false
  });

  // 14. Active Difficulty Level
  const [aiDifficulty, setAiDifficulty] = useState('adaptive'); // gentle | adaptive | challenging

  // 15. Active Game Launcher State
  const [activeGame, setActiveGame] = useState(null); // null | 'memory' | 'routine'

  // 16. Audio Player / Voice Simulation Modal State
  const [playingVoice, setPlayingVoice] = useState(null);

  // 17. Active Modal State
  const [activeModal, setActiveModal] = useState(null);
  const [modalPayload, setModalPayload] = useState(null);

  // 18. Notifications list
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

  useEffect(() => {
    localStorage.setItem('smritisetu_historical_sessions', JSON.stringify(historicalSessions));
  }, [historicalSessions]);

  // Handle Demo Mode state shifts (Deterministic ML progression for judges)
  const toggleDemoMode = () => {
    const nextDemo = !demoMode;
    setDemoMode(nextDemo);
    soundManager.playGentleClick();

    if (nextDemo) {
      // Seed realistic historical session sequence that triggers ML predictions
      const demoSessions = [
        { id: "d1", date: "Sep 09", sessionScore: 50, accuracy: 0.50, responseTime: 26, attempts: 8, hintsUsed: 3, completed: 1 },
        { id: "d2", date: "Sep 11", sessionScore: 75, accuracy: 0.75, responseTime: 15, attempts: 5, hintsUsed: 1, completed: 1 },
        { id: "d3", date: "Sep 13", sessionScore: 100, accuracy: 1.00, responseTime: 8,  attempts: 4, hintsUsed: 0, completed: 1 },
      ];
      
      setHistoricalSessions(demoSessions);

      // Run ML prediction on demo latest session
      const pred = predictDifficulty(demoSessions[2], demoSessions, aiDifficulty);
      setLastPrediction(pred);
      savePrediction(pred);
      setAiDifficulty(pred.difficulty);

      setProfile(prev => ({
        ...prev,
        adherenceRate: 87,
        hydrationCount: 6,
        cognitiveSessionsCompleted: 8,
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

  // ML SESSION COMPLETION PIPELINE
  const recordSessionAndPredict = (sessionMetrics) => {
    const sessionRecord = {
      id: `session-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessionScore: sessionMetrics.score * 20, // normalized score 0-100 scale
      score: sessionMetrics.score,
      maxScore: sessionMetrics.maxScore,
      accuracy: sessionMetrics.accuracy || (sessionMetrics.score / sessionMetrics.maxScore),
      responseTime: sessionMetrics.timeSeconds,
      attempts: sessionMetrics.attempts,
      hintsUsed: sessionMetrics.hintsUsed || 0,
      completed: true,
      gameTitle: sessionMetrics.gameTitle
    };

    const updatedHistory = [...historicalSessions, sessionRecord];
    setHistoricalSessions(updatedHistory);

    // Run Genuine Client-Side ML Inference
    const prediction = predictDifficulty(sessionRecord, updatedHistory, aiDifficulty);

    setLastPrediction(prediction);
    savePrediction(prediction);

    // Automatically set next predicted difficulty for seamless play
    if (prediction.difficulty) {
      setAiDifficulty(prediction.difficulty);
    }

    return prediction;
  };

  // Helper action: Add Reminder
  const addReminder = (newRem) => {
    soundManager.playSoftChime();
    const reminderObj = {
      id: `rem-${Date.now()}`,
      status: 'upcoming',
      category: newRem.type === 'medicine' ? 'Important' : newRem.type === 'hydration' ? 'Routine' : 'Cognitive',
      ...newRem
    };
    setReminders(prev => [...prev, reminderObj]);
    setNotifications(prev => [
      { id: `n-${Date.now()}`, title: 'New Reminder Added', desc: `${newRem.title} scheduled for ${newRem.time}`, time: 'Just now', read: false },
      ...prev
    ]);
  };

  const markReminderTaken = (id) => {
    soundManager.playSoftChime();
    setReminders(prev => prev.map(rem => {
      if (rem.id === id) {
        return { ...rem, status: 'taken' };
      }
      return rem;
    }));

    setProfile(prev => {
      const newAdherence = Math.min(100, prev.adherenceRate + 3);
      return { ...prev, adherenceRate: newAdherence };
    });
    setOfflineState(prev => ({ ...prev, pendingItems: prev.pendingItems + 1 }));
  };

  const snoozeReminder = (id) => {
    soundManager.playGentleClick();
    setReminders(prev => prev.map(rem => {
      if (rem.id === id) {
        return { ...rem, status: 'snoozed', time: '15m later' };
      }
      return rem;
    }));
  };

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

  const handleReadScreenAloud = (textToRead) => {
    const text = textToRead || `${t('welcomeBack')}. ${t('todaysReminders')}. ${reminders.filter(r => r.status === 'upcoming').length} upcoming items today.`;
    speakText(text, lang);
  };

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
      addReminder,
      markReminderTaken,
      snoozeReminder,
      voiceNotes,
      setVoiceNotes,
      historicalSessions,
      lastPrediction,
      recordSessionAndPredict,
      offlineState,
      triggerSync,
      aiDifficulty,
      setAiDifficulty,
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
