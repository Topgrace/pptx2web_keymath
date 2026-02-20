import type { ReactNode } from 'react'
import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'
import { cn } from '@/lib/utils'

interface CaseItem {
  tag: string
  tagVariant: 'big' | 'small' | 'equal'
  content: ReactNode
}

export function SummaryCard({
  visible,
  title,
  cases,
  children,
}: {
  visible: boolean
  title: string
  cases: CaseItem[]
  children?: ReactNode
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
                className="flex items-center gap-3 py-3.5 px-4 bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <span
                  className={cn(
                    'text-[13px] font-extrabold py-1 px-2.5 rounded-lg shrink-0',
                    c.tagVariant === 'big' && 'bg-slide-green/10 text-slide-green',
                    c.tagVariant === 'small' && 'bg-slide-red/10 text-slide-red',
                    c.tagVariant === 'equal' && 'bg-slide-gray/10 text-slide-gray',
                  )}
                >
                  {c.tag}
                </span>
                <div className="katex-inline">{c.content}</div>
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
