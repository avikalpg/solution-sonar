import React, { useState } from 'react'
import { Search, Send, Lightbulb } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { findSolutions } from '../lib/api'
import { SearchResult } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'
import SolutionCard from '../components/SolutionCard'

export default function Dashboard() {
  const { user } = useAuth()
  const [problem, setProblem] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!problem.trim() || problem.trim().length < 10) {
      setError('Please provide a detailed problem description (at least 10 characters)')
      return
    }

    setLoading(true)
    setError('')
    setSearchResult(null)

    try {
      const result = await findSolutions(problem, user?.id)
      setSearchResult(result)
    } catch (err: any) {
      setError(err.message || 'Failed to find solutions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const exampleProblems = [
    "I need a Discord bot to monitor hackathon announcements",
    "Looking for project management tools for remote teams",
    "Need AI tools for code documentation and diff visualization",
    "Want to automate social media posting for my startup"
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Describe your problem or challenge, and I'll help you discover existing solutions, 
            tools, and platforms that can help.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="problem" className="block text-sm font-medium text-gray-300 mb-3">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Describe your problem or what you're trying to build</span>
                </div>
              </label>
              <textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Example: I need a Discord bot that can monitor local hackathon announcements and notify my team when new events are posted..."
                className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                disabled={loading}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {problem.length}/500 characters
                </span>
                {problem.length < 10 && problem.length > 0 && (
                  <span className="text-xs text-orange-400">
                    Please provide more detail (minimum 10 characters)
                  </span>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || problem.trim().length < 10}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors duration-200"
            >
              {loading ? (
                <LoadingSpinner size="sm" message="" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Find Solutions</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Example Problems */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-4">Try these example problems:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {exampleProblems.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setProblem(example)}
                  className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  disabled={loading}
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12">
            <LoadingSpinner 
              size="lg" 
              message="Scanning the digital landscape for solutions..." 
            />
          </div>
        )}

        {/* Search Results */}
        {searchResult && !loading && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Solutions Found
              </h2>
              <p className="text-gray-400">
                Found {searchResult.solutions.length} relevant solutions for: 
                <span className="text-blue-400 font-medium"> "{searchResult.problem}"</span>
              </p>
            </div>

            <div className="grid gap-6">
              {searchResult.solutions.map((solution, index) => (
                <SolutionCard 
                  key={`${solution.title}-${index}`}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>

            {/* Search Again Button */}
            <div className="text-center pt-8">
              <button
                onClick={() => {
                  setSearchResult(null)
                  setProblem('')
                  setError('')
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Search for Another Problem
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}