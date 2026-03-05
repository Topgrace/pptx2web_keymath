import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { MathInline } from '@/components/math'

const EASE = [0.16, 1, 0.3, 1] as const

const squares = [
  { base: 1, result: 1 },
  { base: 2, result: 4 },
  { base: 3, result: 9 },
  { base: 4, result: 16 },
  { base: 5, result: 25 },
]

interface PerfectSquareGridMotionProps {
  className?: string
  stepId?: number
}

export function PerfectSquareGridMotion({
  className,
  stepId = 1,
}: PerfectSquareGridMotionProps) {
  const { currentStep } = useSlideProgress()
  const enabled = currentStep >= stepId

  return (
    <motion.div
      className={cn('rounded-xl border-2 border-[#d9dee7] bg-[#fbfcff] px-4 py-5', className)}
      initial={{ opacity: 0, y: 16 }}
      animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <motion.div
        className="text-center text-[13px] font-bold text-slide-gray mb-4"
        initial={{ opacity: 0 }}
        animate={enabled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        아래와 같이 자연수를 제곱하여 만든 수가{' '}
        <span className="font-extrabold text-slide-primary">제곱인 수</span>
      </motion.div>

      <div className="grid grid-cols-5 gap-2 max-w-[320px] mx-auto">
        {squares.map((sq, i) => {
          const baseDelay = 0.2 + i * 0.12
          return (
            <div key={sq.base} className="flex flex-col items-center gap-1.5">
              {/* n² label */}
              <motion.div
                className="flex items-center justify-center w-[48px] h-[36px] rounded-lg bg-[#e8f0fb] text-[18px] font-black text-slide-primary"
                initial={{ opacity: 0, y: 8 }}
                animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.35, delay: baseDelay, ease: EASE }}
              >
                <MathInline tex={`${sq.base}^2`} />
              </motion.div>

              {/* arrow */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={enabled ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                style={{ transformOrigin: 'top center' }}
                transition={{ duration: 0.25, delay: baseDelay + 0.2, ease: EASE }}
              >
                <div className="w-[2px] h-[18px] bg-[#b5bcc9]" />
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#b5bcc9]" />
              </motion.div>

              {/* result */}
              <motion.div
                className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#ffe65c] text-[20px] font-black text-[#1f1f24]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  enabled
                    ? { opacity: 1, scale: [0.5, 1.1, 1] }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.4, delay: baseDelay + 0.38, ease: EASE }}
              >
                {sq.result}
              </motion.div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
