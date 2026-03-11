import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-u6/config'
import { quizStepIds } from '@/content/slides/1-1-u6/steps-data'
import MdxContent from '@/content/slides/1-1-u6/1-1-u6.mdx'

export default function Page_1_1_u6() {
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
