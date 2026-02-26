import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/2-1-u8/config'
import { quizStepIds } from '@/content/slides/2-1-u8/steps-data'
import MdxContent from '@/content/slides/2-1-u8/2-1-u8.mdx'

export default function Page_2_1_u8() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
