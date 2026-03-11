import { motion } from 'framer-motion'
import { MathInline } from '@/components/math'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

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
      <motion.div
        className="mb-3 text-center text-[14px] font-bold text-slide-gray"
        initial={{ opacity: 0 }}
        animate={enabled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        ▶ 약수란?
      </motion.div>

      <motion.div
        className="mb-4 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
      >
        <span className="inline-block rounded-lg bg-[#1F4F8A] px-4 py-2.5 text-[16px] font-extrabold leading-relaxed text-white">
          <MathInline katexFontSize="1.4em" tex={'a = b \\times c'} /> 이면
          <br />
          <motion.span
            className="inline-block text-[17px] text-[#ffe65c]"
            initial={{ scale: 1 }}
            animate={enabled ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              repeat: enabled ? Infinity : 0,
              repeatDelay: 2.4,
            }}
          >
            <MathInline tex="b" className="align-baseline" />, <MathInline tex="c" className="align-baseline" />는{' '}
            <MathInline tex="a" className="align-baseline" />의 약수!
          </motion.span>
          <br />
          <motion.span
            className="inline-block text-[17px] text-[#ffe65c]"
            initial={{ scale: 1 }}
            animate={enabled ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              repeat: enabled ? Infinity : 0,
              repeatDelay: 2.4,
            }}
          >
            <MathInline tex="a" className="align-baseline" />는 <MathInline tex="b" className="align-baseline" />의
            배수, <MathInline tex="c" className="align-baseline" />의 배수
          </motion.span>
        </span>
      </motion.div>

      <motion.div
        className="mx-auto rounded-lg bg-[#f5f5f5] px-3 py-3"
        initial={{ opacity: 0, y: 8 }}
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.8, ease: EASE }}
      >
        <div className="flex items-start gap-1">
          <span className="shrink-0 rounded bg-[#2d67a8] px-1.5 py-0.5 text-[11px] font-bold text-white">예</span>
          <div className="text-[14px] font-bold leading-[2] text-slide-gray">
            <MathInline tex={'20 = 4 \\times 5'} />
            <br />
            즉 20은 <span className="font-extrabold text-[#2d67a8]">4의 배수</span>이자{' '}
            <span className="font-extrabold text-[#2d67a8]">5의 배수</span>
            <br />
            → <span className="font-extrabold text-[#E25555]">4</span>와{' '}
            <span className="font-extrabold text-[#E25555]">5</span>는 20의{' '}
            <span className="font-extrabold text-[#E25555]">약수</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
