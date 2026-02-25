import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit7-polynomial/config'
import { quizStepIds } from '@/content/slides/unit7-polynomial/steps-data'
import MdxContent from '@/content/slides/unit7-polynomial/unit7-polynomial.mdx'

export default function Unit7Page() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
