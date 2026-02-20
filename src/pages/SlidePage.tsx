import type { ComponentType } from 'react'
import { SlideProgressProvider } from '@/hooks/use-slide-progress'
import { SlideContainer, ProgressBar, NextButton } from '@/components/layout'

/**
 * 슬라이드 페이지 레이아웃 — 각 단원 MDX를 감싸는 공통 셸
 */
export default function SlidePage({
  Content,
  totalSteps,
  quizStepIds,
}: {
  Content: ComponentType
  totalSteps: number
  quizStepIds: Set<number>
}) {
  return (
    <SlideProgressProvider totalSteps={totalSteps} quizStepIds={quizStepIds}>
      <ProgressBar />
      <SlideContainer>
        <Content />
      </SlideContainer>
      <NextButton />
    </SlideProgressProvider>
  )
}
