export const INITIAL_PATIENT_PROFILE = {
  id: "NER-1024",
  name: "Aai (Jhanobi Baruah)",
  age: 76,
  gender: "Female",
  language: "Assamese",
  district: "Guwahati, Assam",
  assignedAsha: "Sunita Das (ASHA ID #AS-4412)",
  emergencyContact: "+91 98640 12345 (Daughter Bimala)",
  adherenceRate: 87,
  hydrationCount: 6,
  targetHydration: 8,
  cognitiveSessionsCompleted: 8,
  missedDosesCount: 2,
  status: "Stable",
  syncStatus: "Synced Locally",
  lastSyncedTime: "9:42 AM Today"
};

export const LANGUAGE_TIERS = {
  tier1: {
    title: "Tier 1 • Full Voice Support",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    languages: [
      { id: "en", name: "English (English)", status: "active", label: "✓ Active" },
      { id: "as", name: "Assamese (অসমীয়া)", status: "active", label: "✓ Active" },
      { id: "mn", name: "Manipuri (মৈতৈলোন্)", status: "coming_soon", label: "Coming Soon" },
      { id: "bn", name: "Bengali (বাংলা)", status: "coming_soon", label: "Coming Soon" },
      { id: "br", name: "Bodo (বরঅ)", status: "coming_soon", label: "Coming Soon" }
    ]
  },
  tier2: {
    title: "Tier 2 • Commands Only",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
    languages: [
      { id: "kh", name: "Khasi (Ka Ktien Khasi)", status: "coming_soon", label: "Coming Soon" },
      { id: "gr", name: "Garo (A·chik)", status: "coming_soon", label: "Coming Soon" },
      { id: "mz", name: "Mizo (Mizo ṭawng)", status: "coming_soon", label: "Coming Soon" },
      { id: "ng", name: "Nagamese (নগামিছ)", status: "coming_soon", label: "Coming Soon" }
    ]
  }
};

export const INITIAL_HISTORICAL_SESSIONS = [
  { id: "s1", date: "Sep 08", sessionScore: 65, gameTitle: "Memory Match", attempts: 6, completionTimeSeconds: 140 },
  { id: "s2", date: "Sep 09", sessionScore: 68, gameTitle: "Memory Match", attempts: 5, completionTimeSeconds: 132 },
  { id: "s3", date: "Sep 10", sessionScore: 70, gameTitle: "Routine Recall", attempts: 5, completionTimeSeconds: 125 },
  { id: "s4", date: "Sep 11", sessionScore: 68, gameTitle: "Memory Match", attempts: 6, completionTimeSeconds: 128 },
  { id: "s5", date: "Sep 12", sessionScore: 72, gameTitle: "Memory Match", attempts: 4, completionTimeSeconds: 110 },
  { id: "s6", date: "Sep 13", sessionScore: 70, gameTitle: "Routine Recall", attempts: 4, completionTimeSeconds: 105 },
  { id: "s7", date: "Sep 14", sessionScore: 75, gameTitle: "Memory Match", attempts: 4, completionTimeSeconds: 100 },
  { id: "s8", date: "Sep 15", sessionScore: 77, gameTitle: "Memory Match", attempts: 3, completionTimeSeconds: 92 },
];

export const INITIAL_REMINDERS = [
  {
    id: "rem-1",
    type: "medicine",
    title: "Blood Pressure Medicine",
    titleAssamese: "ৰক্তচাপৰ ঔষধ (Amlodipine 5mg)",
    dosage: "1 Tablet with lukewarm water",
    time: "2:00 PM",
    status: "upcoming",
    category: "Important",
    audioMessage: "Aai, please take your blood pressure medicine after resting a little bit. - Bimala ❤️",
    sender: "Daughter Bimala"
  },
  {
    id: "rem-2",
    type: "hydration",
    title: "Drink Water",
    titleAssamese: "এক গ্লাছ পানী খাওক",
    dosage: "1 Full Glass (250ml)",
    time: "3:30 PM",
    status: "upcoming",
    category: "Routine",
    audioMessage: "Aai, please drink some fresh water. We are thinking of you. ❤️",
    sender: "Son Rahul"
  },
  {
    id: "rem-3",
    type: "cognitive",
    title: "Memory Exercise Session",
    titleAssamese: "স্মৃতিৰ ব্যায়াম",
    dosage: "10 Minutes Gentle Card Match",
    time: "6:00 PM",
    status: "completed",
    category: "Cognitive",
    audioMessage: "You did great in your morning routine exercise! Let's play cards together at 6 PM.",
    sender: "Granddaughter Priya"
  },
  {
    id: "rem-4",
    type: "medicine",
    title: "Night Calcium & Vitamin D",
    titleAssamese: "ৰাতিৰ কেলচিয়াম",
    dosage: "1 Tablet after dinner",
    time: "8:30 PM",
    status: "upcoming",
    category: "Routine",
    audioMessage: "Aai, remember to take your calcium tablet after dinner tonight.",
    sender: "ASHA Worker Sunita"
  }
];

export const INITIAL_VOICE_NOTES = [
  {
    id: "vn-1",
    sender: "Daughter Bimala",
    senderAssamese: "জিয়েক বিমলা",
    time: "Today, 9:15 AM",
    duration: "0:14",
    text: "Good morning Aai! Have a peaceful morning. Don't forget your afternoon medicine today.",
    textAssamese: "শুভ প্ৰভাত আই! আজি বিয়লিৰ ঔষধ খাবলৈ নাপাহৰিব।",
    avatar: "👩‍🌾"
  },
  {
    id: "vn-2",
    sender: "Granddaughter Priya",
    senderAssamese: "নাতিয়েক প্ৰিয়া",
    time: "Yesterday, 5:30 PM",
    duration: "0:20",
    text: "Aai, I loved the Bihu story you told me. I am coming to visit you this Sunday!",
    textAssamese: "আই, আপুনি কোৱা বিহুৰ সাধুটো মোৰ বৰ ভাল লাগিল। দেওবাৰে লগ পাম!",
    avatar: "👧"
  },
  {
    id: "vn-3",
    sender: "Son Rahul",
    senderAssamese: "পুতেক ৰাহুল",
    time: "Sep 13, 8:00 PM",
    duration: "0:18",
    text: "Aai, drink enough warm water today. Sunita Baideo will visit at 4 PM.",
    textAssamese: "আই, আজি পৰ্যাপ্ত পানী খাব। সুনীতা বাইদেউ ৪ বজাত আহিব।",
    avatar: "👨‍💼"
  }
];

export const MEMORY_MATCH_CARDS = [
  { id: 'tea-cup', name: 'Assam Tea Cup', nameAssamese: 'চাহৰ কাপ', icon: '🫖', bg: 'bg-amber-50 border-amber-200' },
  { id: 'tea-leaf', name: 'Tea Leaf', nameAssamese: 'চাহ পাত', icon: '🌿', bg: 'bg-emerald-50 border-emerald-200' },
  { id: 'shawl', name: 'Assamese Shawl', nameAssamese: 'ফুলাম গামোচা', icon: '🧣', bg: 'bg-rose-50 border-rose-200' },
  { id: 'rhino', name: 'Rhino / Elephant', nameAssamese: 'এশিঙীয়া গঁৰ', icon: '🦏', bg: 'bg-slate-50 border-slate-200' },
  { id: 'flower', name: 'Kopou Orchid', nameAssamese: 'কপৌ ফুল', icon: '🌺', bg: 'bg-fuchsia-50 border-fuchsia-200' },
  { id: 'bird', name: 'Hornbill Bird', nameAssamese: 'ধনেশ পক্ষী', icon: '🐦', bg: 'bg-sky-50 border-sky-200' },
  { id: 'rice-bowl', name: 'Johas Rice Bowl', nameAssamese: 'জাৰা চাউলৰ ভাত', icon: '🍚', bg: 'bg-orange-50 border-orange-200' },
  { id: 'mango', name: 'Fresh Fruit', nameAssamese: 'পকা আম', icon: '🥭', bg: 'bg-yellow-50 border-yellow-200' },
];

export const ROUTINE_STEPS = [
  { id: 'step-1', order: 1, title: 'Morning Sunlight', titleAssamese: 'পূৱাৰ ৰ’দালী', icon: '☀️', hint: 'Waking up & seeing gentle sun rays' },
  { id: 'step-2', order: 2, title: 'Morning Assam Tea', titleAssamese: 'পূৱাৰ একাপ চাহ', icon: '🫖', hint: 'Drinking fresh warm cup of tea' },
  { id: 'step-3', order: 3, title: 'Gentle Stretches', titleAssamese: 'হালকা খোজকাঢ়া', icon: '🚶', hint: 'Walking in courtyard or gentle stretch' },
  { id: 'step-4', order: 4, title: 'Warm Breakfast', titleAssamese: 'পুষ্টিকৰ আহাৰ', icon: '🍚', hint: 'Having healthy breakfast with family' },
];

export const MISSED_DOSES_LOG = [
  { id: "md-1", date: "Sep 14, 2026", medicine: "Blood Pressure Medicine (Amlodipine)", time: "2:00 PM", status: "Missed", reason: "Patient was sleeping during alarm", followUp: "ASHA worker visited at 5 PM to confirm dose safety" },
  { id: "md-2", date: "Sep 12, 2026", medicine: "Blood Pressure Medicine (Amlodipine)", time: "2:00 PM", status: "Taken (Late)", reason: "Marked taken at 3:45 PM after family voice reminder", followUp: "Recorded as taken late" },
  { id: "md-3", date: "Sep 10, 2026", medicine: "Blood Pressure Medicine (Amlodipine)", time: "2:00 PM", status: "Taken", reason: "On schedule", followUp: "No issue" },
  { id: "md-4", date: "Sep 08, 2026", medicine: "Night Calcium Tablet", time: "8:30 PM", status: "Missed", reason: "Refused dose due to nausea", followUp: "Family notified ASHA worker" },
  { id: "md-5", date: "Sep 05, 2026", medicine: "Blood Pressure Medicine (Amlodipine)", time: "2:00 PM", status: "Taken", reason: "On schedule", followUp: "No issue" },
];

export const DICTIONARY = {
  en: {
    appTitle: "SmritiSetu NER",
    tagline: "Bridging Memories. Connecting Care.",
    welcomeBack: "Good Morning, Aai!",
    subWelcome: "Welcome back ❤️",
    patientView: "Patient View",
    caregiverPortal: "Caregiver Portal",
    home: "Home",
    games: "Games",
    reminders: "Reminders",
    caregiver: "Caregiver",
    todaysReminders: "Today's Reminders",
    markTaken: "Mark as Taken",
    remindLater: "Remind Me Later",
    takenStatus: "✓ Taken",
    upcomingStatus: "Upcoming",
    playVoice: "Play Family Voice",
    playingVoice: "Playing Family Message...",
    todaysSessionHero: "Today's Memory Session",
    sessionHeroSub: "10 minutes • Gentle & Personalized",
    startSession: "Start Today's Session →",
    aiGentle: "Auto-Adjusting: Gentle",
    aiPersonalized: "Personalized for today's performance",
    exerciseTitle: "Let's Exercise Your Memory",
    exerciseSub: "No pressure. Take your time. ❤️",
    goodTry: "Good try! Take another look. 😊",
    shabash: "Shabash! Wonderful work!",
    memoryMatchTitle: "North East Heritage Memory Match",
    routineTitle: "My Morning Routine",
    routinePrompt: "What do you usually do first in the morning?",
    messagesFromFamily: "Messages from Family",
    recordVoice: "Record Voice Note",
    offlineMode: "Offline Mode",
    syncedLocally: "Synced Locally",
    syncNow: "Sync Now",
    syncing: "Syncing...",
    allSynced: "✓ All records synced",
    demoMode: "Demo Mode",
    readAloud: "Read Screen Aloud",
    soundOn: "Sound On",
    soundOff: "Sound Off"
  },
  as: {
    appTitle: "স্মৃতিসেতু উত্তৰ-পূৰ্বাঞ্চল",
    tagline: "স্মৃতিৰ সেতু, মৰমৰ সেৱা।",
    welcomeBack: "শুভ প্ৰভাত, আই!",
    subWelcome: "আপোনাক স্বাগতম ❤️",
    patientView: "আইৰ পৃষ্ঠা (রোগী)",
    caregiverPortal: "সেৱিকা পোৰ্টেল",
    home: "মুখ্য পৃষ্ঠা",
    games: "স্মৃতি খেলা",
    reminders: "সময়সূচী",
    caregiver: "আশা সেৱিকা",
    todaysReminders: "আজিৰ ঔষধ আৰু কাৰ্যসূচী",
    markTaken: "ঔষধ খালোঁ",
    remindLater: "পাছত মনত পেলাব",
    takenStatus: "✓ খোৱা হ’ল",
    upcomingStatus: "ব বাকী আছে",
    playVoice: "পৰিয়ালৰ মাত শুনক",
    playingVoice: "পৰিয়ালৰ বাৰ্তা বাজি আছে...",
    todaysSessionHero: "আজিৰ স্মৃতি অনুশীলন",
    sessionHeroSub: "১০ মিনিট • সহজ আৰু মৰমিয়াল",
    startSession: "অনুশীলন আৰম্ভ কৰক →",
    aiGentle: "স্বয়ং-সামঞ্জস্যপূৰ্ণ: অতি সহজ",
    aiPersonalized: "আজিৰ বাবে বিশেষভাৱে প্ৰস্তুত",
    exerciseTitle: "আহক, স্মৃতিৰ ব্যায়াম কৰোঁ",
    exerciseSub: "কোনো খৰখেদা নাই। ধীৰে ধীৰে কৰক। ❤️",
    goodTry: "ভাল চেষ্টা! পুনৰ এবাৰ চাওক। 😊",
    shabash: "শ্বাবাশ! অতি সুন্দৰ!",
    memoryMatchTitle: "উত্তৰ-পূৰ্বাঞ্চলৰ স্মৰণীয় বস্তু মিলোৱা",
    routineTitle: "মোৰ পূৱাৰ নিয়ম",
    routinePrompt: "ৰাতিপুৱা সাৰ পাই প্ৰথমে কি কৰে?",
    messagesFromFamily: "পৰিয়ালৰ মৰমৰ বাৰ্তা",
    recordVoice: "নিয়মীয় মাত ৰেকৰ্ড কৰক",
    offlineMode: "অফলাইন ম'ড",
    syncedLocally: "স্থানীয়ভাৱে সংৰক্ষিত",
    syncNow: "চিঙ্ক কৰক (Sync)",
    syncing: "চিঙ্ক হৈ আছে...",
    allSynced: "✓ সকলো চিঙ্ক হৈ গ’ল",
    demoMode: "ডেম' ম'ড",
    readAloud: "পঢ়ি শুনাওক",
    soundOn: "শব্দ অন",
    soundOff: "শব্দ অফ"
  }
};
