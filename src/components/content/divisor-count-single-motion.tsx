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

const divisorGroups = [
  { key: 'unit', label: '1개', spanClassName: 'col-span-1' },
  { key: 'powers', label: '4개', spanClassName: 'col-span-4' },
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
        className="mb-5 flex justify-center"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
      >
        <div className="inline-grid grid-cols-5 gap-x-2 gap-y-1.5">
          {divisors.map((d, i) => (
            <motion.span
              key={d.label}
              className="inline-flex h-[40px] min-w-[44px] items-center justify-center rounded-lg border-2 border-[#1F4F8A]/20 bg-white px-2 text-[15px] font-extrabold text-[#1F4F8A] shadow-sm"
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

          {divisorGroups.map((group, i) => (
            <motion.div
              key={group.key}
              className={cn('flex flex-col items-center gap-1 pt-0.5', group.spanClassName)}
              initial={{ opacity: 0, y: 6 }}
              animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.32, delay: 1.45 + i * 0.1, ease: EASE }}
            >
              <div className="h-[3px] w-full rounded-full bg-[#1F4F8A]/45" />
              <span className="text-[11px] font-extrabold text-[#1F4F8A]/80">
                {group.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Explanation text */}
      <motion.div
        className="text-center text-[13px] font-bold text-slide-gray mb-3 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={enabled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.75 }}
      >
        약수는 <span className="text-[#E25555] font-extrabold">1</span>부터 <span className="text-[#E25555] font-extrabold">자기 자신</span>까지!
      </motion.div>

      {/* Formula highlight */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 1.95, ease: EASE }}
      >
        <span className="inline-block rounded-lg bg-[#1F4F8A] px-4 py-2.5 text-[16px] font-extrabold text-white leading-relaxed">
          <span className="inline-flex items-baseline">
            <MathInline katexFontSize="1.3em" tex={'2'} />
            <sup className="-ml-[1px] -translate-y-[0.22em] text-[0.72em] font-extrabold leading-none text-[#ffe65c]">
              4
            </sup>
          </span>{' '}
          의 약수의 개수 <br/>={' '}
          <motion.span
            className="inline-flex items-center text-[20px]"
            initial={{ scale: 1 }}
            animate={
              enabled
                ? { scale: [1, 1.12, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: 0.6,
              delay: 2.25,
              repeat: enabled ? Infinity : 0,
              repeatDelay: 2.4,
            }}
          >
            <span className="text-white">(</span>
            <span className="text-[#ffe65c]">4</span>
            <span className="text-white">+1) = </span>
            <span className="text-[#ffe65c]">5개</span>
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  )
}
