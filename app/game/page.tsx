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

  const bugTypes = [
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'let x = ;' },
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'if (true {' },
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'const y = [1,2,3' },
    { type: 'ReferenceError' as const, minPoints: 15, maxPoints: 25, code: 'console.log(z)' },
    { type: 'ReferenceError' as const, minPoints: 15, maxPoints: 25, code: 'foo.bar()' },
    { type: 'ReferenceError' as const, minPoints: 15, maxPoints: 25, code: 'myVar = 5' },
    { type: 'TypeError' as const, minPoints: 30, maxPoints: 50, code: 'null.toString()' },
    { type: 'TypeError' as const, minPoints: 30, maxPoints: 50, code: 'num.toUpperCase()' },
    { type: 'TypeError' as const, minPoints: 30, maxPoints: 50, code: 'obj.map()' },
  ];

  const spawnBug = () => {
    const bugTemplate = bugTypes[Math.floor(Math.random() * bugTypes.length)];
    const points = Math.floor(Math.random() * (bugTemplate.maxPoints - bugTemplate.minPoints + 1)) + bugTemplate.minPoints;
    
    const newBug: Bug = {
      id: Date.now() + Math.random(),
      type: bugTemplate.type,
      code: bugTemplate.code,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
      points: points,
    };

    setBugs(prev => [...prev, newBug]);
  };

  const catchBug = (bugId: number, points: number) => {
    setScore(prev => prev + points);
    setBugs(prev => prev.filter(bug => bug.id !== bugId));
  };

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

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawner = setInterval(() => {
        if (bugs.length < 8) {
          spawnBug();
        }
      }, 2000);

      return () => clearInterval(spawner);
    }
  }, [gameStarted, gameOver, bugs.length]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setBugs([]);
    setShowForm(false);
    spawnBug();
  };

  const getBugColor = (type: string) => {
    switch (type) {
      case 'SyntaxError': return 'bg-blue-500 hover:bg-blue-600';
      case 'ReferenceError': return 'bg-green-500 hover:bg-green-600';
      case 'TypeError': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Hunt Bugs?
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Click on bugs to catch them. Different error types are worth different points!
            </p>
            <div className="mb-6 space-y-2">
              <p className="text-blue-600 dark:text-blue-400">🐛 SyntaxError: 5-10 points</p>
              <p className="text-green-600 dark:text-green-400">🐛 ReferenceError: 15-25 points</p>
              <p className="text-purple-600 dark:text-purple-400">🐛 TypeError: 30-50 points</p>
            </div>
            <button
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Start Game
            </button>
            <div className="mt-4">
              <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        ) : gameOver ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Game Over!
            </h1>
            <p className="text-5xl font-bold text-indigo-600 mb-4">{score} Points</p>
            {score >= 80 ? (
              <>
                <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 mb-6">
                  <p className="text-green-800 dark:text-green-200 font-semibold text-lg">
                    🎉 Congratulations! You qualified for SmartBear swag!
                  </p>
                </div>
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors mb-4"
                  >
                    Claim Your Swag
                  </button>
                ) : (
                  <div className="mb-6 text-left">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Enter Your Details
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Company</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Your company"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-yellow-800 dark:text-yellow-200">
                  You need 80+ points to qualify. Try again!
                </p>
              </div>
            )}
            <div className="space-x-4">
              <button
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Play Again
              </button>
              <Link href="/" className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-3">
                <span className="text-gray-700 dark:text-gray-300">Score: </span>
                <span className="text-2xl font-bold text-indigo-600">{score}</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-3">
                <span className="text-gray-700 dark:text-gray-300">Time: </span>
                <span className="text-2xl font-bold text-red-600">{timeLeft}s</span>
              </div>
            </div>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg" style={{ height: '70vh' }}>
              {bugs.map(bug => (
                <button
                  key={bug.id}
                  onClick={() => catchBug(bug.id, bug.points)}
                  className={`absolute ${getBugColor(bug.type)} text-white px-4 py-2 rounded-lg shadow-lg transition-all transform hover:scale-110 cursor-pointer`}
                  style={{ 
                    left: `${bug.x}%`, 
                    top: `${bug.y}%`,
                    animation: 'float 2s ease-in-out infinite'
                  }}
                >
                  <div className="text-xs font-mono mb-1">{bug.code}</div>
                  <div className="text-xs font-semibold">{bug.type}</div>
                  <div className="text-xs">+{bug.points}pts</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}