import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-u11/config'
import { quizStepIds } from '@/content/slides/1-1-u11/steps-data'
import MdxContent from '@/content/slides/1-1-u11/1-1-u11.mdx'

export default function Page_1_1_u11() {
  return (
    <div style={{ backgroundColor: '#E8DDF1', minHeight: '100vh' }}>
      <SlidePage
        Content={MdxContent}
        totalSteps={slideConfig.totalSteps}
        quizStepIds={quizStepIds}
      />
    </div>
  )
}
