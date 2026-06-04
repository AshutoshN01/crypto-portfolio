import { HTMLAttributes } from 'react'

export default function Badge({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex rounded-sm bg-accent/15 px-2 py-1 text-xs font-semibold text-accent ${className}`} {...props} />
}
