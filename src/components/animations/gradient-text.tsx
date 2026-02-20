import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function GradientText({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'bg-[linear-gradient(90deg,#7A4C14,#D85A3A,#F68746,#2E7D32,#7A4C14)]',
        'bg-[length:300%_auto] bg-clip-text text-transparent',
        'animate-gradient-shift',
        className,
      )}
    >
      {children}
    </span>
  )
}
