import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit8-fraction-calc/config'
import { quizStepIds } from '@/content/slides/unit8-fraction-calc/steps-data'
import MdxContent from '@/content/slides/unit8-fraction-calc/unit8-fraction-calc.mdx'

export default function Unit8Page() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
