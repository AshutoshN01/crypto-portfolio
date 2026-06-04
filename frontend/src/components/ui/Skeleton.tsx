import { HTMLAttributes } from 'react'

export default function Skeleton({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded-sm bg-white/10 ${className}`} {...props} />
}
