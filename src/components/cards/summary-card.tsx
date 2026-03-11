import type { ReactNode } from 'react'
import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'
import { cn } from '@/lib/utils'

interface CaseItem {
  tag: ReactNode
  tagVariant: 'big' | 'small' | 'equal'
  content: ReactNode
}

export function SummaryCard({
  visible,
  title,
  cases,
  children,
  layout = 'stack',
}: {
  visible: boolean
  title: string
  cases: CaseItem[]
  children?: ReactNode
  layout?: 'stack' | 'two-column-fixed' | 'stack-below-tag'
}) {
  return (
    <StepCard visible={visible} variant="white">
      <StaggerReveal enabled={visible}>
        <StaggerItem>
          <div className="text-center text-lg font-extrabold text-slide-brown mb-4">
            {title}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex flex-col gap-3">
            {cases.map((c, idx) => (
              <div
                key={idx}
                className={cn(
                  'py-3.5 px-4 bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)]',
                  layout === 'two-column-fixed'
                    ? 'grid grid-cols-[168px_minmax(0,1fr)] items-center gap-3'
                    : layout === 'stack-below-tag'
                      ? 'flex flex-col items-start gap-2.5'
                    : 'flex items-center gap-3',
                )}
              >
                <div
                  className={cn(
                    'text-[13px] font-extrabold py-1 px-2.5 rounded-lg',
                    layout === 'two-column-fixed'
                      ? 'flex min-h-[54px] w-full items-center justify-center text-center leading-snug'
                      : layout === 'stack-below-tag'
                        ? 'w-full text-center leading-snug'
                      : 'shrink-0',
                    c.tagVariant === 'big' && 'bg-slide-green/10 text-slide-green',
                    c.tagVariant === 'small' && 'bg-slide-red/10 text-slide-red',
                    c.tagVariant === 'equal' && 'bg-slide-gray/10 text-slide-gray',
                  )}
                >
                  {c.tag}
                </div>
                <div
                  className={cn(
                    'katex-inline',
                    layout === 'two-column-fixed' && 'min-w-0 text-left',
                    layout === 'stack-below-tag' && 'w-full text-center',
                  )}
                >
                  {c.content}
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>

        {children && (
          <StaggerItem>
            {children}
          </StaggerItem>
        )}
      </StaggerReveal>
    </StepCard>
  )
}
