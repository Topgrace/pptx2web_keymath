import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { useSlideProgress } from '@/hooks/use-slide-progress'

export function SolvedSquareExplanation({
  stepId,
  text,
  equationTex,
}: {
  stepId: number
  text: string
  equationTex: string
}) {
  const { isSolved } = useSlideProgress()

  if (!isSolved(stepId)) return null

  return (
    <motion.div
      className="mt-3 rounded-[12px] bg-slide-warning-bg px-4 py-3 text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-sm font-bold text-slide-brown">
        {text} <MathInline tex={equationTex} />이다.
      </div>
    </motion.div>
  )
}
