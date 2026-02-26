import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'

interface CompositeEtymologyMotionProps {
  className?: string
  stepId?: number
}

export function CompositeEtymologyMotion({
  className,
  stepId = 3,
}: CompositeEtymologyMotionProps) {
  const { currentStep } = useSlideProgress()
  const enabled = currentStep >= stepId

  return (
    <motion.div
      className={cn(
        'rounded-xl border-2 border-[#f2c7a0] bg-[#fff9f2] px-3 py-3',
        className,
      )}
      initial={{ opacity: 0, y: 18 }}
      animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_auto_1.35fr] items-center gap-3 sm:gap-2">
        <div className="rounded-lg border border-[#f4d7bf] bg-white/85 px-3 py-2.5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.22, delay: 0.05 }}
            className="text-[30px] sm:text-[32px] leading-none font-black text-[#b36222] tracking-tight"
          >
            합성수
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.24, delay: 0.3 }}
            className="mt-1 text-[40px] sm:text-[44px] leading-none font-serif text-[#222]"
          >
            合成數
          </motion.div>

          <div className="mt-2 grid grid-cols-3 gap-1.5">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.2, delay: 0.55 }}
              className="rounded-md border border-[#f4d7bf] bg-[#fff2e5] px-1.5 py-1 text-[10px] font-bold text-[#7a4a25]"
            >
              合: 합치다
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.2, delay: 0.68 }}
              className="rounded-md border border-[#f4d7bf] bg-[#fff2e5] px-1.5 py-1 text-[10px] font-bold text-[#7a4a25]"
            >
              成: 이루다
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.2, delay: 0.81 }}
              className="rounded-md border border-[#f4d7bf] bg-[#fff2e5] px-1.5 py-1 text-[10px] font-bold text-[#7a4a25]"
            >
              數: number
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -6 }}
            animate={
              enabled
                ? { opacity: 1, scale: [1, 1.18, 1], y: 0 }
                : { opacity: 0, scale: 0.7, y: -6 }
            }
            transition={{
              opacity: { duration: 0.25, delay: 0.95 },
              y: { duration: 0.25, delay: 0.95 },
              scale: {
                duration: 0.95,
                delay: 1.08,
                repeat: enabled ? Infinity : 0,
                repeatDelay: 1.6,
              },
            }}
            className="sm:hidden text-[30px] font-black text-[#b98a60] text-center"
          >
            ↓
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: -6 }}
            animate={
              enabled
                ? { opacity: 1, scale: [1, 1.18, 1], x: 0 }
                : { opacity: 0, scale: 0.7, x: -6 }
            }
            transition={{
              opacity: { duration: 0.25, delay: 0.95 },
              x: { duration: 0.25, delay: 0.95 },
              scale: {
                duration: 0.95,
                delay: 1.08,
                repeat: enabled ? Infinity : 0,
                repeatDelay: 1.6,
              },
            }}
            className="hidden sm:block text-[34px] font-black text-[#b98a60] text-center"
          >
            →
          </motion.div>
        </div>

        <div className="rounded-lg border border-[#f4d7bf] bg-white/85 px-3 py-2.5 text-center text-[#9b5b2a] font-black tracking-tight">
          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 7 }}
            transition={{ duration: 0.23, delay: 1.1 }}
            className="text-[21px] sm:text-[24px] leading-[1.12]"
          >
            합성된 수라서
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 7 }}
            transition={{ duration: 0.23, delay: 1.28 }}
            className="mt-1 text-[21px] sm:text-[24px] leading-[1.12]"
          >
            본래의 수(
            <span className="inline-block rounded bg-[#e9fff6] px-1 text-[#167b5f]">
              소수
            </span>
            )로
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.6, y: 10, filter: 'blur(6px)' }}
            animate={
              enabled
                ? {
                    opacity: 1,
                    scale: [0.6, 1.16, 1],
                    y: 0,
                    filter: 'blur(0px)',
                  }
                : { opacity: 0, scale: 0.6, y: 10, filter: 'blur(6px)' }
            }
            transition={{ duration: 0.48, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mt-0.5 text-[30px] sm:text-[36px] font-black text-[#8f4b16] bg-[#ffe28a] px-1.5 rounded"
          >
            분해됨
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 7 }}
            transition={{ duration: 0.22, delay: 1.86 }}
            className="mt-1 text-[14px] sm:text-[15px] font-extrabold text-[#7a4a25]"
          >
            예) 12 = 2 × 2 × 3
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
