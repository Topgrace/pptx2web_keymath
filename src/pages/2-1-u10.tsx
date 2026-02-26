import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/2-1-u10/config'
import { quizStepIds } from '@/content/slides/2-1-u10/steps-data'
import MdxContent from '@/content/slides/2-1-u10/2-1-u10.mdx'

export default function Page_2_1_u10() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
