'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bugs, setBugs] = useState<{id: number; x: number; y: number; code: string; type: string; points: number}[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [bearPosition, setBearPosition] = useState(50);
  const [showForm, setShowForm] = useState(false);

  const spawnBug = () => {
    const newBug = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: 0,
      code: 'let x = ;',
      type: 'SyntaxError',
      points: 10
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
        if (bugs.length < 3) {
          spawnBug();
        }
      }, 3000);
      return () => clearInterval(spawner);
    }
  }, [gameStarted, gameOver, bugs.length]);

  // Bug movement
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const mover = setInterval(() => {
        setBugs(prev => prev.map(bug => ({
          ...bug,
          y: bug.y + 3
        })).filter(bug => bug.y < 85));
      }, 200);
      return () => clearInterval(mover);
    }
  }, [gameStarted, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        setBearPosition(prev => Math.max(10, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setBearPosition(prev => Math.min(90, prev + 5));
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
    setBearPosition(50);
    setShowForm(false);
  };

  // Inline styles to guarantee visibility
  const gameAreaStyle = {
    width: '100%',
    height: '400px',
    backgroundColor: '#1e40af',
    border: '4px solid #00ffff',
    borderRadius: '8px',
    position: 'relative' as const,
    margin: '20px auto'
  };

  const bearStyle = {
    position: 'absolute' as const,
    bottom: '20px',
    left: `${bearPosition}%`,
    transform: 'translateX(-50%)',
    fontSize: '60px',
    zIndex: 100
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const startScreenStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    backgroundColor: '#374151',
    border: '4px solid #00ffff',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center' as const
  };

  const buttonStyle = {
    backgroundColor: '#eab308',
    color: '#000',
    border: 'none',
    padding: '15px 30px',
    fontSize: '24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  console.log('Game state:', { gameStarted, gameOver, bearPosition, bugsCount: bugs.length, score, timeLeft });

  return (
    <div style={pageStyle}>
      {!gameStarted ? (
        <div style={startScreenStyle}>
          <h1 style={{ fontSize: '36px', color: '#00ffff', marginBottom: '20px' }}>
            🐻 SMART BEAR CODE HUNT 🐻
          </h1>
          <p style={{ fontSize: '18px', color: '#10b981', marginBottom: '30px' }}>
            Use ← → arrow keys to move SmartBear!<br />
            Click bugs to catch them!
          </p>
          <button onClick={startGame} style={buttonStyle}>
            START GAME
          </button>
          <div style={{ marginTop: '20px' }}>
            <Link href="/" style={{ color: '#00ffff', textDecoration: 'underline' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      ) : gameOver ? (
        <div style={startScreenStyle}>
          <h1 style={{ fontSize: '36px', color: '#ef4444', marginBottom: '20px' }}>
            GAME OVER!
          </h1>
          <p style={{ fontSize: '48px', color: '#eab308', marginBottom: '20px' }}>
            {score}
          </p>
          <p style={{ fontSize: '20px', color: '#00ffff', marginBottom: '30px' }}>
            FINAL SCORE
          </p>
          
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
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={startGame} style={{ ...buttonStyle, backgroundColor: '#3b82f6' }}>
              PLAY AGAIN
            </button>
            <Link href="/" style={{ ...buttonStyle, backgroundColor: '#6b7280', textDecoration: 'none', display: 'inline-block' }}>
              BACK TO HOME
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Game HUD */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#374151', border: '2px solid #00ffff', borderRadius: '8px', padding: '10px 20px' }}>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>SCORE: </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#eab308' }}>{score}</span>
            </div>
            <div style={{ backgroundColor: '#374151', border: '2px solid #ef4444', borderRadius: '8px', padding: '10px 20px' }}>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>TIME: </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>{timeLeft}s</span>
            </div>
          </div>

          {/* Game Arena */}
          <div style={gameAreaStyle}>
            
            {/* ALWAYS VISIBLE BEAR */}
            <div style={bearStyle}>
              🐻🕸️
            </div>

            {/* ALWAYS VISIBLE BUGS */}
            {bugs.map(bug => (
              <div
                key={bug.id}
                onClick={() => catchBug(bug.id, bug.points)}
                style={{
                  position: 'absolute',
                  left: `${bug.x}%`,
                  top: `${bug.y}%`,
                  transform: 'translateX(-50%)',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '2px solid #fff',
                  cursor: 'pointer',
                  minWidth: '100px',
                  textAlign: 'center',
                  fontSize: '12px',
                  zIndex: 50
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{bug.code}</div>
                <div style={{ fontSize: '10px', marginBottom: '2px' }}>{bug.type}</div>
                <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>+{bug.points}</div>
              </div>
            ))}

            {/* Debug info */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', color: '#fff', fontSize: '12px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '4px' }}>
              Bear: {bearPosition}% | Bugs: {bugs.length}
            </div>

            <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff', fontSize: '12px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '4px' }}>
              Use ← → arrows to move
            </div>

            {/* Center indicator */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '20px', opacity: 0.3 }}>
              GAME AREA ACTIVE
            </div>
          </div>
        </>
      )}
    </div>
  );
}