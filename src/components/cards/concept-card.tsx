import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'
import { MathDisplay } from '@/components/math'
import type { ReactNode } from 'react'
import type { CardVariant } from '@/schemas/step'

type ConceptSequenceDelays = {
  topContent?: number
  formula?: number
  description?: number
  children?: number
}

export function ConceptCard({
  visible,
  variant = 'white',
  topContent,
  formula,
  formulaSize = 'katex-hero',
  description,
  children,
  sequenceDelays,
}: {
  visible: boolean
  variant?: CardVariant
  topContent?: ReactNode
  formula: string
  formulaSize?: string
  description?: string
  children?: ReactNode
  sequenceDelays?: ConceptSequenceDelays
}) {
  const hasCustomSequence = !!sequenceDelays

  return (
    <StepCard visible={visible} variant={variant}>
      <StaggerReveal enabled={visible} staggerChildren={hasCustomSequence ? 0 : 0.7}>
        {topContent && (
          <StaggerItem delay={sequenceDelays?.topContent}>
            {topContent}
          </StaggerItem>
        )}

        <StaggerItem variant="scale" delay={sequenceDelays?.formula}>
          <div className="text-center py-5">
            <MathDisplay tex={formula} sizeClass={formulaSize} />
          </div>
        </StaggerItem>

        {description && (
          <StaggerItem delay={sequenceDelays?.description}>
            <div className="text-center text-[15px] text-gray-400 mb-2">
              {description}
            </div>
          </StaggerItem>
        )}

        {children && (
          <StaggerItem delay={sequenceDelays?.children}>
            {children}
          </StaggerItem>
        )}
      </StaggerReveal>
    </StepCard>
  )
}
