import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Zap, Target, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import SonarIcon from '../components/SonarIcon'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <SonarIcon className="w-20 h-20 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Solution
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Sonar
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Your AI-driven radar for emerging solutions and competitor launches
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Describe your problem and discover innovative tools, platforms, and solutions 
              that others have built to solve similar challenges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Search className="w-5 h-5" />
                  <span>Start Searching</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Get Started Free</span>
                  </Link>
                  
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-blue-400 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-gray-800"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How SolutionSonar Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful AI-driven discovery to find the solutions you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Describe Your Problem</h3>
              <p className="text-gray-400 leading-relaxed">
                Simply describe what you're trying to solve or build. Our AI understands context and intent.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Discovery</h3>
              <p className="text-gray-400 leading-relaxed">
                Our intelligent system scans multiple sources to find relevant solutions, tools, and platforms.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Curated Results</h3>
              <p className="text-gray-400 leading-relaxed">
                Get a ranked list of solutions with detailed information, pricing, and direct links to explore.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to discover your next solution?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join hundreds of innovators using SolutionSonar to find the tools they need.
          </p>
          
          {!user && (
            <Link
              to="/signup"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <Zap className="w-6 h-6" />
              <span>Start Your Search Journey</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}