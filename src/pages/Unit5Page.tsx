import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit5-exponent/config'
import { quizStepIds } from '@/content/slides/unit5-exponent/steps-data'
import MdxContent from '@/content/slides/unit5-exponent/unit5-exponent.mdx'

export default function Unit5Page() {
  return (
    <SlidePage
      Content={MdxContent}
      totalSteps={slideConfig.totalSteps}
      quizStepIds={quizStepIds}
    />
  )
}
