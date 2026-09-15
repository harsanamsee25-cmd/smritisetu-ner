// Speech synthesis helper for family voice messages & accessibility screen reader

export const speakText = (text, lang = 'en-US', onEndCallback = null, onErrorCallback = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment');
    if (onEndCallback) setTimeout(onEndCallback, 2500); // simulate duration
    return false;
  }

  try {
    // Cancel active utterances
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'as' ? 'hi-IN' : 'en-US'; // Use hi-IN as phonetic proxy if Assamese voice is unavailable
    utterance.rate = 0.85; // Slightly slower, calm cadence for elderly users
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      if (onErrorCallback) onErrorCallback(e);
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to execute speakText:', err);
    if (onEndCallback) setTimeout(onEndCallback, 2500);
    return false;
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('Error stopping speech synthesis:', e);
    }
  }
};
