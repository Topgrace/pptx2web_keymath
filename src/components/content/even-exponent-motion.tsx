import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { MathInline } from '@/components/math'

const EASE = [0.16, 1, 0.3, 1] as const

interface EvenExponentMotionProps {
  className?: string
  stepId?: number
}

export function EvenExponentMotion({
  className,
  stepId = 2,
}: EvenExponentMotionProps) {
  const { currentStep } = useSlideProgress()
  const enabled = currentStep >= stepId

  return (
    <motion.div
      className={cn('rounded-xl border-2 border-[#d9dee7] bg-[#fbfcff] px-4 py-5', className)}
      initial={{ opacity: 0, y: 16 }}
      animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {/* Title */}
      <motion.div
        className="text-center text-[14px] font-bold text-slide-gray mb-3"
        initial={{ opacity: 0 }}
        animate={enabled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        ▶ 제곱인 수는~
      </motion.div>

      {/* Key insight */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.9, ease: EASE }}
      >
        <span className="inline-block rounded-lg bg-[#1F4F8A] px-4 py-2.5 text-[16px] font-extrabold text-white leading-relaxed">
          소인수분해했을 때
          <br />
          <motion.span
            className="inline-block text-[20px] text-[#ffe65c]"
            initial={{ scale: 1 }}
            animate={
              enabled
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: 0.6,
              delay: 1.3,
              repeat: enabled ? Infinity : 0,
              repeatDelay: 2.4,
            }}
          >
            모든 지수가 짝수!
          </motion.span>
        </span>
      </motion.div>

      {/* Example: 36 = 2² × 3² */}
      <motion.div
        className="flex items-center justify-center gap-1 text-[18px] font-extrabold text-slide-gray mb-3"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
      >
        <MathInline katexFontSize="1.6em" tex={'36 = 2'} />
        <ExponentHighlight enabled={enabled} delay={0.55} value="2" />
        <MathInline katexFontSize="1.6em" tex={'\\times \\, 3'} />
        <ExponentHighlight enabled={enabled} delay={0.7} value="2" />
      </motion.div>

      {/* Example: 144 = 12² = 2⁴ × 3² */}
      <motion.div
        className="flex items-center justify-center gap-1 text-[18px] font-extrabold text-slide-gray mb-2"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.85, ease: EASE }}
      >
        <MathInline katexFontSize="1.6em" tex={'144 = 2'} />
        <ExponentHighlight enabled={enabled} delay={1.2} value="4" />
        <MathInline katexFontSize="1.6em" tex={'\\times \\, 3'} />
        <ExponentHighlight enabled={enabled} delay={1.35} value="2" />
      </motion.div>
    </motion.div>
  )
}

function ExponentHighlight({
  enabled,
  delay,
  value,
}: {
  enabled: boolean
  delay: number
  value: string
}) {
  return (
    <motion.span
      className="relative inline-flex items-start -ml-1"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        enabled
          ? { opacity: 1, scale: [0.5, 1.15, 1] }
          : { opacity: 0, scale: 0.5 }
      }
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#ffe65c] text-[16px] font-black text-[#1f1f24] -mt-2.5">
        {value}
      </span>
    </motion.span>
  )
}
