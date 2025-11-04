import Link from 'next/link';

export default function GamesIndex() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px #00ff41' }}>
            🎮 BUGSNAG ARCADE 🎮
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose your game and start hunting bugs!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Retro Shooter Game */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-green-400 shadow-lg transform hover:scale-105 transition-all duration-300" style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }}>
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Retro Arcade Shooter
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Classic space shooter with JavaScript bugs. Use arrow keys to move and spacebar to shoot!
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Difficulty:</span>
                <span className="text-orange-400">⭐⭐⭐</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Genre:</span>
                <span className="text-blue-400">Arcade Shooter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Features:</span>
                <span className="text-purple-400">Leaderboard</span>
              </div>
            </div>
            
            <Link href="/games/shooter">
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                🚀 PLAY SHOOTER
              </button>
            </Link>
          </div>
          
          {/* Placeholder for New Game */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-yellow-400 shadow-lg transform hover:scale-105 transition-all duration-300" style={{ boxShadow: '0 0 20px rgba(255, 193, 7, 0.3)' }}>
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                New Game Coming Soon!
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                What type of game would you like to build next?
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <span className="text-yellow-400">In Development</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Genre:</span>
                <span className="text-blue-400">Your Choice!</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Ideas:</span>
                <span className="text-purple-400">Puzzle, Action, Strategy</span>
              </div>
            </div>
            
            <button 
              disabled 
              className="w-full bg-gray-600 text-gray-400 font-bold py-3 px-6 rounded-lg cursor-not-allowed"
            >
              🚧 COMING SOON
            </button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
              🏠 Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}