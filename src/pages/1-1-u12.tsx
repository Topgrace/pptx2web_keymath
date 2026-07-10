import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-u12/config'
import { quizStepIds } from '@/content/slides/1-1-u12/steps-data'
import MdxContent from '@/content/slides/1-1-u12/1-1-u12.mdx'

export default function Page_1_1_u12() {
  return (
    <div style={{ backgroundColor: '#DDEFE6', minHeight: '100vh' }}>
      <SlidePage
        Content={MdxContent}
        totalSteps={slideConfig.totalSteps}
        quizStepIds={quizStepIds}
      />
    </div>
  )
}
