import React from 'react'

interface SonarIconProps {
  className?: string
}

export default function SonarIcon({ className = "w-6 h-6" }: SonarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer radar ring */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      
      {/* Middle radar ring */}
      <circle
        cx="12"
        cy="12"
        r="7"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.5"
      />
      
      {/* Inner radar ring */}
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.7"
      />
      
      {/* Center lightbulb */}
      <path
        d="M12 8c-1.1 0-2 .9-2 2 0 .8.4 1.5 1 1.8V14h2v-2.2c.6-.3 1-1 1-1.8 0-1.1-.9-2-2-2z"
        fill="currentColor"
      />
      
      {/* Lightbulb base */}
      <rect
        x="10.5"
        y="14"
        width="3"
        height="1"
        fill="currentColor"
        rx="0.5"
      />
      
      {/* Radar sweep line */}
      <line
        x1="12"
        y1="12"
        x2="18"
        y2="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />
      
      {/* Solution dots */}
      <circle cx="16" cy="9" r="1" fill="currentColor" opacity="0.9" />
      <circle cx="14" cy="6" r="0.8" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="15" r="0.6" fill="currentColor" opacity="0.5" />
    </svg>
  )
}