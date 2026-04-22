import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-u9/config'
import { quizStepIds } from '@/content/slides/1-1-u9/steps-data'
import MdxContent from '@/content/slides/1-1-u9/1-1-u9.mdx'

export default function Page_1_1_u9() {
  return (
    <div style={{ backgroundColor: '#CFE7D0', minHeight: '100vh' }}>
      <SlidePage
        Content={MdxContent}
        totalSteps={slideConfig.totalSteps}
        quizStepIds={quizStepIds}
      />
    </div>
  )
}
