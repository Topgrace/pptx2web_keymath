import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/2-1-u6/config'
import { quizStepIds } from '@/content/slides/2-1-u6/steps-data'
import MdxContent from '@/content/slides/2-1-u6/2-1-u6.mdx'

export default function Page_2_1_u6() {
  return (
    <SlidePage
      Content={MdxContent}
      totalSteps={slideConfig.totalSteps}
      quizStepIds={quizStepIds}
    />
  )
}
