import { HTMLAttributes } from 'react'

type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'caption'

const styles: Record<TypographyVariant, string> = {
  display: 'text-4xl font-bold leading-tight md:text-5xl',
  h1: 'text-3xl font-semibold leading-tight',
  h2: 'text-2xl font-semibold leading-snug',
  h3: 'text-base font-semibold leading-6',
  body: 'text-base leading-6',
  small: 'text-sm leading-5',
  caption: 'text-[11px] font-medium leading-4'
}

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: keyof JSX.IntrinsicElements
}

export default function Typography({ variant = 'body', as: Tag = 'p', className = '', ...props }: TypographyProps) {
  return <Tag className={`${styles[variant]} ${className}`} {...props} />
}
