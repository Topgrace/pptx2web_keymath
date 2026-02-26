import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/2-1-u11/config'
import { quizStepIds } from '@/content/slides/2-1-u11/steps-data'
import MdxContent from '@/content/slides/2-1-u11/2-1-u11.mdx'

export default function Page_2_1_u11() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
