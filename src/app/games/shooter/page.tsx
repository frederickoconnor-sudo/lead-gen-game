'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type Bug = {
  id: number;
  x: number;
  y: number;
  code: string;
  type: string;
  points: number;
  severity: 'error' | 'warning' | 'info';
};

type Bullet = {
  id: number;
  x: number;
  y: number;
};

type LeaderboardEntry = {
  name: string;
  score: number;
  date: string;
};

export default function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shipPosition, setShipPosition] = useState(50);
  const [showForm, setShowForm] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const bugTypes: Array<{
    code: string;
    type: string;
    points: number;
    severity: 'error' | 'warning' | 'info';
  }> = [
    // Unhandled Exceptions (High severity)
    { code: 'Uncaught Error', type: 'Unhandled Exception', points: 50, severity: 'error' },
    { code: 'Promise.reject()', type: 'Unhandled Promise Rejection', points: 45, severity: 'error' },
    { code: 'throw new Error()', type: 'Unhandled Exception', points: 50, severity: 'error' },
    
    // Performance Issues (Medium-High severity)
    { code: 'High Memory Usage', type: 'Performance Issue', points: 40, severity: 'warning' },
    { code: 'Slow Network Request', type: 'Network Performance', points: 35, severity: 'warning' },
    { code: 'Poor Core Web Vitals', type: 'Web Performance', points: 35, severity: 'warning' },
    { code: 'Frame Drop Detected', type: 'Rendering Performance', points: 30, severity: 'warning' },
    
    // JavaScript Runtime Errors (Medium severity)
    { code: 'TypeError: Cannot read property', type: 'Runtime Error', points: 25, severity: 'warning' },
    { code: 'ReferenceError: not defined', type: 'Runtime Error', points: 25, severity: 'warning' },
    { code: 'Cross-domain script error', type: 'Script Error', points: 20, severity: 'info' },
    
    // Browser/System Issues (Lower severity)
    { code: 'Console Warning', type: 'Console Log', points: 15, severity: 'info' },
    { code: 'Navigation Error', type: 'Browser Issue', points: 15, severity: 'info' },
    { code: 'Resource Load Failed', type: 'Network Error', points: 20, severity: 'info' }
  ];

  const spawnBug = useCallback(() => {
    const bugType = bugTypes[Math.floor(Math.random() * bugTypes.length)];
    const newBug = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: 0,
      ...bugType
    };
    setBugs(prev => [...prev, newBug]);
  }, []);

  const shoot = useCallback(() => {
    const newBullet = {
      id: Date.now() + Math.random(),
      x: shipPosition,
      y: 90
    };
    setBullets(prev => [...prev, newBullet]);
  }, [shipPosition]);

  // Load leaderboard from localStorage on component mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('bugsnag-shooter-leaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Save score to leaderboard
  const saveToLeaderboard = (name: string, finalScore: number) => {
    const newEntry: LeaderboardEntry = {
      name: name.trim() || 'Anonymous',
      score: finalScore,
      date: new Date().toLocaleDateString()
    };
    
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep top 10
    
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('bugsnag-shooter-leaderboard', JSON.stringify(updatedLeaderboard));
    setShowLeaderboard(true);
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
        })).filter(bug => bug.y < 95));
      }, 100);
      return () => clearInterval(mover);
    }
  }, [gameStarted, gameOver]);

  // Bullet movement
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const bulletMover = setInterval(() => {
        setBullets(prev => prev.map(bullet => ({
          ...bullet,
          y: bullet.y - 4
        })).filter(bullet => bullet.y > 0));
      }, 50);
      return () => clearInterval(bulletMover);
    }
  }, [gameStarted, gameOver]);

  // Collision detection
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const collisionChecker = setInterval(() => {
        setBullets(prevBullets => {
          const survivingBullets: Bullet[] = [];
          
          prevBullets.forEach(bullet => {
            let bulletHit = false;
            
            setBugs(prevBugs => {
              const survivingBugs: Bug[] = [];
              
              prevBugs.forEach(bug => {
                const distance = Math.abs(bullet.x - bug.x) + Math.abs(bullet.y - bug.y);
                
                if (!bulletHit && distance < 12) {
                  setScore(prev => prev + bug.points);
                  bulletHit = true;
                } else {
                  survivingBugs.push(bug);
                }
              });
              
              return survivingBugs;
            });
            
            if (!bulletHit) {
              survivingBullets.push(bullet);
            }
          });
          
          return survivingBullets;
        });
      }, 50);
      return () => clearInterval(collisionChecker);
    }
  }, [gameStarted, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        setShipPosition(prev => Math.max(5, prev - 3));
      } else if (e.key === 'ArrowRight') {
        setShipPosition(prev => Math.min(95, prev + 3));
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        shoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, shipPosition]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setBugs([]);
    setBullets([]);
    setShipPosition(50);
    setShowForm(false);
    setShowLeaderboard(false);
    setPlayerName('');
  };

  // Retro arcade styling
  const gameAreaStyle = {
    width: '100%',
    height: '500px',
    backgroundColor: '#0a0a0a',
    border: '4px solid #00ff41',
    borderRadius: '0px',
    position: 'relative' as const,
    margin: '20px auto',
    boxShadow: '0 0 20px #00ff41, inset 0 0 20px rgba(0, 255, 65, 0.1)',
    background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)'
  };

  const shipStyle = {
    position: 'absolute' as const,
    bottom: '20px',
    left: `${shipPosition}%`,
    transform: 'translateX(-50%)',
    fontSize: '40px',
    zIndex: 100,
    filter: 'drop-shadow(0 0 8px #00ff41)',
    transition: 'left 0.1s ease-out'
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#000',
    color: '#00ff41',
    padding: '20px',
    fontFamily: 'Monaco, Consolas, monospace',
    background: 'radial-gradient(circle at center, #1a1a2e 0%, #000 70%)'
  };

  const startScreenStyle = {
    maxWidth: '700px',
    margin: '50px auto',
    backgroundColor: '#000',
    border: '4px solid #00ff41',
    borderRadius: '0px',
    padding: '40px',
    textAlign: 'center' as const,
    boxShadow: '0 0 30px #00ff41, inset 0 0 30px rgba(0, 255, 65, 0.1)',
    background: 'linear-gradient(45deg, #000428 0%, #004e92 50%, #000428 100%)'
  };

  const buttonStyle = {
    backgroundColor: '#00ff41',
    color: '#000',
    border: '2px solid #00ff41',
    padding: '15px 30px',
    fontSize: '20px',
    borderRadius: '0px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontFamily: 'Monaco, Consolas, monospace',
    textTransform: 'uppercase' as const,
    boxShadow: '0 0 15px #00ff41',
    transition: 'all 0.2s ease'
  };


  return (
    <div style={pageStyle}>
      {!gameStarted ? (
        <div style={startScreenStyle}>
          <h1 style={{ fontSize: '42px', color: '#00ff41', marginBottom: '10px', textShadow: '0 0 10px #00ff41', letterSpacing: '3px' }}>
            ⚡ BUGSNAG SHOOTER ⚡
          </h1>
          <h2 style={{ fontSize: '24px', color: '#ff6b35', marginBottom: '30px', textShadow: '0 0 8px #ff6b35' }}>
            RETRO ARCADE CODE BLASTER
          </h2>
          <div style={{ 
            backgroundColor: 'rgba(0, 255, 65, 0.1)', 
            border: '2px solid #00ff41', 
            padding: '20px', 
            marginBottom: '30px',
            fontFamily: 'Monaco, Consolas, monospace'
          }}>
            <p style={{ fontSize: '16px', color: '#00ff41', marginBottom: '15px', lineHeight: '1.6' }}>
              🚀 Use ← → arrow keys to move your ship<br />
              🔫 Press SPACEBAR to shoot laser bullets<br />
              🐛 Destroy JavaScript bugs to score points!
            </p>
          </div>
          <button onClick={startGame} style={buttonStyle}>
            INSERT COIN
          </button>
        </div>
      ) : gameOver ? (
        <div style={startScreenStyle}>
          {!showLeaderboard ? (
            <>
              <h1 style={{ fontSize: '42px', color: '#ff6b35', marginBottom: '20px', textShadow: '0 0 15px #ff6b35', letterSpacing: '2px' }}>
                ⚡ GAME OVER ⚡
              </h1>
              <p style={{ fontSize: '64px', color: '#00ff41', marginBottom: '20px', textShadow: '0 0 20px #00ff41', fontFamily: 'Monaco, Consolas, monospace' }}>
                {score}
              </p>
              <p style={{ fontSize: '20px', color: '#00ff41', marginBottom: '30px', letterSpacing: '1px' }}>
                FINAL SCORE
              </p>
              
              {/* Name input for leaderboard */}
              <div style={{ 
                backgroundColor: 'rgba(0, 255, 65, 0.1)', 
                border: '2px solid #00ff41', 
                padding: '20px', 
                marginBottom: '20px',
                fontFamily: 'Monaco, Consolas, monospace'
              }}>
                <p style={{ fontSize: '16px', color: '#00ff41', marginBottom: '15px' }}>
                  🏆 ENTER YOUR NAME FOR LEADERBOARD:
                </p>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && playerName.trim()) {
                      saveToLeaderboard(playerName, score);
                    }
                  }}
                  placeholder="Your Name"
                  maxLength={20}
                  style={{ 
                    width: '200px',
                    padding: '10px', 
                    border: '2px solid #00ff41', 
                    borderRadius: '4px', 
                    backgroundColor: '#000', 
                    color: '#00ff41',
                    fontFamily: 'Monaco, Consolas, monospace',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                />
                <br />
                <button
                  onClick={() => saveToLeaderboard(playerName, score)}
                  style={{ 
                    ...buttonStyle, 
                    backgroundColor: '#00ff41', 
                    marginTop: '15px',
                    fontSize: '16px'
                  }}
                >
                  🏆 ADD TO LEADERBOARD 🏆
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '36px', color: '#00ff41', marginBottom: '20px', textShadow: '0 0 15px #00ff41', letterSpacing: '2px' }}>
                🏆 LEADERBOARD 🏆
              </h1>
              <div style={{
                backgroundColor: '#000',
                border: '2px solid #00ff41',
                padding: '20px',
                marginBottom: '20px',
                maxHeight: '300px',
                overflowY: 'auto',
                fontFamily: 'Monaco, Consolas, monospace'
              }}>
                {leaderboard.length > 0 ? (
                  <div>
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          marginBottom: '8px',
                          backgroundColor: index < 3 ? 'rgba(255, 215, 0, 0.1)' : 'rgba(0, 255, 65, 0.05)',
                          border: `1px solid ${index < 3 ? '#ffd700' : '#00ff41'}`,
                          borderRadius: '4px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ color: index < 3 ? '#ffd700' : '#00ff41', fontWeight: 'bold', minWidth: '20px' }}>
                            #{index + 1}
                          </span>
                          <span style={{ color: '#fff', fontSize: '14px' }}>
                            {entry.name}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '16px' }}>
                            {entry.score}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                            {entry.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#00ff41', textAlign: 'center', fontSize: '16px' }}>
                    No scores yet! Be the first to play.
                  </p>
                )}
              </div>
            </>
          )}
          
          {score >= 80 ? (
            <>
              <div style={{ backgroundColor: '#065f46', border: '2px solid #10b981', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                <p style={{ color: '#10b981', fontSize: '20px', fontWeight: 'bold' }}>
                  🏆 YOU QUALIFIED FOR SMARTBEAR SWAG! 🏆
                </p>
              </div>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  style={{ ...buttonStyle, backgroundColor: '#10b981', marginBottom: '20px' }}
                >
                  🎁 CLAIM YOUR SWAG 🎁
                </button>
              ) : (
                <div style={{ backgroundColor: '#000', padding: '20px', borderRadius: '8px', border: '2px solid #00ffff', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', color: '#00ffff', marginBottom: '20px' }}>
                    ENTER YOUR DETAILS:
                  </h3>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', color: '#10b981', marginBottom: '5px', fontWeight: 'bold' }}>NAME:</label>
                      <input
                        type="text"
                        style={{ width: '100%', padding: '10px', border: '2px solid #00ffff', borderRadius: '4px', backgroundColor: '#000', color: '#00ffff' }}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#10b981', marginBottom: '5px', fontWeight: 'bold' }}>EMAIL:</label>
                      <input
                        type="email"
                        style={{ width: '100%', padding: '10px', border: '2px solid #00ffff', borderRadius: '4px', backgroundColor: '#000', color: '#00ffff' }}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#10b981', marginBottom: '5px', fontWeight: 'bold' }}>COMPANY:</label>
                      <input
                        type="text"
                        style={{ width: '100%', padding: '10px', border: '2px solid #00ffff', borderRadius: '4px', backgroundColor: '#000', color: '#00ffff' }}
                        placeholder="Your company"
                      />
                    </div>
                    <button
                      type="submit"
                      style={{ ...buttonStyle, backgroundColor: '#00ffff', width: '100%' }}
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div style={{ backgroundColor: '#92400e', border: '2px solid #eab308', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
              <p style={{ color: '#eab308', fontWeight: 'bold' }}>
                ⚠ NEED 80+ POINTS TO QUALIFY ⚠
              </p>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {showLeaderboard && (
              <button 
                onClick={() => setShowLeaderboard(false)} 
                style={{ ...buttonStyle, backgroundColor: '#6b7280' }}
              >
                ← BACK TO SCORE
              </button>
            )}
            <button onClick={startGame} style={{ ...buttonStyle, backgroundColor: '#3b82f6' }}>
              🚀 PLAY AGAIN
            </button>
            {!showLeaderboard && leaderboard.length > 0 && (
              <button 
                onClick={() => setShowLeaderboard(true)} 
                style={{ ...buttonStyle, backgroundColor: '#ffd700', color: '#000' }}
              >
                🏆 VIEW LEADERBOARD
              </button>
            )}
            <Link href="/games" style={{ ...buttonStyle, backgroundColor: '#6b7280', textDecoration: 'none', display: 'inline-block' }}>
              🎮 BACK TO GAMES
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Retro HUD */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              backgroundColor: '#000', 
              border: '2px solid #00ff41', 
              padding: '10px 20px',
              fontFamily: 'Monaco, Consolas, monospace',
              boxShadow: '0 0 10px #00ff41'
            }}>
              <span style={{ color: '#00ff41', fontWeight: 'bold' }}>SCORE: </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35', textShadow: '0 0 8px #ff6b35' }}>{score}</span>
            </div>
            <div style={{ 
              backgroundColor: '#000', 
              border: '2px solid #ff6b35', 
              padding: '10px 20px',
              fontFamily: 'Monaco, Consolas, monospace',
              boxShadow: '0 0 10px #ff6b35'
            }}>
              <span style={{ color: '#00ff41', fontWeight: 'bold' }}>TIME: </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35', textShadow: '0 0 8px #ff6b35' }}>{timeLeft}s</span>
            </div>
          </div>

          {/* Retro Game Arena */}
          <div style={gameAreaStyle}>
            
            {/* SPACESHIP */}
            <div style={shipStyle}>
              🚀
            </div>

            {/* LASER BULLETS */}
            {bullets.map(bullet => (
              <div
                key={bullet.id}
                style={{
                  position: 'absolute',
                  left: `${bullet.x}%`,
                  top: `${bullet.y}%`,
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: '15px',
                  backgroundColor: '#00ff41',
                  boxShadow: '0 0 8px #00ff41',
                  zIndex: 75
                }}
              />
            ))}

            {/* CODE BUGS */}
            {bugs.map(bug => {
              const severityStyles = {
                error: {
                  backgroundColor: '#ff1744',
                  borderColor: '#ff6b35',
                  boxShadow: '0 0 15px #ff1744',
                  icon: '🔥'
                },
                warning: {
                  backgroundColor: '#ff9800',
                  borderColor: '#ffab00',
                  boxShadow: '0 0 12px #ff9800',
                  icon: '⚠️'
                },
                info: {
                  backgroundColor: '#2196f3',
                  borderColor: '#03a9f4',
                  boxShadow: '0 0 10px #2196f3',
                  icon: 'ℹ️'
                }
              };
              
              const style = severityStyles[bug.severity];
              
              return (
                <div
                  key={bug.id}
                  style={{
                    position: 'absolute',
                    left: `${bug.x}%`,
                    top: `${bug.y}%`,
                    transform: 'translateX(-50%)',
                    backgroundColor: style.backgroundColor,
                    color: '#fff',
                    padding: '6px 10px',
                    border: `2px solid ${style.borderColor}`,
                    minWidth: '160px',
                    textAlign: 'center',
                    fontSize: '12px',
                    zIndex: 50,
                    fontFamily: 'Monaco, Consolas, monospace',
                    boxShadow: style.boxShadow,
                    borderRadius: '4px',
                    lineHeight: '1.3'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '3px', color: '#fff', fontSize: '12px' }}>{style.icon} {bug.code}</div>
                  <div style={{ fontSize: '10px', marginBottom: '3px', color: 'rgba(255,255,255,0.9)' }}>{bug.type}</div>
                  <div style={{ color: '#00ff41', fontWeight: 'bold', textShadow: '0 0 4px #00ff41', fontSize: '11px' }}>+{bug.points}</div>
                </div>
              );
            })}

            {/* Control instructions */}
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              color: '#00ff41', 
              fontSize: '12px', 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              padding: '8px 12px',
              border: '1px solid #00ff41',
              fontFamily: 'Monaco, Consolas, monospace'
            }}>
              ← → MOVE | SPACE SHOOT
            </div>

            {/* Retro grid pattern overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none'
            }} />
                   </div>
        </>
      )}
    </div>
  );
}
