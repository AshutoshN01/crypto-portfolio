import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', label, error, id, ...props }, ref) => {
  const inputId = id ?? props.name

  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-medium text-muted">{label}</span>}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        className={`h-11 w-full rounded-sm border border-white/10 bg-bg px-3 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary ${className}`}
        {...props}
      />
      {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
    </label>
  )
})

Input.displayName = 'Input'
export default Input
