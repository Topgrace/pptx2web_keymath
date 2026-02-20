import type { ReactNode } from 'react'
import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'
import type { CardVariant } from '@/schemas/step'

export function PracticeCard({
  visible,
  variant = 'white',
  title,
  subtitle,
  children,
}: {
  visible: boolean
  variant?: CardVariant
  title?: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <StepCard visible={visible} variant={variant}>
      <StaggerReveal enabled={visible}>
        {title && (
          <StaggerItem>
            <div className="text-center text-lg font-extrabold text-slide-brown mb-1">
              {title}
            </div>
          </StaggerItem>
        )}
        {subtitle && (
          <StaggerItem>
            <div className="text-center text-[13px] text-slide-muted mb-4">
              {subtitle}
            </div>
          </StaggerItem>
        )}

        <StaggerItem>
          {children}
        </StaggerItem>
      </StaggerReveal>
    </StepCard>
  )
}
