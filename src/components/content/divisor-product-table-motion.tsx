import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { MathInline } from '@/components/math'

const EASE = [0.16, 1, 0.3, 1] as const

interface DivisorProductTableMotionProps {
  className?: string
  stepId?: number
}

const row2Divisors = ['1', '2', '2^2', '2^3', '2^4']
const col3Divisors = ['1', '3', '3^2']

// The multiplication table: row[i] × col[j]
const cellValues = [
  ['1', '3', '9'],
  ['2', '6', '18'],
  ['4', '12', '36'],
  ['8', '24', '72'],
  ['16', '48', '144'],
]

export function DivisorProductTableMotion({
  className,
  stepId = 4,
}: DivisorProductTableMotionProps) {
  const { currentStep } = useSlideProgress()
  const enabled = currentStep >= stepId

  return (
    <motion.div
      className={cn('rounded-xl border-2 border-[#d9dee7] bg-[#fbfcff] px-3 py-4', className)}
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
        ▶ <MathInline tex={'144 = 2^4 \\times 3^2'} /> 의 약수
      </motion.div>

      {/* Subtitle */}
      <motion.div
        className="text-center text-[12px] font-bold text-[#2d67a8] mb-3"
        initial={{ opacity: 0 }}
        animate={enabled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <MathInline tex={'2^4'} />의 약수와 <MathInline tex={'3^2'} />의 약수의 곱이{' '}
        <MathInline tex={'144'} />의 약수!
      </motion.div>

      {/* Multiplication table */}
      <motion.div
        className="overflow-x-auto mb-3"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
      >
        <table className="mx-auto border-collapse text-[12px]">
          <thead>
            <tr>
              <th className="w-[42px] h-[32px] bg-[#e8edf5] rounded-tl-lg border border-[#d0d7e3] text-[#555A66] font-bold text-[11px]">
                ×
              </th>
              {col3Divisors.map((d) => (
                <th
                  key={d}
                  className="w-[48px] h-[32px] bg-[#E25555]/10 border border-[#d0d7e3] text-[#E25555] font-extrabold"
                >
                  <MathInline katexFontSize="1em" tex={d} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {row2Divisors.map((rd, ri) => (
              <motion.tr
                key={rd}
                initial={{ opacity: 0, x: -8 }}
                animate={enabled ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.3, delay: 0.4 + ri * 0.12, ease: EASE }}
              >
                <td className="h-[32px] bg-[#1F4F8A]/10 border border-[#d0d7e3] text-[#1F4F8A] font-extrabold text-center">
                  <MathInline katexFontSize="1em" tex={rd} />
                </td>
                {cellValues[ri].map((cell, ci) => (
                  <motion.td
                    key={`${ri}-${ci}`}
                    className="h-[32px] bg-white border border-[#d0d7e3] text-slide-gray font-bold text-center"
                    initial={{ opacity: 0 }}
                    animate={enabled ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.5 + ri * 0.12 + ci * 0.08 }}
                  >
                    {cell}
                  </motion.td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Count labels */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-3 text-[12px] font-bold"
        initial={{ opacity: 0 }}
        animate={enabled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >
        <span className="rounded bg-[#1F4F8A]/10 px-2 py-1 text-[#1F4F8A]">
          <MathInline katexFontSize="0.95em" tex={'2^4'} /> 의 약수: <span className="font-extrabold">5</span>개
        </span>
        <span className="text-slide-gray">×</span>
        <span className="rounded bg-[#E25555]/10 px-2 py-1 text-[#E25555]">
          <MathInline katexFontSize="0.95em" tex={'3^2'} /> 의 약수: <span className="font-extrabold">3</span>개
        </span>
      </motion.div>

      {/* Formula highlight */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 1.4, ease: EASE }}
      >
        <span className="inline-block rounded-lg bg-[#1F4F8A] px-4 py-2 text-[14px] font-extrabold text-white leading-relaxed">
          약수의 개수 ={' '}
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
              delay: 1.7,
              repeat: enabled ? Infinity : 0,
              repeatDelay: 2.4,
            }}
          >
            (4+1)×(2+1) = 15개
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  )
}
