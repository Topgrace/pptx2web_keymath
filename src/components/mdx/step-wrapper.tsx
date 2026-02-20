import React, { useEffect, type ReactNode } from 'react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { StepDivider } from '@/components/cards/step-card'

/**
 * MDX용 Step 래퍼.
 * - useSlideProgress()에서 currentStep을 읽어 visible 판정
 * - 첫 번째 card child에 visible prop 자동 주입 (cloneElement)
 * - 마지막 step이 아니면 StepDivider 자동 추가
 */
export function Step({
  id,
  children,
}: {
  id: number
  children: ReactNode
}) {
  const { currentStep, totalSteps } = useSlideProgress()
  const visible = id <= currentStep

  // Card 컴포넌트에 visible prop 주입
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

/**
 * MDX 전체를 감싸는 래퍼. 자동 스크롤 처리.
 */
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
