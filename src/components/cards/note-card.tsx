import type { ReactNode } from 'react'
import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'
import type { CardVariant } from '@/schemas/step'

export function NoteCard({
  visible,
  variant = 'default',
  title,
  children,
}: {
  visible: boolean
  variant?: CardVariant
  title?: string
  children: ReactNode
}) {
  return (
    <StepCard visible={visible} variant={variant}>
      <StaggerReveal enabled={visible}>
        <StaggerItem variant="blur">
          <div className="bg-white rounded-[14px] border-l-4 border-slide-accent py-4.5 px-5">
            {title && (
              <div className="text-base font-extrabold text-slide-brown mb-2.5">
                {title}
              </div>
            )}
            {children}
          </div>
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}

export function NoteExample({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`katex-note mt-3 p-3 bg-slide-card rounded-[10px] text-xl font-extrabold text-slide-gray text-center ${className ?? ''}`}>
      {children}
    </div>
  )
}
