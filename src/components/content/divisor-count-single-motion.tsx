import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { MathInline } from '@/components/math'

const EASE = [0.16, 1, 0.3, 1] as const

interface DivisorCountSingleMotionProps {
  className?: string
  stepId?: number
}

const divisors = [
  { label: '1', tex: '1' },
  { label: '2', tex: '2' },
  { label: '2²', tex: '2^2' },
  { label: '2³', tex: '2^3' },
  { label: '2⁴', tex: '2^4' },
]

export function DivisorCountSingleMotion({
  className,
  stepId = 2,
}: DivisorCountSingleMotionProps) {
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
        ▶ <MathInline tex={'16 = 2^4'} /> 의 약수 구하기
      </motion.div>

      {/* Divisor list with staggered appearance */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-4 flex-wrap"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
      >
        {divisors.map((d, i) => (
          <motion.span
            key={d.label}
            className="inline-flex items-center justify-center min-w-[44px] h-[40px] rounded-lg bg-white border-2 border-[#1F4F8A]/20 text-[15px] font-extrabold text-[#1F4F8A] px-2 shadow-sm"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              enabled
                ? { opacity: 1, scale: [0.6, 1.1, 1] }
                : { opacity: 0, scale: 0.6 }
            }
            transition={{ duration: 0.4, delay: 0.3 + i * 0.18, ease: EASE }}
          >
            <MathInline katexFontSize="1.2em" tex={d.tex} />
          </motion.span>
        ))}
      </motion.div>

      {/* Explanation text */}
      <motion.div
        className="text-center text-[13px] font-bold text-slide-gray mb-3 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={enabled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.3 }}
      >
        약수는 <span className="text-[#E25555] font-extrabold">1</span>부터 <span className="text-[#E25555] font-extrabold">자기 자신</span>까지!
      </motion.div>

      {/* Formula highlight */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 1.5, ease: EASE }}
      >
        <span className="inline-block rounded-lg bg-[#1F4F8A] px-4 py-2.5 text-[16px] font-extrabold text-white leading-relaxed">
          <MathInline katexFontSize="1.3em" tex={'2^4'} /> 의 약수의 개수 ={' '}
          <motion.span
            className="inline-block text-[20px] text-[#ffe65c]"
            initial={{ scale: 1 }}
            animate={
              enabled
                ? { scale: [1, 1.12, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: 0.6,
              delay: 1.8,
              repeat: enabled ? Infinity : 0,
              repeatDelay: 2.4,
            }}
          >
            (4+1) = 5개
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  )
}
