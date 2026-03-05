import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { StepCard } from '@/components/cards/step-card'
import { cn } from '@/lib/utils'

interface PrimeFactorizationTermMotionProps {
  visible?: boolean
  className?: string
  children?: ReactNode
}

export function PrimeFactorizationTermMotion({
  visible = false,
  className,
  children,
}: PrimeFactorizationTermMotionProps) {
  return (
    <StepCard visible={visible} variant="white" className={cn('pt-6', className)}>
      <div className="rounded-xl border-2 border-[#dce8f5] bg-[#fbfdff] px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="rounded-lg border border-[#f5c8c8] bg-[#fff7f7] px-3 py-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.35, delay: 0.45 }}
          >
            <div className="text-base font-black text-[#232323]">소인수</div>
            <div className="text-xs font-bold text-[#e25555]">소수인 인수</div>
            <div className="text-xs font-bold text-[#e25555]">(인수=약수)</div>
          </motion.div>

          <motion.div
            className="rounded-lg border border-[#f5c8c8] bg-[#fff7f7] px-3 py-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.35, delay: 0.58 }}
          >
            <div className="text-base font-black text-[#232323]">분해</div>
            <div className="text-xs font-bold text-[#e25555]">자연수를 쪼개어</div>
            <div className="mt-1 text-xs font-bold text-[#e25555]">곱의 꼴로 나타내기</div>
          </motion.div>
        </div>

        <div className="mt-4 text-left text-[26px] font-black leading-[1.25] text-[#232323]">
          <span className="relative mr-1 inline-block">
            소인수분해
            <motion.span
              className="absolute -bottom-[4px] left-0 h-[3px] bg-[#e25555]"
              initial={{ width: 0, opacity: 0 }}
              animate={visible ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.42, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          : 자연수를 소인수의 곱으로 나타내는 것
        </div>
      </div>

      {children}
    </StepCard>
  )
}
