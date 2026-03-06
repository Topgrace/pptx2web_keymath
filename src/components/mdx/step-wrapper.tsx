import React, { useEffect, type ReactNode } from 'react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { StepDivider } from '@/components/cards/step-card'

export function Step({
  id,
  children,
}: {
  id: number
  children: ReactNode
}) {
  const { currentStep, totalSteps } = useSlideProgress()
  const visible = id <= currentStep

  if (!visible) {
    return null
  }

  const enhanced = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, { visible })
    }
    return child
  })

  return (
    <>
      <div id={`step-${id}`}>{enhanced}</div>
      {id < totalSteps - 1 && <StepDivider visible={visible} />}
    </>
  )
}

export function SlideContent({ children }: { children: ReactNode }) {
  const { currentStep } = useSlideProgress()

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById(`step-${currentStep}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    return () => clearTimeout(timer)
  }, [currentStep])

  return <>{children}</>
}
