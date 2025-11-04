'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type Obstacle = {
  id: number;
  x: number;
  y: number;
  type: 'error' | 'warning' | 'info';
  errorType: string;
  width: number;
  height: number;
};

type PowerUp = {
  id: number;
  x: number;
  y: number;
  type: 'performance' | 'monitoring' | 'debugging';
  name: string;
  points: number;
};

type LeaderboardEntry = {
  name: string;
  score: number;
  distance: number;
  date: string;
};

export default function DebugRunner() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(3);
  
  // Player state
  const [playerY, setPlayerY] = useState(60); // % from top
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false);
  
  // Game objects
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  
  // UI state
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');

  // Game constants
  const GROUND_Y = 60; // % from top
  const JUMP_HEIGHT = 30; // pixels above ground
  const DUCK_HEIGHT = 45; // % from top when ducking

  // Error types from Bugsnag
  const errorTypes = [
    { type: 'error', name: 'Unhandled Exception', height: 40, width: 60 },
    { type: 'error', name: 'Promise Rejection', height: 35, width: 55 },
    { type: 'warning', name: 'Memory Leak', height: 30, width: 70 },
    { type: 'warning', name: 'Slow Network', height: 25, width: 80 },
    { type: 'info', name: 'Console Warning', height: 20, width: 50 },
    { type: 'info', name: 'Deprecated API', height: 15, width: 60 }
  ];

  const powerUpTypes = [
    { type: 'performance', name: 'CPU Boost', points: 50 },
    { type: 'monitoring', name: 'Error Tracker', points: 30 },
    { type: 'debugging', name: 'Stack Trace', points: 40 },
    { type: 'performance', name: 'Memory Optimizer', points: 60 },
    { type: 'monitoring', name: 'Alert System', points: 35 }
  ];

  // Load leaderboard
  useEffect(() => {
    const saved = localStorage.getItem('debug-runner-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  // Save to leaderboard
  const saveToLeaderboard = useCallback((name: string, finalScore: number, finalDistance: number) => {
    const newEntry: LeaderboardEntry = {
      name: name.trim() || 'Anonymous',
      score: finalScore,
      distance: finalDistance,
      date: new Date().toLocaleDateString()
    };
    
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setLeaderboard(updated);
    localStorage.setItem('debug-runner-leaderboard', JSON.stringify(updated));
    setShowLeaderboard(true);
  }, [leaderboard]);

  // Spawn obstacles
  const spawnObstacle = useCallback(() => {
    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    const obstacle: Obstacle = {
      id: Date.now() + Math.random(),
      x: 100, // Start from right edge
      y: GROUND_Y - errorType.height,
      type: errorType.type as 'error' | 'warning' | 'info',
      errorType: errorType.name,
      width: errorType.width,
      height: errorType.height
    };
    setObstacles(prev => [...prev, obstacle]);
  }, []);

  // Spawn power-ups
  const spawnPowerUp = useCallback(() => {
    const powerType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    const powerUp: PowerUp = {
      id: Date.now() + Math.random(),
      x: 100,
      y: Math.random() * 40 + 20, // Random height in upper area
      type: powerType.type as 'performance' | 'monitoring' | 'debugging',
      name: powerType.name,
      points: powerType.points
    };
    setPowerUps(prev => [...prev, powerUp]);
  }, []);

  // Jump mechanics
  const jump = useCallback(() => {
    if (!isJumping && !isDucking && gameStarted && !gameOver) {
      setIsJumping(true);
      setPlayerY(GROUND_Y - JUMP_HEIGHT);
      
      setTimeout(() => {
        setPlayerY(GROUND_Y);
        setIsJumping(false);
      }, 600);
    }
  }, [isJumping, isDucking, gameStarted, gameOver]);

  // Duck mechanics
  const startDuck = useCallback(() => {
    if (!isJumping && !isDucking && gameStarted && !gameOver) {
      setIsDucking(true);
      setPlayerY(DUCK_HEIGHT);
    }
  }, [isJumping, isDucking, gameStarted, gameOver]);

  const stopDuck = useCallback(() => {
    if (isDucking) {
      setIsDucking(false);
      setPlayerY(GROUND_Y);
    }
  }, [isDucking]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        startDuck();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        stopDuck();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [jump, startDuck, stopDuck]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move obstacles
      setObstacles(prev => prev.map(obs => ({
        ...obs,
        x: obs.x - speed
      })).filter(obs => obs.x > -20));

      // Move power-ups
      setPowerUps(prev => prev.map(power => ({
        ...power,
        x: power.x - speed
      })).filter(power => power.x > -20));

      // Update distance and speed
      setDistance(prev => prev + 1);
      setSpeed(prev => Math.min(prev + 0.001, 8)); // Gradually increase speed

      // Spawn new obstacles and power-ups
      if (Math.random() < 0.02) spawnObstacle();
      if (Math.random() < 0.008) spawnPowerUp();
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, speed, spawnObstacle, spawnPowerUp]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const checkCollisions = () => {
      const playerLeft = 10;
      const playerRight = 20;
      const playerTop = playerY;
      const playerBottom = playerY + (isDucking ? 15 : 20);

      // Check obstacle collisions
      obstacles.forEach(obs => {
        if (obs.x < playerRight && obs.x + obs.width > playerLeft &&
            obs.y < playerBottom && obs.y + obs.height > playerTop) {
          setGameOver(true);
        }
      });

      // Check power-up collisions
      setPowerUps(prev => prev.filter(power => {
        if (power.x < playerRight && power.x + 15 > playerLeft &&
            power.y < playerBottom && power.y + 15 > playerTop) {
          setScore(s => s + power.points);
          return false; // Remove collected power-up
        }
        return true;
      }));
    };

    const collisionCheck = setInterval(checkCollisions, 50);
    return () => clearInterval(collisionCheck);
  }, [gameStarted, gameOver, obstacles, powerUps, playerY, isDucking]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setDistance(0);
    setSpeed(3);
    setPlayerY(GROUND_Y);
    setIsJumping(false);
    setIsDucking(false);
    setObstacles([]);
    setPowerUps([]);
    setShowLeaderboard(false);
    setPlayerName('');
  };

  const gameAreaStyle = {
    width: '100%',
    height: '400px',
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    border: '3px solid #00ffff',
    position: 'relative' as const,
    overflow: 'hidden',
    fontFamily: 'Monaco, Consolas, monospace'
  };

  const playerStyle = {
    position: 'absolute' as const,
    left: '10%',
    top: `${playerY}%`,
    width: '40px',
    height: isDucking ? '30px' : '40px',
    fontSize: isDucking ? '24px' : '32px',
    transition: isJumping ? 'top 0.3s ease-out' : 'top 0.2s ease-in',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
            Endless Platform Action
          </h2>
          
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            border: '2px solid #00ffff',
            padding: '25px',
            marginBottom: '30px',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '15px' }}>HOW TO PLAY:</h3>
            <div style={{ textAlign: 'left' as const, lineHeight: '1.6' }}>
              <p>🏃‍♂️ <strong>RUN</strong> through different code environments</p>
              <p>⬆️ <strong>JUMP</strong> over errors with SPACEBAR or ↑</p>
              <p>⬇️ <strong>DUCK</strong> under warnings with ↓</p>
              <p>💎 <strong>COLLECT</strong> monitoring tools for points</p>
              <p>📊 <strong>SURVIVE</strong> as long as possible!</p>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#ffa500', marginBottom: '15px' }}>BUGSNAG ERROR TYPES:</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' as const, gap: '10px' }}>
              <span style={{ color: '#ff4444' }}>🔥 Critical Errors</span>
              <span style={{ color: '#ffaa00' }}>⚠️ Performance Issues</span>
              <span style={{ color: '#4488ff' }}>ℹ️ Minor Warnings</span>
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
            🚀 START RUNNING
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
              <h1 style={{ fontSize: '42px', color: '#ff4444', marginBottom: '20px' }}>
                💥 GAME OVER 💥
              </h1>
              <div style={{ marginBottom: '30px' }}>
                <p style={{ fontSize: '32px', color: '#00ffff', marginBottom: '10px' }}>
                  SCORE: {score}
                </p>
                <p style={{ fontSize: '24px', color: '#ffa500' }}>
                  DISTANCE: {Math.floor(distance / 10)}m
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
                      saveToLeaderboard(playerName, score, Math.floor(distance / 10));
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
                  onClick={() => saveToLeaderboard(playerName, score, Math.floor(distance / 10))}
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
                          {entry.distance}m
                        </span>
                        <span style={{ color: '#888', fontSize: '12px' }}>
                          {entry.date}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#00ffff', textAlign: 'center' as const }}>
                    No scores yet! Be the first to run.
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
              🏃‍♂️ RUN AGAIN
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
              border: '2px solid #ffa500',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>DISTANCE: </span>
              <span style={{ fontSize: '20px', color: '#00ff00' }}>{Math.floor(distance / 10)}m</span>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid #ff4444',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>SPEED: </span>
              <span style={{ fontSize: '20px', color: '#ff4444' }}>{speed.toFixed(1)}x</span>
            </div>
          </div>

          {/* Game Area */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            ...gameAreaStyle
          }}>
            {/* Player Character */}
            <div style={playerStyle}>
              {isDucking ? '🤸‍♂️' : isJumping ? '🏃‍♂️' : '🏃‍♂️'}
            </div>

            {/* Obstacles */}
            {obstacles.map(obs => {
              const colors = {
                error: '#ff4444',
                warning: '#ffaa00', 
                info: '#4488ff'
              };
              return (
                <div
                  key={obs.id}
                  style={{
                    position: 'absolute',
                    left: `${obs.x}%`,
                    top: `${obs.y}%`,
                    width: `${obs.width}px`,
                    height: `${obs.height}px`,
                    background: colors[obs.type],
                    border: '2px solid #fff',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textAlign: 'center' as const,
                    boxShadow: `0 0 10px ${colors[obs.type]}`
                  }}
                >
                  {obs.type === 'error' ? '🔥' : obs.type === 'warning' ? '⚠️' : 'ℹ️'}
                  <br />
                  {obs.errorType}
                </div>
              );
            })}

            {/* Power-ups */}
            {powerUps.map(power => {
              const colors = {
                performance: '#00ff00',
                monitoring: '#00ffff',
                debugging: '#ff00ff'
              };
              return (
                <div
                  key={power.id}
                  style={{
                    position: 'absolute',
                    left: `${power.x}%`,
                    top: `${power.y}%`,
                    width: '30px',
                    height: '30px',
                    background: colors[power.type],
                    border: '2px solid #fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#000',
                    boxShadow: `0 0 15px ${colors[power.type]}`,
                    animation: 'pulse 1s infinite'
                  }}
                >
                  {power.type === 'performance' ? '⚡' : power.type === 'monitoring' ? '👁️' : '🔧'}
                </div>
              );
            })}

            {/* Ground line */}
            <div style={{
              position: 'absolute',
              bottom: '35%',
              left: 0,
              right: 0,
              height: '2px',
              background: '#00ffff',
              boxShadow: '0 0 5px #00ffff'
            }} />

            {/* Controls instruction */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '8px 12px',
              border: '1px solid #00ffff',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              ↑ JUMP | ↓ DUCK
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

          <style jsx>{`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}