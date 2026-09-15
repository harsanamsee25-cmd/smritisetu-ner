import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ROUTINE_STEPS } from '../../data/mockData';
import { soundManager } from '../../utils/audio';
import { RotateCcw, HelpCircle, CheckCircle2, Sparkles, ArrowDown } from 'lucide-react';

export const RoutineRecall = () => {
  const { openModal, setProfile, t } = useApp();

  // Randomize initial order for sequencing challenge
  const [availableCards, setAvailableCards] = useState(() => {
    return [...ROUTINE_STEPS].sort(() => Math.random() - 0.5);
  });
  const [userSequence, setUserSequence] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('Click or tap cards in the correct morning sequence!');

  const resetGame = () => {
    soundManager.playGentleClick();
    setAvailableCards([...ROUTINE_STEPS].sort(() => Math.random() - 0.5));
    setUserSequence([]);
    setShowHint(false);
    setFeedback('Select what you usually do first after waking up!');
  };

  const handleSelectCard = (card) => {
    soundManager.playGentleClick();
    if (userSequence.some(item => item.id === card.id)) return;

    const nextSeq = [...userSequence, card];
    setUserSequence(nextSeq);
    setAvailableCards(prev => prev.filter(item => item.id !== card.id));

    // Check progress
    if (nextSeq.length === ROUTINE_STEPS.length) {
      // Check if order matches expected sequence 1..4
      const isCorrect = nextSeq.every((item, idx) => item.order === idx + 1);

      if (isCorrect) {
        soundManager.playSoftChime();
        setFeedback('Excellent! You remembered your morning routine correctly! 🌟');

        setProfile(prev => ({
          ...prev,
          cognitiveSessionsCompleted: prev.cognitiveSessionsCompleted + 1
        }));

        setTimeout(() => {
          openModal('game_complete', {
            gameKey: 'routine',
            gameTitle: 'My Morning Routine Recall',
            score: 4,
            maxScore: 4,
            timeSeconds: 25,
            attempts: 1,
            encouragement: 'Excellent! You remembered your morning routine step by step.'
          });
        }, 700);
      } else {
        // GENTLE HELP (NO FAILURE / NO GAME OVER)
        setFeedback('Good try! Let’s adjust the sequence slightly. 😊');
      }
    }
  };

  const handleRemoveFromSequence = (index) => {
    soundManager.playGentleClick();
    const removed = userSequence[index];
    setUserSequence(prev => prev.filter((_, i) => i !== index));
    setAvailableCards(prev => [...prev, removed]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-teal-100">
        <div>
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Game 2 • Sequential Recall
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1">
            🌅 My Morning Routine
          </h2>
        </div>

        <button
          onClick={resetGame}
          className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold rounded-xl text-sm border border-teal-200 flex items-center space-x-1.5 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Order</span>
        </button>
      </div>

      {/* Prompt Banner */}
      <div className="bg-amber-50 rounded-2xl p-4 text-center mb-6 border border-amber-200">
        <h3 className="text-xl font-extrabold text-amber-950 mb-1">
          “What do you usually do first after waking up?”
        </h3>
        <p className="text-sm font-bold text-amber-800">
          {feedback}
        </p>
      </div>

      {/* User Selected Ordered Sequence Slots */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Your Ordered Sequence ({userSequence.length} / 4)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 min-h-[100px]">
          {[0, 1, 2, 3].map((slotIdx) => {
            const item = userSequence[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`min-h-[96px] rounded-2xl p-3 border-2 border-dashed flex flex-col items-center justify-center transition relative ${
                  item
                    ? 'bg-emerald-50 border-emerald-400 shadow-sm cursor-pointer'
                    : 'bg-gray-50 border-gray-300 text-gray-400'
                }`}
                onClick={() => item && handleRemoveFromSequence(slotIdx)}
              >
                {item ? (
                  <div className="text-center">
                    <span className="text-xs font-extrabold bg-emerald-700 text-white w-5 h-5 rounded-full inline-flex items-center justify-center mb-1">
                      {slotIdx + 1}
                    </span>
                    <span className="text-2xl block">{item.icon}</span>
                    <span className="text-xs font-bold text-gray-900 block mt-1">
                      {item.title}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-gray-400">
                    Step {slotIdx + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Choices Cards */}
      {availableCards.length > 0 && (
        <div className="mb-8">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Tap a step to place next in order:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {availableCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleSelectCard(card)}
                className="p-4 bg-teal-50 hover:bg-teal-100 border-2 border-teal-300 rounded-2xl flex flex-col items-center text-center shadow-md transform active:scale-95 transition"
              >
                <span className="text-4xl mb-2">{card.icon}</span>
                <span className="text-base font-extrabold text-teal-950 block">
                  {card.title}
                </span>
                <span className="text-xs font-semibold text-teal-700 block mt-0.5">
                  {card.titleAssamese}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gentle Hint Toggle */}
      <div className="border-t border-teal-100 pt-4 flex items-center justify-between">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center space-x-1.5 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300"
        >
          <HelpCircle className="w-4 h-4 text-amber-700" />
          <span>Need a gentle hint?</span>
        </button>

        {showHint && (
          <p className="text-xs font-bold text-teal-900 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 animate-fadeIn">
            💡 <strong>Hint:</strong> Sunlight comes first, followed by fresh Assam tea!
          </p>
        )}
      </div>
    </div>
  );
};
