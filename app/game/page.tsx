'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Bug {
  id: number;
  type: 'SyntaxError' | 'TypeError' | 'ReferenceError';
  code: string;
  x: number;
  y: number;
  points: number;
}

export default function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bearPosition, setBearPosition] = useState(50);

  const bugTypes = [
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'let x = ;' },
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'if (true {' },
    { type: 'ReferenceError' as const, minPoints: 15, maxPoints: 25, code: 'console.log(z)' },
    { type: 'TypeError' as const, minPoints: 30, maxPoints: 50, code: 'null.toString()' },
  ];

  const spawnBug = () => {
    const bugTemplate = bugTypes[Math.floor(Math.random() * bugTypes.length)];
    const points = Math.floor(Math.random() * (bugTemplate.maxPoints - bugTemplate.minPoints + 1)) + bugTemplate.minPoints;
    
    const newBug: Bug = {
      id: Date.now() + Math.random(),
      type: bugTemplate.type,
      code: bugTemplate.code,
      x: Math.random() * 80 + 10,
      y: 0,
      points: points,
    };

    console.log('Spawning bug:', newBug);
    setBugs(prev => [...prev, newBug]);
  };

  const catchBug = (bugId: number, points: number) => {
    console.log('Catching bug:', bugId);
    setScore(prev => prev + points);
    setBugs(prev => prev.filter(bug => bug.id !== bugId));
  };

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setBugs([]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  // Bug spawner
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawner = setInterval(() => {
        if (bugs.length < 5) {
          spawnBug();
        }
      }, 2000);
      return () => clearInterval(spawner);
    }
  }, [gameStarted, gameOver, bugs.length]);

  // Bug movement
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const mover = setInterval(() => {
        setBugs(prev => prev.map(bug => ({
          ...bug,
          y: bug.y + 2
        })).filter(bug => bug.y < 90));
      }, 100);
      return () => clearInterval(mover);
    }
  }, [gameStarted, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        setBearPosition(prev => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setBearPosition(prev => Math.min(95, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    console.log('Starting game!');
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setBugs([]);
    setShowForm(false);
    setBearPosition(50);
  };

  const getBugColor = (type: string) => {
    switch (type) {
      case 'SyntaxError': return 'bg-blue-500';
      case 'ReferenceError': return 'bg-green-500';
      case 'TypeError': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  // Debug logging
  useEffect(() => {
    console.log('Game state:', { gameStarted, gameOver, bearPosition, bugsCount: bugs.length, score, timeLeft });
  }, [gameStarted, gameOver, bearPosition, bugs.length, score, timeLeft]);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {!gameStarted ? (
        <div className="max-w-2xl mx-auto bg-gray-900 border-4 border-cyan-400 rounded-lg p-8 text-center mt-16">
          <h1 className="text-4xl font-bold text-cyan-400 mb-6">
            🐻 SMART BEAR CODE HUNT 🐻
          </h1>
          <p className="text-green-400 mb-6 text-lg">
            Use ← → arrow keys to move SmartBear!<br />
            Click bugs to catch them!
          </p>
          <div className="mb-6 space-y-2 text-left max-w-md mx-auto bg-black p-4 rounded">
            <div className="flex justify-between">
              <span className="text-blue-400">SyntaxError:</span>
              <span className="text-white">5-10 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">ReferenceError:</span>
              <span className="text-white">15-25 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-400">TypeError:</span>
              <span className="text-white">30-50 points</span>
            </div>
          </div>
          <button
            onClick={startGame}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg text-2xl"
          >
            START GAME
          </button>
          <div className="mt-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      ) : gameOver ? (
        <div className="max-w-2xl mx-auto bg-gray-900 border-4 border-cyan-400 rounded-lg p-8 text-center mt-16">
          <h1 className="text-4xl font-bold text-red-400 mb-4">GAME OVER!</h1>
          <p className="text-6xl font-bold text-yellow-400 mb-4">{score}</p>
          <p className="text-cyan-400 text-xl mb-6">FINAL SCORE</p>
          
          {score >= 80 ? (
            <>
              <div className="bg-green-900 border-2 border-green-400 p-4 mb-6 rounded">
                <p className="text-green-400 font-bold text-xl">
                  🏆 YOU QUALIFIED FOR SMARTBEAR SWAG! 🏆
                </p>
              </div>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-500 text-black font-bold py-3 px-6 rounded-lg text-lg mb-4"
                >
                  🎁 CLAIM YOUR SWAG 🎁
                </button>
              ) : (
                <div className="mb-6 text-left max-w-md mx-auto bg-black p-4 rounded border border-cyan-400">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400 text-center">
                    ENTER YOUR DETAILS:
                  </h3>
                  <form className="space-y-3">
                    <div>
                      <label className="block text-green-400 mb-1 font-bold">NAME:</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-cyan-400 rounded bg-black text-cyan-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-green-400 mb-1 font-bold">EMAIL:</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-cyan-400 rounded bg-black text-cyan-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-green-400 mb-1 font-bold">COMPANY:</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-cyan-400 rounded bg-black text-cyan-400"
                        placeholder="Your company"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-cyan-500 text-black font-bold py-2 px-4 rounded"
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="bg-yellow-900 border-2 border-yellow-400 p-4 mb-6 rounded">
              <p className="text-yellow-400 font-bold">
                ⚠ NEED 80+ POINTS TO QUALIFY ⚠
              </p>
            </div>
          )}
          
          <div className="space-x-4">
            <button
              onClick={startGame}
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded"
            >
              PLAY AGAIN
            </button>
            <Link href="/" className="inline-block bg-gray-600 text-white font-bold py-2 px-6 rounded">
              BACK TO HOME
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Game HUD */}
          <div className="flex justify-between items-center mb-4">
            <div className="bg-gray-900 border-2 border-cyan-400 rounded px-4 py-2">
              <span className="text-cyan-400 font-bold">SCORE: </span>
              <span className="text-2xl font-bold text-yellow-400">{score}</span>
            </div>
            <div className="bg-gray-900 border-2 border-red-400 rounded px-4 py-2">
              <span className="text-cyan-400 font-bold">TIME: </span>
              <span className="text-2xl font-bold text-red-400">{timeLeft}s</span>
            </div>
          </div>

          {/* Game Arena - SIMPLE VERSION */}
          <div className="relative w-full h-96 bg-blue-900 border-4 border-cyan-400 rounded mx-auto">
            
            {/* ALWAYS VISIBLE BEAR */}
            <div 
              className="absolute bottom-4 text-6xl transition-all duration-200"
              style={{ left: `${bearPosition}%`, transform: 'translateX(-50%)' }}
            >
              🐻🕸️
            </div>

            {/* ALWAYS VISIBLE BUGS */}
            {bugs.map(bug => (
              <div
                key={bug.id}
                className={`absolute ${getBugColor(bug.type)} text-white px-2 py-1 rounded border-2 border-white cursor-pointer text-sm`}
                style={{ 
                  left: `${bug.x}%`, 
                  top: `${bug.y}%`,
                  transform: 'translateX(-50%)',
                  minWidth: '100px',
                  textAlign: 'center'
                }}
                onClick={() => catchBug(bug.id, bug.points)}
              >
                <div className="font-bold">{bug.code}</div>
                <div className="text-xs">{bug.type}</div>
                <div className="text-yellow-300">+{bug.points}</div>
              </div>
            ))}

            {/* Debug info */}
            <div className="absolute top-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              Bear: {bearPosition}% | Bugs: {bugs.length}
            </div>

            <div className="absolute top-2 right-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              Use ← → arrows to move
            </div>

            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl opacity-30">
              GAME AREA
            </div>
          </div>
        </>
      )}
    </div>
  );
}