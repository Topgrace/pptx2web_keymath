import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/2-1-u5/config'
import { quizStepIds } from '@/content/slides/2-1-u5/steps-data'
import MdxContent from '@/content/slides/2-1-u5/2-1-u5.mdx'

export default function Page_2_1_u5() {
  return (
    <SlidePage
      Content={MdxContent}
      totalSteps={slideConfig.totalSteps}
      quizStepIds={quizStepIds}
    />
  )
}
