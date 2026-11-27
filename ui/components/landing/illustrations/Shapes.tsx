import React from 'react'

export const ShapeCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 120" fill="none" {...props}>
    <circle cx="60" cy="60" r="50" fill="#176B58" opacity="0.12" />
    <circle cx="60" cy="60" r="30" fill="#b78136" opacity="0.18" />
  </svg>
)

export const ShapeBlob = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" fill="none" {...props}>
    <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.1C87.4,-33.1,89.9,-17.2,86.8,-2.1C83.7,13,75,27.3,65.3,39.9C55.6,52.5,44.9,63.4,32,70.3C19.1,77.2,4,80.1,-11.7,77.4C-27.4,74.7,-43.7,66.4,-56.5,55.2C-69.3,44,-78.6,29.9,-82.4,14.1C-86.2,-1.7,-84.5,-19.2,-78.4,-34.4C-72.3,-49.6,-61.8,-62.5,-48.6,-69.7C-35.4,-76.9,-19.5,-78.4,-3.2,-73.4C13.1,-68.4,26.2,-57.9,44.7,-76.4Z" transform="translate(100 100)" fill="#176B58" opacity="0.1" />
  </svg>
)
