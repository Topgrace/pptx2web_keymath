import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { MathInline } from '@/components/math'

const EASE = [0.16, 1, 0.3, 1] as const

interface DivisorDefinitionMotionProps {
  className?: string
  stepId?: number
}

export function DivisorDefinitionMotion({
  className,
  stepId = 1,
}: DivisorDefinitionMotionProps) {
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
        ▶ 약수란?
      </motion.div>

      {/* Definition: a = b × c */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
      >
        <span className="inline-block rounded-lg bg-[#1F4F8A] px-4 py-2.5 text-[16px] font-extrabold text-white leading-relaxed">
          <MathInline katexFontSize="1.4em" tex={'a = b \\times c'} /> 일 때
          <br />
          <motion.span
            className="inline-block text-[17px] text-[#ffe65c]"
            initial={{ scale: 1 }}
            animate={
              enabled
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: 0.6,
              delay: 0.8,
              repeat: enabled ? Infinity : 0,
              repeatDelay: 2.4,
            }}
          >
            b, c는 a의 약수!
          </motion.span>
        </span>
      </motion.div>

      {/* Arrow relationship diagram */}
      <motion.div
        className="mx-auto rounded-lg bg-[#f5f5f5] px-3 py-3 mb-3"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
      >
        <div className="flex items-center justify-center gap-4 text-[13px] font-bold text-slide-gray">
          <div className="text-center">
            <div className="text-[#2d67a8] font-extrabold mb-1">b의 배수</div>
            <div className="text-[10px] text-slide-gray">↕</div>
            <div className="text-[#E25555] font-extrabold mt-1">a의 약수</div>
          </div>
          <div className="text-slide-gray text-lg">·</div>
          <div className="text-center">
            <div className="text-[#2d67a8] font-extrabold mb-1">c의 배수</div>
            <div className="text-[10px] text-slide-gray">↕</div>
            <div className="text-[#E25555] font-extrabold mt-1">a의 약수</div>
          </div>
        </div>
      </motion.div>

      {/* Example: 20 = 4 × 5 */}
      <motion.div
        className="mx-auto rounded-lg bg-[#f5f5f5] px-3 py-3"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.8, ease: EASE }}
      >
        <div className="flex items-start gap-1">
          <span className="shrink-0 rounded bg-[#2d67a8] px-1.5 py-0.5 text-[11px] font-bold text-white">예</span>
          <div className="text-[14px] font-bold text-slide-gray leading-[2]">
            <MathInline tex={'20 = 4 \\times 5'} />
            <br />
            → 20은 <span className="text-[#2d67a8] font-extrabold">4의 배수</span>이자 <span className="text-[#2d67a8] font-extrabold">5의 배수</span>
            <br />
            → <span className="text-[#E25555] font-extrabold">4</span>와 <span className="text-[#E25555] font-extrabold">5</span>는 20의 <span className="text-[#E25555] font-extrabold">약수</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
