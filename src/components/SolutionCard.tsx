import React from 'react'
import { ExternalLink, Tag, TrendingUp } from 'lucide-react'
import { Solution } from '../lib/supabase'

interface SolutionCardProps {
  solution: Solution
  index: number
}

export default function SolutionCard({ solution, index }: SolutionCardProps) {
  const typeColors = {
    'Commercial': 'bg-blue-100 text-blue-800 border-blue-200',
    'Free': 'bg-green-100 text-green-800 border-green-200',
    'Freemium': 'bg-purple-100 text-purple-800 border-purple-200',
    'Open Source': 'bg-orange-100 text-orange-800 border-orange-200'
  }

  const defaultColor = 'bg-gray-100 text-gray-800 border-gray-200'

  return (
    <div 
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0,
        transform: 'translateY(20px)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 mb-2">
            {solution.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {solution.description}
          </p>
        </div>
        
        {solution.popularity && (
          <div className="flex items-center space-x-1 ml-4">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium text-sm">{solution.popularity}%</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
            typeColors[solution.type as keyof typeof typeColors] || defaultColor
          }`}>
            {solution.type}
          </span>
          
          <span className="text-gray-400 text-xs">
            via {solution.source}
          </span>
        </div>

        <a
          href={solution.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200 group/link"
        >
          <span>Visit</span>
          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>

      {solution.tags && solution.tags.length > 0 && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-700">
          <Tag className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {solution.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}