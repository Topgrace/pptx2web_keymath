import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/2-1-u9/config'
import { quizStepIds } from '@/content/slides/2-1-u9/steps-data'
import MdxContent from '@/content/slides/2-1-u9/2-1-u9.mdx'

export default function Page_2_1_u9() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
