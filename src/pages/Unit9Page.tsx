import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit9-polynomial-monomial/config'
import { quizStepIds } from '@/content/slides/unit9-polynomial-monomial/steps-data'
import MdxContent from '@/content/slides/unit9-polynomial-monomial/unit9-polynomial-monomial.mdx'

export default function Unit9Page() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
