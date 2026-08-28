'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type GameItem = {
  id: number;
  x: number;
  y: number;
  type: 'good' | 'bad';
  name: string;
  points: number;
  lane: number;
};

type LeaderboardEntry = {
  name: string;
  score: number;
  time: number;
  date: string;
};

export default function DebugRunner() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [health, setHealth] = useState(3);
  const [speed, setSpeed] = useState(2);
  
  // Player state - lane-based movement
  const [playerLane, setPlayerLane] = useState(1); // 0, 1, 2 (left, center, right)
  
  // Game objects
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  
  // UI state
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');

  // Game constants
  const LANES = [20, 50, 80]; // Three lanes at 20%, 50%, 80% from left

  // Game items
  const itemTypes = {
    good: [
      { name: '✅ Bug Fixed', points: 25 },
      { name: '📊 Monitor Added', points: 20 },
      { name: '🔍 Debug Tool', points: 30 },
      { name: '⚡ Performance Boost', points: 35 },
      { name: '🛡️ Error Handler', points: 25 },
      { name: '📈 Analytics Setup', points: 20 }
    ],
    bad: [
      { name: '💥 System Crash', points: -15 },
      { name: '⚠️ Memory Leak', points: -10 },
      { name: '🚫 Null Reference', points: -15 },
      { name: '🐌 Timeout Error', points: -10 },
      { name: '💔 Connection Lost', points: -12 },
      { name: '🔥 Exception Thrown', points: -15 }
    ]
  };

  // Load leaderboard
  useEffect(() => {
    const saved = localStorage.getItem('debug-runner-v2-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  // Save to leaderboard
  const saveToLeaderboard = useCallback((name: string, finalScore: number, timeSpent: number) => {
    const newEntry: LeaderboardEntry = {
      name: name.trim() || 'Anonymous',
      score: finalScore,
      time: timeSpent,
      date: new Date().toLocaleDateString()
    };
    
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setLeaderboard(updated);
    localStorage.setItem('debug-runner-v2-leaderboard', JSON.stringify(updated));
    setShowLeaderboard(true);
  }, [leaderboard]);

  // Spawn game items
  const spawnGameItem = useCallback(() => {
    const isGood = Math.random() < 0.7; // 70% chance of good items
    const itemArray = isGood ? itemTypes.good : itemTypes.bad;
    const item = itemArray[Math.floor(Math.random() * itemArray.length)];
    const randomLane = Math.floor(Math.random() * 3);
    
    const gameItem: GameItem = {
      id: Date.now() + Math.random(),
      x: LANES[randomLane],
      y: 0,
      type: isGood ? 'good' : 'bad',
      name: item.name,
      points: item.points,
      lane: randomLane
    };
    
    setGameItems(prev => [...prev, gameItem]);
  }, []);

  // Handle item click
  const handleItemClick = (item: GameItem) => {
    if (item.type === 'good') {
      setScore(prev => prev + item.points);
    } else {
      setScore(prev => Math.max(0, prev + item.points));
      setHealth(prev => Math.max(0, prev - 1));
    }
    
    // Remove the clicked item
    setGameItems(prev => prev.filter(i => i.id !== item.id));
  };

  // Player movement
  const movePlayer = useCallback((direction: 'left' | 'right') => {
    if (!gameStarted || gameOver) return;
    
    setPlayerLane(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(2, prev + 1);
      }
    });
  }, [gameStarted, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        movePlayer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        movePlayer('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, timeLeft]);

  // Check for game over
  useEffect(() => {
    if (health <= 0) {
      setGameOver(true);
    }
  }, [health]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move items down
      setGameItems(prev => prev.map(item => ({
        ...item,
        y: item.y + speed
      })).filter(item => item.y < 100)); // Remove items that went off screen

      // Gradually increase speed
      setSpeed(prev => Math.min(prev + 0.002, 5));

      // Spawn new items
      if (Math.random() < 0.03) {
        spawnGameItem();
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, speed, spawnGameItem]);

  // Handle missed bad items (they cause damage if they reach the bottom)
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const missedItems = gameItems.filter(item => item.y > 85 && item.type === 'bad');
    if (missedItems.length > 0) {
      setHealth(prev => Math.max(0, prev - missedItems.length));
      setGameItems(prev => prev.filter(item => !(item.y > 85 && item.type === 'bad')));
    }
  }, [gameItems, gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(120);
    setHealth(3);
    setSpeed(2);
    setPlayerLane(1);
    setGameItems([]);
    setShowLeaderboard(false);
    setPlayerName('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0c4a6e 0%, #1e40af 50%, #7c3aed 100%)',
      color: '#00ffff',
      padding: '20px',
      fontFamily: 'Monaco, Consolas, monospace'
    }}>
      {!gameStarted ? (
        <div style={{
          maxWidth: '800px',
          margin: '50px auto',
          textAlign: 'center' as const,
          background: 'rgba(0, 0, 0, 0.8)',
          border: '3px solid #00ffff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 0 30px #00ffff'
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', textShadow: '0 0 20px #00ffff' }}>
            🏃‍♂️ DEBUG RUNNER 🏃‍♂️
          </h1>
          <h2 style={{ fontSize: '24px', color: '#ffa500', marginBottom: '30px' }}>
            Lane-Based Collection Game
          </h2>
          
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            border: '2px solid #00ffff',
            padding: '25px',
            marginBottom: '30px',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '15px' }}>HOW TO PLAY:</h3>
            <div style={{ textAlign: 'left' as const, lineHeight: '1.8', fontSize: '16px' }}>
              <p><strong>🎯 GOAL:</strong> Collect good items, avoid bad ones!</p>
              <p><strong>⬅️➡️ MOVE:</strong> Use arrow keys or A/D to switch lanes</p>
              <p><strong>🖱️ COLLECT:</strong> Click on items to collect them</p>
              <p><strong>✅ GOOD ITEMS:</strong> Green items give points (20-35pts)</p>
              <p><strong>❌ BAD ITEMS:</strong> Red items remove points & health</p>
              <p><strong>❤️ HEALTH:</strong> You have 3 lives - don&apos;t lose them all!</p>
              <p><strong>⏰ TIME:</strong> Survive for 2 minutes to win!</p>
            </div>
          </div>

          <button 
            onClick={startGame}
            style={{
              background: 'linear-gradient(45deg, #00ffff, #0080ff)',
              color: '#000',
              border: 'none',
              padding: '15px 40px',
              fontSize: '24px',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '20px',
              boxShadow: '0 0 20px #00ffff'
            }}
          >
            🚀 START GAME
          </button>

          <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link href="/games" style={{ color: '#00ffff', textDecoration: 'underline' }}>
              ← Back to Games
            </Link>
            <Link href="/" style={{ color: '#00ffff', textDecoration: 'underline' }}>
              🏠 Home
            </Link>
          </div>
        </div>
      ) : gameOver ? (
        <div style={{
          maxWidth: '700px',
          margin: '50px auto',
          textAlign: 'center' as const,
          background: 'rgba(0, 0, 0, 0.9)',
          border: '3px solid #ff4444',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 0 30px #ff4444'
        }}>
          {!showLeaderboard ? (
            <>
              <h1 style={{ fontSize: '42px', color: timeLeft === 0 ? '#00ff00' : '#ff4444', marginBottom: '20px' }}>
                {timeLeft === 0 ? '🎉 TIME UP! 🎉' : '💥 GAME OVER 💥'}
              </h1>
              <div style={{ marginBottom: '30px' }}>
                <p style={{ fontSize: '32px', color: '#00ffff', marginBottom: '10px' }}>
                  SCORE: {score}
                </p>
                <p style={{ fontSize: '20px', color: '#ffa500' }}>
                  TIME SURVIVED: {Math.floor((120 - timeLeft) / 60)}:{String((120 - timeLeft) % 60).padStart(2, '0')}
                </p>
              </div>

              {score >= 80 && (
                <div style={{
                  background: 'rgba(0, 255, 0, 0.2)',
                  border: '2px solid #00ff00',
                  padding: '20px',
                  marginBottom: '20px',
                  borderRadius: '8px'
                }}>
                  <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>
                    🏆 SWAG QUALIFIED! 🏆
                  </h3>
                  <p>You scored 80+ points and qualified for Bugsnag swag!</p>
                </div>
              )}

              <div style={{
                background: 'rgba(0, 255, 255, 0.1)',
                border: '2px solid #00ffff',
                padding: '20px',
                marginBottom: '20px',
                borderRadius: '8px'
              }}>
                <h3 style={{ marginBottom: '15px' }}>🏆 ENTER LEADERBOARD:</h3>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && playerName.trim()) {
                      saveToLeaderboard(playerName, score, 120 - timeLeft);
                    }
                  }}
                  placeholder="Your Name"
                  maxLength={20}
                  style={{
                    width: '200px',
                    padding: '10px',
                    border: '2px solid #00ffff',
                    borderRadius: '4px',
                    background: '#000',
                    color: '#00ffff',
                    textAlign: 'center' as const,
                    marginBottom: '15px'
                  }}
                />
                <br />
                <button
                  onClick={() => saveToLeaderboard(playerName, score, 120 - timeLeft)}
                  style={{
                    background: '#00ffff',
                    color: '#000',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  🏆 ADD TO LEADERBOARD
                </button>
              </div>
            </>
          ) : (
            <div>
              <h1 style={{ fontSize: '36px', color: '#00ffff', marginBottom: '20px' }}>
                🏆 LEADERBOARD 🏆
              </h1>
              <div style={{
                background: '#000',
                border: '2px solid #00ffff',
                padding: '20px',
                marginBottom: '20px',
                maxHeight: '300px',
                overflowY: 'auto' as const
              }}>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                        marginBottom: '8px',
                        background: index < 3 ? 'rgba(255, 215, 0, 0.1)' : 'rgba(0, 255, 255, 0.05)',
                        border: `1px solid ${index < 3 ? '#ffd700' : '#00ffff'}`,
                        borderRadius: '4px'
                      }}
                    >
                      <div>
                        <span style={{ color: index < 3 ? '#ffd700' : '#00ffff', fontWeight: 'bold' }}>
                          #{index + 1} {entry.name}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#ffa500', marginRight: '15px' }}>
                          {entry.score}pts
                        </span>
                        <span style={{ color: '#00ff00', marginRight: '15px' }}>
                          {Math.floor(entry.time / 60)}:{String(entry.time % 60).padStart(2, '0')}
                        </span>
                        <span style={{ color: '#888', fontSize: '12px' }}>
                          {entry.date}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#00ffff', textAlign: 'center' as const }}>
                    No scores yet! Be the first to play.
                  </p>
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
            {showLeaderboard && (
              <button
                onClick={() => setShowLeaderboard(false)}
                style={{
                  background: '#666',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ← BACK TO SCORE
              </button>
            )}
            <button
              onClick={startGame}
              style={{
                background: 'linear-gradient(45deg, #00ffff, #0080ff)',
                color: '#000',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🏃‍♂️ PLAY AGAIN
            </button>
            {!showLeaderboard && leaderboard.length > 0 && (
              <button
                onClick={() => setShowLeaderboard(true)}
                style={{
                  background: '#ffd700',
                  color: '#000',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🏆 LEADERBOARD
              </button>
            )}
            <Link 
              href="/games"
              style={{
                background: '#666',
                color: '#fff',
                textDecoration: 'none',
                padding: '12px 20px',
                borderRadius: '6px',
                display: 'inline-block'
              }}
            >
              🎮 GAMES
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Game HUD */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            maxWidth: '800px',
            margin: '0 auto 20px auto'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid #00ffff',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>SCORE: </span>
              <span style={{ fontSize: '20px', color: '#ffa500' }}>{score}</span>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid #00ff00',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>HEALTH: </span>
              <span style={{ fontSize: '20px', color: '#ff4444' }}>
                {'❤️'.repeat(health)}{'🖤'.repeat(3 - health)}
              </span>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid #ffa500',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>TIME: </span>
              <span style={{ fontSize: '20px', color: '#00ff00' }}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Game Area */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            height: '500px',
            background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)',
            border: '3px solid #00ff41',
            position: 'relative' as const,
            overflow: 'hidden',
            fontFamily: 'Monaco, Consolas, monospace'
          }}>
            {/* Lane markers */}
            {LANES.map((lane, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${lane}%`,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'rgba(0, 255, 65, 0.3)',
                  transform: 'translateX(-50%)'
                }}
              />
            ))}

            {/* Player */}
            <div style={{
              position: 'absolute',
              left: `${LANES[playerLane]}%`,
              bottom: '50px',
              transform: 'translateX(-50%)',
              fontSize: '40px',
              zIndex: 100,
              transition: 'left 0.2s ease-out'
            }}>
              🏃‍♂️
            </div>

            {/* Game Items */}
            {gameItems.map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translateX(-50%)',
                  width: '120px',
                  minHeight: '60px',
                  background: item.type === 'good' ? '#22c55e' : '#ef4444',
                  border: '3px solid #fff',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'center' as const,
                  cursor: 'pointer',
                  padding: '8px',
                  boxShadow: `0 0 15px ${item.type === 'good' ? '#22c55e' : '#ef4444'}`,
                  transition: 'transform 0.1s ease-out'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateX(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateX(-50%) scale(1)';
                }}
              >
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>
                  {item.type === 'good' ? '✅' : '❌'}
                </div>
                <div style={{ fontSize: '11px', lineHeight: '1.2' }}>
                  {item.name}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  marginTop: '4px',
                  color: item.type === 'good' ? '#90EE90' : '#FFB6C1'
                }}>
                  {item.points > 0 ? '+' : ''}{item.points}pts
                </div>
              </div>
            ))}

            {/* Controls instruction */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '8px 12px',
              border: '1px solid #00ff41',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              ← → MOVE | CLICK TO COLLECT
            </div>

            {/* Speed indicator */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '5px 10px',
              border: '1px solid #ffa500',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#ffa500'
            }}>
              SPEED: {speed.toFixed(1)}x
            </div>
          </div>
        </>
      )}
    </div>
  );
}