import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-ch2-intro/config'
import { quizStepIds } from '@/content/slides/1-1-ch2-intro/steps-data'
import MdxContent from '@/content/slides/1-1-ch2-intro/1-1-ch2-intro.mdx'

export default function Page_1_1_ch2_intro() {
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
