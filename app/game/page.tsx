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

  const spawnBug = useCallback(() => {
    const bugTemplate = bugTypes[Math.floor(Math.random() * bugTypes.length)];
    const points = Math.floor(Math.random() * (bugTemplate.maxPoints - bugTemplate.minPoints + 1)) + bugTemplate.minPoints;
    const difficultyMultiplier = 1 + (60 - timeLeft) / 60;
    
    const newBug: Bug = {
      id: Date.now() + Math.random(),
      type: bugTemplate.type,
      code: bugTemplate.code,
      x: Math.random() * 85 + 5,
      y: -5,
      points: points,
      speed: (0.5 + Math.random() * 0.5) * difficultyMultiplier,
    };

    setBugs(prev => [...prev, newBug]);
  }, [timeLeft, bugTypes]);

  const catchBug = (bugId: number, points: number) => {
    setScore(prev => prev + points);
    setBugs(prev => prev.filter(bug => bug.id !== bugId));
  };

  const checkCollision = useCallback((bug: Bug) => {
    const bearLeft = bearPosition - 8;
    const bearRight = bearPosition + 8;
    const bearTop = 80;
    const bearBottom = 95;
    
    return bug.x >= bearLeft && bug.x <= bearRight && bug.y >= bearTop && bug.y <= bearBottom;
  }, [bearPosition]);

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
          newPos = Math.max(10, prev - 2);
        }
        if (keysPressed.has('ArrowRight') || keysPressed.has('d') || keysPressed.has('D')) {
          newPos = Math.min(90, prev + 2);
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
  }, [gameStarted, gameOver, checkCollision]);

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
        if (bugs.length < 10) {
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
      case 'SyntaxError': return 'bg-blue-500 border-blue-300 text-white';
      case 'ReferenceError': return 'bg-green-500 border-green-300 text-white';
      case 'TypeError': return 'bg-purple-500 border-purple-300 text-white';
      default: return 'bg-gray-500 border-gray-300 text-white';
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .retro-font {
          font-family: 'Orbitron', 'Courier New', monospace !important;
        }
        
        .text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .neon-border {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
        
        .scanlines::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%);
          background-size: 100% 4px;
          pointer-events: none;
        }
      `}</style>
      
      <main className="min-h-screen bg-black text-white retro-font relative">
        <div className="scanlines"></div>
        <div className="container mx-auto px-4 py-8 min-h-screen relative z-10">
          {!gameStarted ? (
            <div className="max-w-2xl mx-auto bg-gray-900 border-4 border-cyan-400 neon-border rounded-lg p-8 text-center mt-16">
              <h1 className="text-5xl font-bold text-cyan-400 mb-6 text-glow animate-pulse">
                🐻 SMART BEAR CODE HUNT 🐻
              </h1>
              <div className="text-yellow-400 text-xl mb-6 font-bold">
                === RETRO ARCADE CHALLENGE ===
              </div>
              <p className="text-green-400 mb-8 text-lg">
                Use ← → arrow keys to move SmartBear with his bug net!<br />
                Catch falling code errors to score points!
              </p>
              <div className="mb-8 space-y-3 text-left max-w-md mx-auto bg-black p-4 rounded border border-cyan-300">
                <div className="flex justify-between text-lg">
                  <span className="text-blue-400">💾 SyntaxError:</span>
                  <span className="text-white font-bold">5-10 points</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-green-400">🔗 ReferenceError:</span>
                  <span className="text-white font-bold">15-25 points</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-purple-400">⚡ TypeError:</span>
                  <span className="text-white font-bold">30-50 points</span>
                </div>
              </div>
              <button
                onClick={startGame}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-12 rounded-lg text-2xl transition-all transform hover:scale-105 border-4 border-yellow-300 shadow-lg"
              >
                ▶ START GAME ◀
              </button>
              <div className="mt-6">
                <Link href="/" className="text-cyan-400 hover:text-cyan-300 underline text-lg">
                  ← Back to Home
                </Link>
              </div>
            </div>
          ) : gameOver ? (
            <div className="max-w-2xl mx-auto bg-gray-900 border-4 border-cyan-400 neon-border rounded-lg p-8 text-center mt-16">
              <h1 className="text-5xl font-bold text-red-400 mb-6 animate-pulse text-glow">
                GAME OVER!
              </h1>
              <p className="text-7xl font-bold text-yellow-400 mb-4 text-glow">{score}</p>
              <p className="text-cyan-400 text-2xl mb-8 font-bold">FINAL SCORE</p>
              {score >= 80 ? (
                <>
                  <div className="bg-green-900 border-4 border-green-400 p-6 mb-8 rounded-lg neon-border">
                    <p className="text-green-400 font-bold text-2xl animate-pulse text-glow">
                      🏆 VICTORY! YOU QUALIFIED FOR SMARTBEAR SWAG! 🏆
                    </p>
                  </div>
                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 border-4 border-green-300 mb-6"
                    >
                      🎁 CLAIM YOUR SWAG 🎁
                    </button>
                  ) : (
                    <div className="mb-8 text-left max-w-md mx-auto bg-black p-6 rounded border-2 border-cyan-400">
                      <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">
                        ENTER CONTACT DATA:
                      </h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-green-400 mb-2 font-bold text-lg">NAME:</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 retro-font text-lg"
                            placeholder="Enter your name..."
                          />
                        </div>
                        <div>
                          <label className="block text-green-400 mb-2 font-bold text-lg">EMAIL:</label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 retro-font text-lg"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-green-400 mb-2 font-bold text-lg">COMPANY:</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 retro-font text-lg"
                            placeholder="Your company..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 border-2 border-cyan-300 text-lg"
                        >
                          📡 TRANSMIT DATA 📡
                        </button>
                      </form>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-yellow-900 border-4 border-yellow-400 p-6 mb-8 rounded-lg">
                  <p className="text-yellow-400 font-bold text-xl">
                    ⚠ NEED 80+ POINTS TO QUALIFY ⚠
                  </p>
                  <p className="text-orange-400 text-lg mt-2">TRY AGAIN, CODER!</p>
                </div>
              )}
              <div className="space-x-4">
                <button
                  onClick={startGame}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 border-2 border-blue-300 text-lg"
                >
                  🔄 PLAY AGAIN
                </button>
                <Link href="/" className="inline-block bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 border-2 border-gray-400 text-lg">
                  🏠 MAIN MENU
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Game HUD */}
              <div className="flex justify-between items-center mb-4">
                <div className="bg-gray-900 border-2 border-cyan-400 rounded-lg px-6 py-3">
                  <span className="text-cyan-400 font-bold text-lg">SCORE: </span>
                  <span className="text-3xl font-bold text-yellow-400 text-glow">{score}</span>
                </div>
                <div className="bg-gray-900 border-2 border-red-400 rounded-lg px-6 py-3">
                  <span className="text-cyan-400 font-bold text-lg">TIME: </span>
                  <span className="text-3xl font-bold text-red-400 text-glow">{timeLeft}s</span>
                </div>
              </div>

              {/* Game Arena */}
              <div className="relative bg-gradient-to-b from-indigo-950 via-purple-950 to-black border-4 border-cyan-400 neon-border rounded-lg" style={{ height: '70vh' }}>
                {/* Starfield background */}
                <div className="absolute inset-0 opacity-40">
                  {[...Array(100)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${1 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>

                {/* Falling Bugs */}
                {bugs.map(bug => (
                  <div
                    key={bug.id}
                    className={`absolute ${getBugColor(bug.type)} px-3 py-2 rounded-lg border-2 transition-all transform hover:scale-110 cursor-pointer animate-pulse shadow-lg`}
                    style={{ 
                      left: `${bug.x}%`, 
                      top: `${bug.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20
                    }}
                    onClick={() => catchBug(bug.id, bug.points)}
                  >
                    <div className="text-xs retro-font mb-1 text-center font-bold">{bug.code}</div>
                    <div className="text-xs font-bold text-center">{bug.type}</div>
                    <div className="text-xs text-center text-yellow-300 font-bold">+{bug.points}pts</div>
                  </div>
                ))}

                {/* SmartBear Character */}
                <div
                  className="absolute bottom-4 transition-all duration-75 ease-linear z-30"
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
                <div className="absolute bottom-4 left-4 text-cyan-400 text-lg font-bold bg-black bg-opacity-70 px-3 py-2 rounded border border-cyan-300">
                  ← → ARROW KEYS TO MOVE
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}