import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit11-fraction-calc-2/config'
import { quizStepIds } from '@/content/slides/unit11-fraction-calc-2/steps-data'
import MdxContent from '@/content/slides/unit11-fraction-calc-2/unit11-fraction-calc-2.mdx'

export default function Unit11Page() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
