import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ArrowLabelProps {
  items: {
    arrow: string
    label: string
    target: string
    color: string
  }[]
  className?: string
}

export function ArrowLabels({ items, className }: ArrowLabelProps) {
  return (
    <div className={cn('flex justify-center gap-8 w-full', className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center gap-1.5 py-3.5 px-6 rounded-2xl bg-white shadow-[0_1px_6px_rgba(0,0,0,0.05)]"
        >
          <span className="text-xl text-slide-accent">{item.arrow}</span>
          <span className="text-[40px] font-extrabold leading-none" style={{ color: item.color }}>
            {item.target}
          </span>
          <span className="text-[22px] font-extrabold text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export function FormulaLabels({
  items,
  className,
}: {
  items: { label: ReactNode; variant: 'base' | 'exponent' }[]
  className?: string
}) {
  return (
    <div className={cn('flex justify-center gap-5 mt-4', className)}>
      {items.map((item, idx) => (
        <span
          key={idx}
          className={cn(
            'py-2 px-5 rounded-full text-[15px] font-extrabold inline-flex items-center gap-1',
            item.variant === 'base' && 'bg-slide-red/10 text-slide-red',
            item.variant === 'exponent' && 'bg-slide-green/10 text-slide-green',
          )}
        >
          {item.label}
        </span>
      ))}
    </div>
  )
}
