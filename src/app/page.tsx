export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            SmartBear Code Bug Hunt Challenge
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Hunt JavaScript errors in code snippets and win free swag!
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 mb-8 inline-block">
            <p className="text-yellow-800 dark:text-yellow-200 font-semibold">
              🎯 Score 80+ points to unlock your free SmartBear swag!
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            How to Play
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐛</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Hunt Code Errors</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Click on JavaScript errors: SyntaxError, TypeError, ReferenceError
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Earn Points</h3>
              <p className="text-gray-600 dark:text-gray-300">
                SyntaxError: 5-10pts, ReferenceError: 15-25pts, TypeError: 30-50pts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Win Swag</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Score 80+ to qualify for exclusive SmartBear merchandise
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Start Code Hunt
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}