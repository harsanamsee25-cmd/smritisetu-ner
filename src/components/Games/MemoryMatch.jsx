import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMORY_MATCH_CARDS } from '../../data/mockData';
import { soundManager } from '../../utils/audio';
import { Sparkles, RotateCcw, HelpCircle, Award } from 'lucide-react';

export const MemoryMatch = () => {
  const { openModal, aiDifficulty, recordSessionAndPredict, lastPrediction, setProfile, t } = useApp();

  // Configure pairs based on ML difficulty prediction: gentle = 3, adaptive = 4, challenging = 5
  const getPairCountFromDifficulty = (diffStr) => {
    if (diffStr === 'gentle') return 3;
    if (diffStr === 'challenging') return 5;
    return 4; // adaptive default
  };

  const [pairCount, setPairCount] = useState(() => getPairCountFromDifficulty(aiDifficulty));
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [unsuccessfulStreak, setUnsuccessfulStreak] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('Select any card to begin!');
  const [startTime, setStartTime] = useState(null);

  // Re-initialize cards when ML difficulty changes
  useEffect(() => {
    const nextPairs = getPairCountFromDifficulty(aiDifficulty);
    setPairCount(nextPairs);
    resetGame(nextPairs);
  }, [aiDifficulty]);

  const resetGame = (numPairs = pairCount) => {
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
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
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
          
          // Execute ML Inference Prediction Pipeline
          const sessionMetrics = {
            gameTitle: 'North East Heritage Memory Match',
            score: pairCount,
            maxScore: pairCount,
            accuracy: Number((pairCount / nextAttempts).toFixed(2)),
            timeSeconds: totalSeconds,
            attempts: nextAttempts,
            hintsUsed: 0
          };

          const mlPrediction = recordSessionAndPredict(sessionMetrics);

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
              attempts: nextAttempts,
              prediction: mlPrediction,
              encouragement: `Shabash! You remembered all ${pairCount} pairs today.`
            });
          }, 600);
        }
      } else {
        // NO MATCH (GENTLE REASSURANCE - NO PENALTY)
        setFeedbackMsg("Good try! Take another look. 😊");
        setTimeout(() => {
          setFlippedCards([]);
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-teal-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Game 1 • Cultural Memory Match
            </span>
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              {aiDifficulty.toUpperCase()} ({pairCount} Pairs)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1">
            🫖 North East Heritage Memory Match
          </h2>
        </div>

        <button
          onClick={() => resetGame(pairCount)}
          className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold rounded-xl text-sm border border-teal-200 flex items-center space-x-1.5 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Game</span>
        </button>
      </div>

      {/* ML Prediction Badge Notification */}
      {lastPrediction && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl text-teal-950 text-sm font-semibold flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wider block">
                ML-POWERED ADAPTIVE LEVEL: <strong className="text-teal-950 uppercase">{aiDifficulty}</strong>
              </span>
              <p className="text-xs text-gray-600 mt-0.5">{lastPrediction.reason}</p>
            </div>
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-amber-300 flex-shrink-0">
            Confidence: {lastPrediction.confidence}%
          </span>
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
        pairCount <= 3 ? 'grid-cols-3' : pairCount === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-5'
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
