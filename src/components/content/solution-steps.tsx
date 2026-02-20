import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * 풀이 과정 표시 — 단계별 수식 풀이를 화살표/등호로 연결하여 보여줌
 */
export function SolutionSteps({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2 items-center my-3', className)}>
      {children}
    </div>
  )
}

export function SolutionLine({
  children,
  label,
  className,
}: {
  children: ReactNode
  label?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2 flex-wrap justify-center', className)}>
      <div className="katex-inline text-[16px] font-bold text-gray-700 text-center leading-[1.8]">
        {children}
      </div>
      {label && (
        <span className="text-sm font-bold text-slide-brown bg-slide-warning-bg px-2 py-0.5 rounded-lg whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  )
}

export function SolutionArrow({ text }: { text?: string }) {
  return (
    <div className="text-slide-accent text-lg font-bold">
      {text ?? '↓'}
    </div>
  )
}
