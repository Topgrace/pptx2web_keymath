import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-u5/config'
import { quizStepIds } from '@/content/slides/1-1-u5/steps-data'
import MdxContent from '@/content/slides/1-1-u5/1-1-u5.mdx'

export default function Page_1_1_u5() {
  return (
    <div style={{ backgroundColor: '#B9DDF2', minHeight: '100vh' }}>
      <SlidePage
        Content={MdxContent}
        totalSteps={slideConfig.totalSteps}
        quizStepIds={quizStepIds}
      />
    </div>
  )
}
