import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SlideContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('max-w-[480px] mx-auto pb-[120px]', className)}>
      {children}
    </div>
  )
}
