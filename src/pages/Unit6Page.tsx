import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit6-monomial/config'
import { quizStepIds } from '@/content/slides/unit6-monomial/steps-data'
import MdxContent from '@/content/slides/unit6-monomial/unit6-monomial.mdx'

export default function Unit6Page() {
  return (
    <SlidePage
      Content={MdxContent}
      totalSteps={slideConfig.totalSteps}
      quizStepIds={quizStepIds}
    />
  )
}
