import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎮 Bugsnag Gaming Arcade 🎮
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Interactive games to learn about error monitoring and win free swag!
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 mb-8 inline-block">
            <p className="text-yellow-800 dark:text-yellow-200 font-semibold">
              🎯 Score 80+ points in any game to unlock your free Bugsnag swag!
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Featured Games Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Retro Arcade Shooter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-green-400 hover:border-green-300 transition-colors">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Retro Arcade Shooter
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Classic space shooter with authentic Bugsnag error types. Blast bugs with laser bullets!
                </p>
              </div>
              
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Controls:</span>
                  <span className="text-blue-600">← → Arrow Keys + Spacebar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">High Score:</span>
                  <span className="text-green-600">Leaderboard Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Difficulty:</span>
                  <span className="text-orange-600">⭐⭐⭐</span>
                </div>
              </div>
              
              <Link href="/games/shooter">
                <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105">
                  🚀 PLAY SHOOTER
                </button>
              </Link>
            </div>
            
            {/* More Games Coming */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-400">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  More Games Coming!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  What type of Bugsnag-themed game would you like to see next?
                </p>
              </div>
              
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ideas:</span>
                  <span className="text-purple-600">Puzzle, Strategy, Action</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-yellow-600">In Development</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Suggestions:</span>
                  <span className="text-blue-600">Always Welcome!</span>
                </div>
              </div>
              
              <button disabled className="w-full bg-gray-400 text-gray-600 font-bold py-3 px-6 rounded-lg cursor-not-allowed">
                🚧 COMING SOON
              </button>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Gaming?</h2>
            <p className="text-xl mb-6">Choose a game and start hunting bugs!</p>
            <Link href="/games">
              <button className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg">
                🎮 BROWSE ALL GAMES 🎮
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
