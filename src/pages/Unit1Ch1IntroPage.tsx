import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit1-ch1-intro/config'
import { quizStepIds } from '@/content/slides/unit1-ch1-intro/steps-data'
import MdxContent from '@/content/slides/unit1-ch1-intro/unit1-ch1-intro.mdx'

export default function Unit1Ch1IntroPage() {
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
