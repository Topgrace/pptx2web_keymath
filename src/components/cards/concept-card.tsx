import { StepCard } from './step-card'
import { StaggerReveal, StaggerItem } from '@/components/animations'
import { MathDisplay } from '@/components/math'
import type { ReactNode } from 'react'
import type { CardVariant } from '@/schemas/step'

export function ConceptCard({
  visible,
  variant = 'white',
  formula,
  formulaSize = 'katex-hero',
  description,
  children,
}: {
  visible: boolean
  variant?: CardVariant
  formula: string
  formulaSize?: string
  description?: string
  children?: ReactNode
}) {
  return (
    <StepCard visible={visible} variant={variant}>
      <StaggerReveal enabled={visible}>
        <StaggerItem variant="scale">
          <div className="text-center py-5">
            <MathDisplay tex={formula} sizeClass={formulaSize} />
          </div>
        </StaggerItem>

        {description && (
          <StaggerItem>
            <div className="text-center text-[15px] text-gray-400 mb-2">
              {description}
            </div>
          </StaggerItem>
        )}

        {children && (
          <StaggerItem>
            {children}
          </StaggerItem>
        )}
      </StaggerReveal>
    </StepCard>
  )
}
