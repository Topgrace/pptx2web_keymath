import type { ReactNode } from 'react'
import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'
import { LettersPullUp } from '@/components/animations'
import { MathDisplay } from '@/components/math'
import type { CardVariant } from '@/schemas/step'

export function LawCard({
  visible,
  variant = 'default',
  title,
  formula,
  hint,
  example,
  extraNote,
  children,
}: {
  visible: boolean
  variant?: CardVariant
  title: string
  formula: string
  hint?: string
  example?: ReactNode
  extraNote?: ReactNode
  children?: ReactNode
}) {
  return (
    <StepCard visible={visible} variant={variant}>
      <StaggerReveal enabled={visible}>
        {/* Header */}
        <StaggerItem>
          <div className="text-center mb-4">
            <div className="text-base font-extrabold text-slide-gray">
              <LettersPullUp text={title} enabled={visible} />
            </div>
          </div>
        </StaggerItem>

        {/* Formula */}
        <StaggerItem variant="scale">
          <div className="text-center p-4 bg-white rounded-[14px] my-3 shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
            <MathDisplay tex={formula} sizeClass="katex-law" />
          </div>
        </StaggerItem>

        {/* Hint */}
        {hint && (
          <StaggerItem variant="blur">
            <div className="text-center text-[15px] font-extrabold text-slide-red my-2">
              {hint}
            </div>
          </StaggerItem>
        )}

        {/* Example */}
        {example && (
          <StaggerItem variant="blur">
            {example}
          </StaggerItem>
        )}

        {/* Extra note */}
        {extraNote && (
          <StaggerItem>
            {extraNote}
          </StaggerItem>
        )}

        {/* Quiz or other children */}
        {children && (
          <StaggerItem>
            {children}
          </StaggerItem>
        )}
      </StaggerReveal>
    </StepCard>
  )
}
