import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/1-1-ch1-intro/config'
import { quizStepIds } from '@/content/slides/1-1-ch1-intro/steps-data'
import MdxContent from '@/content/slides/1-1-ch1-intro/1-1-ch1-intro.mdx'

export default function Page_1_1_ch1_intro() {
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
