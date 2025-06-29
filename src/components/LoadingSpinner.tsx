import React from 'react'
import SonarIcon from './SonarIcon'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ 
  message = "Scanning the digital ocean...", 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="relative">
        <SonarIcon className={`${sizeClasses[size]} text-blue-400 animate-pulse`} />
        <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-full blur-lg animate-ping"></div>
      </div>
      <p className="text-gray-400 text-sm font-medium animate-pulse">{message}</p>
    </div>
  )
}