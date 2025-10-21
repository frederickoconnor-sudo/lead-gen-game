'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Bug {
  id: number;
  type: 'SyntaxError' | 'TypeError' | 'ReferenceError';
  code: string;
  x: number;
  y: number;
  points: number;
  speed: number;
}

export default function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bearPosition, setBearPosition] = useState(50);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  const bugTypes = [
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'let x = ;', color: 'from-blue-400 to-blue-600' },
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'if (true {', color: 'from-blue-400 to-blue-600' },
    { type: 'SyntaxError' as const, minPoints: 5, maxPoints: 10, code: 'const y = [1,2,3', color: 'from-blue-400 to-blue-600' },
    { type: 'ReferenceError' as const, minPoints: 15, maxPoints: 25, code: 'console.log(z)', color: 'from-green-400 to-green-600' },
    { type: 'ReferenceError' as const, minPoints: 15, maxPoints: 25, code: 'foo.bar()', color: 'from-green-400 to-green-600' },
    { type: 'ReferenceError' as const, minPoints: 15, maxPoints: 25, code: 'myVar = 5', color: 'from-green-400 to-green-600' },
    { type: 'TypeError' as const, minPoints: 30, maxPoints: 50, code: 'null.toString()', color: 'from-purple-400 to-purple-600' },
    { type: 'TypeError' as const, minPoints: 30, maxPoints: 50, code: 'num.toUpperCase()', color: 'from-purple-400 to-purple-600' },
    { type: 'TypeError' as const, minPoints: 30, maxPoints: 50, code: 'obj.map()', color: 'from-purple-400 to-purple-600' },
  ];

  const spawnBug = useCallback(() => {
    const bugTemplate = bugTypes[Math.floor(Math.random() * bugTypes.length)];
    const points = Math.floor(Math.random() * (bugTemplate.maxPoints - bugTemplate.minPoints + 1)) + bugTemplate.minPoints;
    const difficultyMultiplier = 1 + (60 - timeLeft) / 60;
    
    const newBug: Bug = {
      id: Date.now() + Math.random(),
      type: bugTemplate.type,
      code: bugTemplate.code,
      x: Math.random() * 90 + 5,
      y: -5,
      points: points,
      speed: (0.5 + Math.random() * 0.5) * difficultyMultiplier,
    };

    setBugs(prev => [...prev, newBug]);
  }, [timeLeft]);

  const catchBug = (bugId: number, points: number) => {
    setScore(prev => prev + points);
    setBugs(prev => prev.filter(bug => bug.id !== bugId));
    
    // Add catch effect sound simulation
    const audio = new Audio();
    audio.play().catch(() => {}); // Silent fail for sound
  };

  const checkCollision = (bug: Bug) => {
    const bearLeft = bearPosition - 8;
    const bearRight = bearPosition + 8;
    const bearTop = 85;
    const bearBottom = 95;
    
    return bug.x >= bearLeft && bug.x <= bearRight && bug.y >= bearTop && bug.y <= bearBottom;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed(prev => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Bear movement
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveInterval = setInterval(() => {
      setBearPosition(prev => {
        let newPos = prev;
        if (keysPressed.has('ArrowLeft') || keysPressed.has('a') || keysPressed.has('A')) {
          newPos = Math.max(8, prev - 2);
        }
        if (keysPressed.has('ArrowRight') || keysPressed.has('d') || keysPressed.has('D')) {
          newPos = Math.min(92, prev + 2);
        }
        return newPos;
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [gameStarted, gameOver, keysPressed]);

  // Bug physics and collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const physicsInterval = setInterval(() => {
      setBugs(prevBugs => {
        const updatedBugs = prevBugs.map(bug => ({
          ...bug,
          y: bug.y + bug.speed
        })).filter(bug => bug.y < 100);

        // Check collisions
        updatedBugs.forEach(bug => {
          if (checkCollision(bug)) {
            catchBug(bug.id, bug.points);
          }
        });

        return updatedBugs.filter(bug => !checkCollision(bug));
      });
    }, 16);

    return () => clearInterval(physicsInterval);
  }, [gameStarted, gameOver, bearPosition]);

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
      const spawnRate = Math.max(800, 2000 - (60 - timeLeft) * 20);
      const spawner = setInterval(() => {
        if (bugs.length < 12) {
          spawnBug();
        }
      }, spawnRate);

      return () => clearInterval(spawner);
    }
  }, [gameStarted, gameOver, bugs.length, timeLeft, spawnBug]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setBugs([]);
    setShowForm(false);
    setBearPosition(50);
    setKeysPressed(new Set());
  };

  const getBugColor = (type: string) => {
    switch (type) {
      case 'SyntaxError': return 'from-blue-400 to-blue-600';
      case 'ReferenceError': return 'from-green-400 to-green-600';
      case 'TypeError': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono overflow-hidden">
      <div className="container mx-auto px-4 py-8 h-screen">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black border-4 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/50 p-8 text-center">
            <h1 className="text-4xl font-bold text-cyan-400 mb-4 text-shadow-glow animate-pulse">
              🐻 SMART BEAR CODE HUNT 🐻
            </h1>
            <div className="text-yellow-400 text-lg mb-6">
              === RETRO ARCADE CHALLENGE ===
            </div>
            <p className="text-green-400 mb-6 text-lg">
              Use ← → arrow keys to move SmartBear with his bug net!<br />
              Catch falling code errors to score points!
            </p>
            <div className="mb-6 space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-blue-400">💾 SyntaxError:</span>
                <span className="text-white">5-10 points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-400">🔗 ReferenceError:</span>
                <span className="text-white">15-25 points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">⚡ TypeError:</span>
                <span className="text-white">30-50 points</span>
              </div>
            </div>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-8 rounded-lg text-xl transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 border-2 border-yellow-300"
            >
              ▶ START GAME ◀
            </button>
            <div className="mt-4">
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        ) : gameOver ? (
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black border-4 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/50 p-8 text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-4 animate-pulse">
              GAME OVER!
            </h1>
            <p className="text-6xl font-bold text-yellow-400 mb-4 text-shadow-glow">{score}</p>
            <p className="text-cyan-400 text-xl mb-6">FINAL SCORE</p>
            {score >= 80 ? (
              <>
                <div className="bg-gradient-to-r from-green-900 to-emerald-900 border-2 border-green-400 p-4 mb-6 rounded-lg">
                  <p className="text-green-400 font-bold text-xl animate-pulse">
                    🏆 VICTORY! YOU QUALIFIED FOR SMARTBEAR SWAG! 🏆
                  </p>
                </div>
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold py-3 px-8 rounded-lg text-xl transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 border-2 border-green-300 mb-4"
                  >
                    🎁 CLAIM YOUR SWAG 🎁
                  </button>
                ) : (
                  <div className="mb-6 text-left max-w-md mx-auto">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">
                      ENTER CONTACT DATA:
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-green-400 mb-2 font-bold">NAME:</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 font-mono"
                          placeholder="Enter your name..."
                        />
                      </div>
                      <div>
                        <label className="block text-green-400 mb-2 font-bold">EMAIL:</label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 font-mono"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-green-400 mb-2 font-bold">COMPANY:</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 font-mono"
                          placeholder="Your company..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50 border-2 border-cyan-300"
                      >
                        📡 TRANSMIT DATA 📡
                      </button>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gradient-to-r from-yellow-900 to-orange-900 border-2 border-yellow-400 p-4 mb-6 rounded-lg">
                <p className="text-yellow-400 font-bold">
                  ⚠ NEED 80+ POINTS TO QUALIFY ⚠
                </p>
                <p className="text-orange-400">TRY AGAIN, CODER!</p>
              </div>
            )}
            <div className="space-x-4">
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50 border-2 border-blue-300"
              >
                🔄 PLAY AGAIN
              </button>
              <Link href="/" className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-gray-400/50 border-2 border-gray-500">
                🏠 MAIN MENU
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Game HUD */}
            <div className="flex justify-between items-center mb-4">
              <div className="bg-gradient-to-r from-gray-900 to-black border-2 border-cyan-400 rounded-lg shadow px-6 py-3">
                <span className="text-cyan-400 font-bold">SCORE: </span>
                <span className="text-2xl font-bold text-yellow-400">{score}</span>
              </div>
              <div className="bg-gradient-to-r from-gray-900 to-black border-2 border-red-400 rounded-lg shadow px-6 py-3">
                <span className="text-cyan-400 font-bold">TIME: </span>
                <span className="text-2xl font-bold text-red-400">{timeLeft}s</span>
              </div>
            </div>

            {/* Game Arena */}
            <div className="relative bg-gradient-to-b from-indigo-950 via-purple-950 to-black border-4 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/30" style={{ height: '70vh' }}>
              {/* Starfield background */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* Falling Bugs */}
              {bugs.map(bug => (
                <div
                  key={bug.id}
                  className={`absolute bg-gradient-to-br ${getBugColor(bug.type)} text-white px-3 py-2 rounded-lg shadow-lg border-2 border-white/50 transition-all transform hover:scale-110 cursor-pointer animate-pulse`}
                  style={{ 
                    left: `${bug.x}%`, 
                    top: `${bug.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => catchBug(bug.id, bug.points)}
                >
                  <div className="text-xs font-mono mb-1 text-center">{bug.code}</div>
                  <div className="text-xs font-bold text-center">{bug.type}</div>
                  <div className="text-xs text-center text-yellow-300">+{bug.points}pts</div>
                </div>
              ))}

              {/* SmartBear Character */}
              <div
                className="absolute bottom-4 transition-all duration-75 ease-linear"
                style={{ 
                  left: `${bearPosition}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="text-6xl filter drop-shadow-lg animate-bounce">
                  🐻
                </div>
                <div className="text-4xl absolute -top-2 -right-2 animate-pulse">
                  🕸️
                </div>
              </div>

              {/* Controls reminder */}
              <div className="absolute bottom-4 left-4 text-cyan-400 text-sm">
                ← → ARROW KEYS TO MOVE
              </div>
            </div>
          </>
        )}
      </div>

      {/* Retro styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .font-mono {
          font-family: 'Orbitron', 'Courier New', monospace;
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
        
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .animate-matrix {
          animation: matrix-rain 3s linear infinite;
        }
        
        body {
          background: linear-gradient(45deg, #000000, #1a1a2e, #16213e);
          overflow-x: hidden;
        }
        
        /* Scanlines effect */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            transparent 50%, 
            rgba(0, 255, 255, 0.03) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 1000;
        }
        
        /* CRT screen curve effect */
        .container {
          filter: contrast(1.1) brightness(1.1);
        }
      `}</style>
    </main>
  );
}