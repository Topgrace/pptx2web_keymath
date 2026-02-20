import type { ReactNode } from 'react'
import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'

interface DefItem {
  keyword: string
  description: string
}

export function DefinitionCard({
  visible,
  items,
  children,
}: {
  visible: boolean
  items: DefItem[]
  children?: ReactNode
}) {
  return (
    <StepCard visible={visible}>
      <StaggerReveal enabled={visible}>
        <StaggerItem>
          <div className="flex flex-col gap-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 py-3.5 px-4 bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                {/* Triangle bullet */}
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-slide-gray shrink-0" />
                <div>
                  <span className="text-xl font-extrabold text-slide-brown">{item.keyword}</span>
                  <span className="text-base font-bold text-gray-500"> : {item.description}</span>
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
