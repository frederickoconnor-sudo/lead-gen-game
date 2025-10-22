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
  const [bearPosition, setBearPosition] = useState(400); // Pixel position instead of percentage
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  // Fixed game container dimensions
  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;

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
      x: Math.random() * (GAME_WIDTH - 100) + 50, // Pixel positioning
      y: -50, // Start above screen
      points: points,
      speed: (2 + Math.random() * 3) * difficultyMultiplier, // Pixel speed
    };

    console.log('Spawning bug:', newBug);
    setBugs(prev => {
      const newBugs = [...prev, newBug];
      console.log('Total bugs:', newBugs.length);
      return newBugs;
    });
  }, [timeLeft, GAME_WIDTH, bugTypes]);

  const catchBug = (bugId: number, points: number) => {
    console.log('Catching bug:', bugId, 'for', points, 'points');
    setScore(prev => prev + points);
    setBugs(prev => prev.filter(bug => bug.id !== bugId));
  };

  const checkCollision = useCallback((bug: Bug) => {
    const bearLeft = bearPosition - 40;
    const bearRight = bearPosition + 40;
    const bearTop = GAME_HEIGHT - 100;
    const bearBottom = GAME_HEIGHT - 20;
    
    const collision = bug.x >= bearLeft && bug.x <= bearRight && bug.y >= bearTop && bug.y <= bearBottom;
    if (collision) {
      console.log('Collision detected!', bug.id);
    }
    return collision;
  }, [bearPosition, GAME_HEIGHT]);

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
          newPos = Math.max(50, prev - 5);
        }
        if (keysPressed.has('ArrowRight') || keysPressed.has('d') || keysPressed.has('D')) {
          newPos = Math.min(GAME_WIDTH - 50, prev + 5);
        }
        if (newPos !== prev) {
          console.log('Bear position:', newPos);
        }
        return newPos;
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [gameStarted, gameOver, keysPressed, GAME_WIDTH]);

  // Bug physics and collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const physicsInterval = setInterval(() => {
      setBugs(prevBugs => {
        const updatedBugs = prevBugs.map(bug => ({
          ...bug,
          y: bug.y + bug.speed
        })).filter(bug => bug.y < GAME_HEIGHT + 50);

        // Check collisions
        updatedBugs.forEach(bug => {
          if (checkCollision(bug)) {
            catchBug(bug.id, bug.points);
          }
        });

        const finalBugs = updatedBugs.filter(bug => !checkCollision(bug));
        
        if (finalBugs.length !== prevBugs.length) {
          console.log('Bugs updated, count:', finalBugs.length);
        }
        
        return finalBugs;
      });
    }, 16);

    return () => clearInterval(physicsInterval);
  }, [gameStarted, gameOver, checkCollision, GAME_HEIGHT]);

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            console.log('Game over - time up!');
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
        if (bugs.length < 8) {
          spawnBug();
        }
      }, spawnRate);

      return () => clearInterval(spawner);
    }
  }, [gameStarted, gameOver, bugs.length, timeLeft, spawnBug]);

  const startGame = () => {
    console.log('Starting game!');
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setBugs([]);
    setShowForm(false);
    setBearPosition(GAME_WIDTH / 2);
    setKeysPressed(new Set());
  };

  useEffect(() => {
    console.log('Game state:', {
      gameStarted,
      gameOver,
      bearPosition,
      bugsCount: bugs.length,
      score,
      timeLeft
    });
  }, [gameStarted, gameOver, bearPosition, bugs.length, score, timeLeft]);

  const getBugColor = (type: string) => {
    switch (type) {
      case 'SyntaxError': return 'bg-blue-500';
      case 'ReferenceError': return 'bg-green-500';
      case 'TypeError': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto bg-gray-900 border-4 border-cyan-400 rounded-lg p-8 text-center mt-16">
            <h1 className="text-5xl font-bold text-cyan-400 mb-6 animate-pulse">
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
          <div className="max-w-2xl mx-auto bg-gray-900 border-4 border-cyan-400 rounded-lg p-8 text-center mt-16">
            <h1 className="text-5xl font-bold text-red-400 mb-6 animate-pulse">
              GAME OVER!
            </h1>
            <p className="text-7xl font-bold text-yellow-400 mb-4">{score}</p>
            <p className="text-cyan-400 text-2xl mb-8 font-bold">FINAL SCORE</p>
            {score >= 80 ? (
              <>
                <div className="bg-green-900 border-4 border-green-400 p-6 mb-8 rounded-lg">
                  <p className="text-green-400 font-bold text-2xl animate-pulse">
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
                          className="w-full px-4 py-3 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 font-mono text-lg"
                          placeholder="Enter your name..."
                        />
                      </div>
                      <div>
                        <label className="block text-green-400 mb-2 font-bold text-lg">EMAIL:</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 font-mono text-lg"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-green-400 mb-2 font-bold text-lg">COMPANY:</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-cyan-400 rounded bg-black text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 font-mono text-lg"
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
                <span className="text-3xl font-bold text-yellow-400">{score}</span>
              </div>
              <div className="bg-gray-900 border-2 border-red-400 rounded-lg px-6 py-3">
                <span className="text-cyan-400 font-bold text-lg">TIME: </span>
                <span className="text-3xl font-bold text-red-400">{timeLeft}s</span>
              </div>
            </div>

            {/* Game Arena with EXPLICIT DIMENSIONS */}
            <div 
              className="relative bg-gray-800 border-4 border-cyan-400 rounded-lg mx-auto"
              style={{ 
                width: `${GAME_WIDTH}px`, 
                height: `${GAME_HEIGHT}px`,
                background: 'linear-gradient(to bottom, #1e1b4b, #312e81, #000000)'
              }}
            >
              {/* VISIBLE BACKGROUND CONFIRMATION */}
              <div className="absolute top-4 left-4 text-cyan-400 text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                GAME ARENA ACTIVE - {GAME_WIDTH}x{GAME_HEIGHT}
              </div>

              {/* Starfield background */}
              <div className="absolute inset-0 opacity-40">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * GAME_WIDTH}px`,
                      top: `${Math.random() * GAME_HEIGHT}px`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${1 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* DEBUG: Show bugs count */}
              <div className="absolute top-4 right-4 text-yellow-400 text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                BUGS: {bugs.length}
              </div>

              {/* Falling Bugs with EXPLICIT PIXEL POSITIONING */}
              {bugs.map(bug => (
                <div
                  key={bug.id}
                  className={`absolute ${getBugColor(bug.type)} text-white px-3 py-2 rounded-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform font-mono text-xs`}
                  style={{ 
                    left: `${bug.x}px`, 
                    top: `${bug.y}px`,
                    width: '120px',
                    minHeight: '60px',
                    zIndex: 20,
                    transform: 'translate(-50%, 0)'
                  }}
                  onClick={() => catchBug(bug.id, bug.points)}
                >
                  <div className="text-center font-bold mb-1">{bug.code}</div>
                  <div className="text-center text-xs">{bug.type}</div>
                  <div className="text-center text-yellow-300 font-bold">+{bug.points}pts</div>
                </div>
              ))}

              {/* SmartBear Character with EXPLICIT PIXEL POSITIONING */}
              <div
                className="absolute transition-all duration-75 ease-linear"
                style={{ 
                  left: `${bearPosition}px`,
                  top: `${GAME_HEIGHT - 80}px`,
                  transform: 'translateX(-50%)',
                  zIndex: 30
                }}
              >
                <div className="text-6xl animate-bounce">🐻</div>
                <div className="text-4xl absolute -top-2 -right-2 animate-pulse">🕸️</div>
              </div>

              {/* DEBUG: Show bear position */}
              <div className="absolute bottom-4 left-4 text-cyan-400 text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                BEAR: {bearPosition}px | ← → KEYS TO MOVE
              </div>

              {/* Game status indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold opacity-20 pointer-events-none">
                GAME ACTIVE
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}