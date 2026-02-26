import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'

interface PrimeEtymologyMotionProps {
  className?: string
  stepId?: number
}

export function PrimeEtymologyMotion({
  className,
  stepId = 2,
}: PrimeEtymologyMotionProps) {
  const { currentStep } = useSlideProgress()
  const enabled = currentStep >= stepId

  return (
    <motion.div
      className={cn(
        'rounded-xl border-2 border-[#9ed8c4] bg-[#f8fffb] px-3 py-3',
        className,
      )}
      initial={{ opacity: 0, y: 18 }}
      animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1.05fr_auto_1.35fr] items-center gap-3 sm:gap-2">
        <div className="rounded-lg border border-[#b8dfd2] bg-white/80 px-3 py-2.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.22, delay: 0.05 }}
                className="text-[30px] leading-none font-black text-[#17896c] tracking-tight"
              >
                소
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.24, delay: 0.3 }}
                className="mt-1 text-[40px] sm:text-[44px] leading-none font-serif text-[#222]"
              >
                素
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={enabled ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.2, delay: 0.52 }}
                className="h-5 border-l-2 border-dashed border-[#17896c] mt-0.5 origin-top"
              />
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.22, delay: 0.64 }}
                className="rounded-md border border-[#9ed8c4] bg-[#eafff6] px-2 py-1 text-[11px] font-bold text-[#245a4d] whitespace-nowrap"
              >
                본디,희다
              </motion.div>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.22, delay: 0.1 }}
                className="text-[30px] leading-none font-black text-[#17896c] tracking-tight"
              >
                수
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.24, delay: 0.38 }}
                className="mt-1 text-[40px] sm:text-[44px] leading-none font-serif text-[#222]"
              >
                數
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={enabled ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.2, delay: 0.76 }}
                className="h-5 border-l-2 border-dashed border-[#17896c] mt-0.5 origin-top"
              />
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.22, delay: 0.88 }}
                className="rounded-md border border-[#9ed8c4] bg-[#eafff6] px-2 py-1 text-[11px] font-bold text-[#245a4d] whitespace-nowrap"
              >
                number
              </motion.div>
            </div>
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
              opacity: { duration: 0.25, delay: 1.08 },
              y: { duration: 0.25, delay: 1.08 },
              scale: { duration: 0.95, delay: 1.2, repeat: enabled ? Infinity : 0, repeatDelay: 1.6 },
            }}
            className="sm:hidden text-[30px] font-black text-[#888] text-center"
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
              opacity: { duration: 0.25, delay: 1.08 },
              x: { duration: 0.25, delay: 1.08 },
              scale: { duration: 0.95, delay: 1.2, repeat: enabled ? Infinity : 0, repeatDelay: 1.6 },
            }}
            className="hidden sm:block text-[34px] font-black text-[#888] text-center"
          >
            →
          </motion.div>
        </div>

        <div className="rounded-lg border border-[#b8dfd2] bg-white/80 px-3 py-2.5 text-center text-[#17896c] font-black tracking-tight">
          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 7 }}
            transition={{ duration: 0.25, delay: 1.28 }}
            className="text-[21px] sm:text-[24px] leading-[1.15]"
          >
            아무 색도 물들이지 않은
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 7 }}
            transition={{ duration: 0.25, delay: 1.45 }}
            className="text-[21px] sm:text-[24px] leading-[1.1] mt-1"
          >
            본래의 수가,
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
            transition={{ duration: 0.48, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mt-0.5 text-[30px] sm:text-[36px] font-black text-[#0f7f63] bg-[#fff176] px-1.5 rounded"
          >
            소수
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
