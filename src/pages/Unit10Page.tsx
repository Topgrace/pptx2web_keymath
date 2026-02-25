import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit10-division/config'
import { quizStepIds } from '@/content/slides/unit10-division/steps-data'
import MdxContent from '@/content/slides/unit10-division/unit10-division.mdx'

export default function Unit10Page() {
    return (
        <SlidePage
            Content={MdxContent}
            totalSteps={slideConfig.totalSteps}
            quizStepIds={quizStepIds}
        />
    )
}
