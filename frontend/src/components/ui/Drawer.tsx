import { ReactNode } from 'react'

interface DrawerProps {
  open: boolean
  children: ReactNode
  onClose: () => void
}

export default function Drawer({ open, children, onClose }: DrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button className="absolute inset-0 bg-black/70" aria-label="Close navigation" onClick={onClose} />
      <div className="relative h-full w-72 border-r border-white/10 bg-surface p-4 shadow-card">{children}</div>
    </div>
  )
}
