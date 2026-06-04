import { HTMLAttributes } from 'react'

export default function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-md border border-white/10 bg-surface p-4 shadow-card ${className}`} {...props} />
}
