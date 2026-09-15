import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMORY_MATCH_CARDS } from '../../data/mockData';
import { soundManager } from '../../utils/audio';
import { Sparkles, RotateCcw, HelpCircle, Award } from 'lucide-react';

export const MemoryMatch = () => {
  const { openModal, aiDifficulty, setProfile, t } = useApp();

  const [pairCount, setPairCount] = useState(4); // default 4 pairs (8 cards), reduces to 3 if AI adapts
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [unsuccessfulStreak, setUnsuccessfulStreak] = useState(0);
  const [aiAdapted, setAiAdapted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('Select any card to begin!');
  const [startTime, setStartTime] = useState(null);

  // Initialize and shuffle cards
  useEffect(() => {
    resetGame(pairCount);
  }, [pairCount]);

  const resetGame = (numPairs = 4) => {
    const selected = MEMORY_MATCH_CARDS.slice(0, numPairs);
    const deck = [...selected, ...selected]
      .map((item, index) => ({
        ...item,
        uniqueId: `${item.id}-${index}-${Math.random()}`
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setUnsuccessfulStreak(0);
    setAiAdapted(false);
    setFeedbackMsg('Take your time. Match the identical pairs! ❤️');
    setStartTime(Date.now());
  };

  const handleCardClick = (index) => {
    if (flippedCards.length >= 2 || flippedCards.includes(index) || matchedPairs.includes(cards[index].id)) {
      return;
    }

    soundManager.playGentleClick();
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    // If two cards are now flipped
    if (newFlipped.length === 2) {
      setAttempts(prev => prev + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.id === secondCard.id) {
        // MATCH SUCCESS!
        soundManager.playSoftChime();
        const newMatched = [...matchedPairs, firstCard.id];
        setMatchedPairs(newMatched);
        setFlippedCards([]);
        setUnsuccessfulStreak(0);
        setFeedbackMsg(`Shabash! You found the ${firstCard.name}! 🌟`);

        // Check Victory
        if (newMatched.length === pairCount) {
          const totalSeconds = Math.round((Date.now() - (startTime || Date.now())) / 1000);
          
          // Update profile cognitive count
          setProfile(prev => ({
            ...prev,
            cognitiveSessionsCompleted: prev.cognitiveSessionsCompleted + 1
          }));

          setTimeout(() => {
            openModal('game_complete', {
              gameKey: 'memory',
              gameTitle: 'North East Heritage Memory Match',
              score: pairCount,
              maxScore: pairCount,
              timeSeconds: totalSeconds,
              attempts: attempts + 1,
              encouragement: `Shabash! You remembered all ${pairCount} pairs today.`
            });
          }, 600);
        }
      } else {
        // NO MATCH (GENTLE REASSURANCE - NO PENALTY)
        setFeedbackMsg("Good try! Take another look. 😊");
        const nextStreak = unsuccessfulStreak + 1;
        setUnsuccessfulStreak(nextStreak);

        // AI Dynamic Difficulty Trigger Simulation
        if (nextStreak >= 3 && pairCount > 3 && !aiAdapted) {
          setTimeout(() => {
            setAiAdapted(true);
            setFeedbackMsg("AI Adaptation: Let's make this a little easier for you. 🌿");
            // Automatically switch from 4 pairs to 3 pairs for comfort
            setTimeout(() => {
              setPairCount(3);
            }, 1200);
          }, 800);
        } else {
          setTimeout(() => {
            setFlippedCards([]);
          }, 1200);
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-teal-100">
        <div>
          <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Game 1 • Cultural Memory Match
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1">
            🫖 North East Heritage Memory Match
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => resetGame(pairCount)}
            className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold rounded-xl text-sm border border-teal-200 flex items-center space-x-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Game</span>
          </button>
        </div>
      </div>

      {/* AI Difficulty Simulation Alert Banner */}
      {aiAdapted && (
        <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-950 text-sm font-semibold flex items-center space-x-3 animate-fadeIn">
          <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <strong className="block text-amber-900 text-base font-extrabold">AI Difficulty Adjustment</strong>
            You took a little longer today, so SmritiSetu gently reduced the card count to keep it comfortable.
          </div>
        </div>
      )}

      {/* Reassurance Feedback Ribbon */}
      <div className="bg-teal-50/90 rounded-2xl p-4 text-center mb-8 border border-teal-200 shadow-inner">
        <p className="text-lg sm:text-xl font-extrabold text-teal-900">
          {feedbackMsg}
        </p>
      </div>

      {/* Memory Match Grid (Large Touch Targets) */}
      <div className={`grid gap-4 sm:gap-6 mb-8 max-w-2xl mx-auto ${
        pairCount === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
      }`}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedPairs.includes(card.id);
          const showFace = isFlipped || isMatched;

          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              disabled={isMatched}
              aria-label={`Card ${index + 1}: ${showFace ? card.name : 'hidden'}`}
              className={`h-32 sm:h-36 rounded-2xl font-extrabold text-center flex flex-col items-center justify-center p-3 transition-all transform active:scale-95 shadow-md border-3 ${
                showFace
                  ? `${card.bg} border-teal-400 scale-100`
                  : 'bg-gradient-to-br from-teal-800 to-teal-900 border-teal-700 text-white hover:from-teal-700 hover:to-teal-800'
              }`}
            >
              {showFace ? (
                <div className="animate-fadeIn space-y-1">
                  <span className="text-4xl sm:text-5xl block">{card.icon}</span>
                  <span className="text-xs sm:text-sm font-extrabold text-gray-900 block leading-tight">
                    {card.name}
                  </span>
                  <span className="text-[11px] font-semibold text-teal-800 block">
                    {card.nameAssamese}
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-3xl opacity-80 block">🌸</span>
                  <span className="text-xs font-bold text-teal-200 uppercase tracking-widest block">
                    Tap to Flip
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="flex items-center justify-between text-sm font-bold text-teal-900 bg-teal-50 px-5 py-3 rounded-2xl border border-teal-100">
        <span>Matched Pairs: {matchedPairs.length} / {pairCount}</span>
        <span>Turns Taken: {attempts}</span>
      </div>
    </div>
  );
};
