import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-u10/config'
import { quizStepIds } from '@/content/slides/1-1-u10/steps-data'
import MdxContent from '@/content/slides/1-1-u10/1-1-u10.mdx'

export default function Page_1_1_u10() {
  return (
    <div style={{ backgroundColor: '#DDE7F5', minHeight: '100vh' }}>
      <SlidePage
        Content={MdxContent}
        totalSteps={slideConfig.totalSteps}
        quizStepIds={quizStepIds}
      />
    </div>
  )
}
