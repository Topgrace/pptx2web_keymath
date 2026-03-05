import { useEffect, useState, type ReactNode } from 'react'
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
  const [showFactorTooltip, setShowFactorTooltip] = useState(false)

  useEffect(() => {
    if (!showFactorTooltip) return

    const handlePointerDown = () => {
      setShowFactorTooltip(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [showFactorTooltip])

  return (
    <StepCard visible={visible} variant="white" className={cn('pt-6', className)}>
      <div className="rounded-xl bg-[#fbfdff] px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="rounded-lg bg-[#fff7f7] px-3 py-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.35, delay: 0.45 }}
          >
            <div className="text-base font-black text-[#232323]">소인수</div>
            <div className="text-xs font-bold text-[#e25555]">소수인 인수</div>
            <div className="relative text-xs font-bold text-[#e25555]">
              <span>(인수=약수)</span>
              <button
                type="button"
                className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#e25555] text-[10px] leading-none text-white"
                onClick={() => setShowFactorTooltip((prev) => !prev)}
                aria-expanded={showFactorTooltip}
                aria-label="인수와 약수 설명 보기"
              >
                *
              </button>
              {showFactorTooltip ? (
                <div className="absolute left-1/2 top-full z-10 mt-2 w-[210px] -translate-x-1/2 rounded-md bg-[#263446] px-2.5 py-2 text-left text-[11px] font-medium leading-snug text-white shadow-[0_6px_14px_rgba(0,0,0,0.2)]">
                  약수(divisor)와 인수(factor)는 의미가 같다. 약수는 나눗셈에서, 인수는 곱셈에서
                  나온 용어일 뿐 같은 의미라고 생각해도 무방하다.
                </div>
              ) : null}
            </div>
            <div className="mt-1 space-y-0.5 text-[11px] font-semibold leading-relaxed text-[#e25555]">
              <div className="text-[#232323]">예: 2,3은 12의 소인수이다.</div>
              <div className="text-[#232323]">4는 12의 소인수가 아니라 인수(약수)이다.</div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-lg bg-[#fff7f7] px-3 py-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.35, delay: 0.58 }}
          >
            <div className="text-base font-black text-[#232323]">분해</div>
            <div className="text-xs font-bold text-[#e25555]">여기서는 자연수를 쪼개어</div>
            <div className="mt-1 text-xs font-bold text-[#e25555]">곱의 꼴로 나타내기</div>
          </motion.div>
        </div>

        <motion.div
          className="mt-4 text-center text-[#232323]"
          initial={{ opacity: 0, y: 8 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.35, delay: 1.05 }}
        >
          <div className="text-[28px] font-black leading-[1.2]">
            <span className="relative inline-block">
              소인수분해
              <motion.span
                className="absolute -bottom-[4px] left-0 h-[3px] bg-[#e25555]"
                initial={{ width: 0, opacity: 0 }}
                animate={visible ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{ duration: 0.42, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </div>
          <div className="mt-2 text-[18px] font-serif font-semibold leading-[1.35]">
            자연수를 소인수의 곱으로 나타내는 것
          </div>
        </motion.div>
      </div>

      {children ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.35, delay: 1.65 }}
        >
          {children}
        </motion.div>
      ) : null}
    </StepCard>
  )
}
