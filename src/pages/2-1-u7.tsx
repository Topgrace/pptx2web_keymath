import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/2-1-u7/config'
import { quizStepIds } from '@/content/slides/2-1-u7/steps-data'
import MdxContent from '@/content/slides/2-1-u7/2-1-u7.mdx'

export default function Page_2_1_u7() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
