import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'
import { GcdDivisionTableMotion } from '@/components/content/gcd-division-table-motion'
import { GcdPrimeFactorizationMotion } from '@/components/content/gcd-prime-factorization-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MethodTab = 'prime' | 'division'
type PrimeStep = 0 | 1 | 2 | 3 | 4 | 5
type PrimeStage = 0 | 1 | 2 | 3

interface InteractiveGcdShowcaseProps {
  className?: string
}

const methodTabs: Array<{ id: MethodTab; label: string; subtitle: string }> = [
  { id: 'prime', label: '소인수분해', subtitle: '공통 소인수와 작은 지수 고르기' },
  { id: 'division', label: '나눗셈', subtitle: '공약수로 계속 나누기' },
]

const stepLabels: Record<PrimeStep, string> = {
  0: '소인수분해',
  1: '소인수분해',
  2: '소인수분해',
  3: '소인수분해',
  4: '최대공약수 조립',
  5: '다시 보기',
}

const stepBadgeLabels: Record<PrimeStage, string> = {
  0: '준비',
  1: '분해',
  2: '스캔',
  3: '조립',
}

const primeStages: PrimeStage[] = [0, 1, 2, 3]
const tabSpring = {
  type: 'spring',
  stiffness: 320,
  damping: 24,
  mass: 0.82,
} as const

function getPrimeStage(step: PrimeStep): PrimeStage {
  if (step === 0) {
    return 0
  }
  if (step <= 3) {
    return 1
  }
  if (step === 4) {
    return 2
  }
  return 3
}

export function InteractiveGcdShowcase({
  className,
}: InteractiveGcdShowcaseProps) {
  const [activeMethod, setActiveMethod] = useState<MethodTab>('prime')
  const [primeStep, setPrimeStep] = useState<PrimeStep>(0)
  const [hoveredTab, setHoveredTab] = useState<MethodTab | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const faceTransition = prefersReducedMotion
    ? { duration: 0.16, ease: 'easeOut' as const }
    : tabSpring
  const labelTransition = prefersReducedMotion
    ? { duration: 0.14, ease: 'easeOut' as const }
    : { duration: 0.22, ease: 'easeOut' as const }
  const tabDepth = prefersReducedMotion ? 4 : 6
  const hoverPressDepth = prefersReducedMotion ? 1 : 2

  const movePrev = () => {
    setPrimeStep((prev) => Math.max(0, prev - 1) as PrimeStep)
  }

  const moveNext = () => {
    setPrimeStep((prev) => (prev === 5 ? 0 : (prev + 1) as PrimeStep))
  }

  const currentPrimeStage = getPrimeStage(primeStep)

  return (
    <div
      className={cn(
        'rounded-[24px] bg-transparent p-0',
        className,
      )}
    >
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-4">
        <div className="flex justify-center">
          <div className="rounded-[18px] bg-[#F4F9FF] px-3 py-2.5 text-center">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#7B93B0]">
              Example
            </div>
            <div className="mt-1 text-[16px] font-black text-[#1F4F8A] sm:text-[18px]">24, 30, 60</div>
            <div className="text-[12px] font-bold text-[#718099]">세 수의 최대공약수 찾기</div>
          </div>
        </div>

        <nav
          role="tablist"
          aria-label="최대공약수 풀이 방법 선택"
          className="grid grid-cols-2 gap-1.5 overflow-visible rounded-[22px] bg-[#EAF4FF] p-1.5 pb-4 pt-2 sm:gap-2 sm:rounded-[26px] sm:p-2 sm:pb-5 sm:pt-2.5"
        >
          {methodTabs.map((tab) => {
            const isActive = tab.id === activeMethod
            const isHovered = hoveredTab === tab.id
            const buttonY = isActive ? tabDepth : isHovered ? hoverPressDepth : 0
            const shadowStep = isActive ? 0 : isHovered ? 4 : 8
            const shadowBlur = isActive ? 0 : isHovered ? 12 : 18
            const surfaceColor = isActive ? '#1F4F8A' : '#F6FBFF'
            const borderColor = isActive ? '#163D69' : '#A8C5E2'
            const edgeColor = isActive ? '#0F2D4E' : '#334155'
            const ambientShadow = isActive ? 'rgba(8,26,49,0.18)' : 'rgba(15,23,42,0.2)'
            return (
              <motion.button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`gcd-showcase-panel-${tab.id}`}
                id={`gcd-showcase-tab-${tab.id}`}
                initial={false}
                onClick={() => {
                  setActiveMethod(tab.id)
                  setPrimeStep(0)
                }}
                onHoverStart={() => setHoveredTab(tab.id)}
                onHoverEnd={() => setHoveredTab((current) => (current === tab.id ? null : current))}
                onFocus={() => setHoveredTab(tab.id)}
                onBlur={() => setHoveredTab((current) => (current === tab.id ? null : current))}
                whileTap={prefersReducedMotion ? { y: tabDepth } : { y: tabDepth }}
                transition={faceTransition}
                style={{ willChange: 'transform, box-shadow' }}
                animate={{
                  y: buttonY,
                  backgroundColor: surfaceColor,
                  borderColor,
                  boxShadow: isActive
                    ? '0 0 0 #0F2D4E, inset 0 4px 10px rgba(8,26,49,0.28), inset 0 -1px 0 rgba(255,255,255,0.08)'
                    : `0 ${shadowStep}px 0 ${edgeColor}, 0 ${shadowStep + 6}px ${shadowBlur}px ${ambientShadow}`,
                  opacity: isActive && isHovered ? 0.96 : 1,
                }}
                className={cn(
                  'relative flex h-[82px] min-w-0 flex-col justify-between overflow-visible rounded-[16px] border-2 px-2.5 py-2 text-left sm:h-[90px] sm:rounded-[20px] sm:px-4 sm:py-3',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FAFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E7F3FF]',
                )}
              >
                <motion.div
                  aria-hidden="true"
                  initial={false}
                  animate={{
                    opacity: isActive ? 0.18 : 0.72,
                    backgroundColor: isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.96)',
                  }}
                  transition={labelTransition}
                  className="pointer-events-none absolute inset-x-4 top-2 h-[2px] rounded-full"
                />
                <div className="relative z-10 flex min-w-0 flex-col gap-1">
                  <motion.div
                    initial={false}
                    animate={{
                      color: isActive ? '#FFFFFF' : '#1F4F8A',
                    }}
                    transition={labelTransition}
                    className="truncate text-[13px] font-black sm:text-[15px]"
                  >
                    {tab.label}
                  </motion.div>
                  <motion.div
                    initial={false}
                    animate={{
                      color: isActive ? '#DCEEFF' : '#6B7F99',
                      opacity: isActive ? 1 : 0.92,
                    }}
                    transition={labelTransition}
                    className="break-keep text-[10px] leading-[1.25] font-bold sm:text-[12px]"
                  >
                    {tab.subtitle}
                  </motion.div>
                </div>
                <motion.div
                  aria-hidden="true"
                  initial={false}
                  animate={{
                    backgroundColor: isActive ? '#12345A' : '#D4E4F4',
                    opacity: isActive ? 0.3 : 0.55,
                  }}
                  transition={labelTransition}
                  className="pointer-events-none relative z-10 mt-2 h-[4px] w-full rounded-full"
                />
              </motion.button>
            )
          })}
        </nav>
      </div>

      {activeMethod === 'prime' ? (
        <section
          id="gcd-showcase-panel-prime"
          role="tabpanel"
          aria-labelledby="gcd-showcase-tab-prime"
        >
          <div className="mb-4 flex flex-col gap-3 rounded-[22px] border border-[#D6E8FF] bg-[#F8FBFF] px-3 py-3 sm:px-4">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <div className="shrink-0 text-[11px] font-black uppercase tracking-[0.22em] text-[#7A95B5]">
                Progress
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {primeStages.map((stageNumber) => {
                  const active = currentPrimeStage === stageNumber
                  const completed = currentPrimeStage > stageNumber
                  return (
                    <div
                      key={stageNumber}
                      className={cn(
                        'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black transition sm:px-3 sm:text-[12px]',
                        active && 'bg-[#1F4F8A] text-white',
                        !active && completed && 'bg-[#DDF0FF] text-[#2D67A8]',
                        !active && !completed && 'bg-white text-[#8A98AE]',
                      )}
                    >
                      {stepBadgeLabels[stageNumber]}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={movePrev}
                disabled={primeStep === 0}
                className={cn(
                  'rounded-full border-2 border-[#A8C5E2] bg-[#F6FBFF] px-3 font-black text-[#47688E] sm:px-4',
                  'shadow-[0_6px_0_#334155,0_12px_18px_rgba(15,23,42,0.16)] transition-[transform,box-shadow,background-color] duration-150 ease-out',
                  'hover:bg-[#F0F7FF] hover:translate-y-[2px] hover:shadow-[0_4px_0_#334155,0_8px_12px_rgba(15,23,42,0.14)]',
                  'active:translate-y-[6px] active:shadow-[0_0_0_#334155,inset_0_4px_8px_rgba(15,23,42,0.12)]',
                  'disabled:translate-y-0 disabled:border-[#D3E2F1] disabled:bg-[#F7FBFF] disabled:text-[#9AA8BC] disabled:shadow-[0_4px_0_#94A3B8,0_8px_12px_rgba(148,163,184,0.16)]',
                )}
              >
                <Play size={14} className="rotate-180" />
                이전
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={moveNext}
                className={cn(
                  'rounded-full border-2 border-[#163D69] bg-[#F6FBFF] px-3.5 font-black text-[#1F4F8A] sm:px-5',
                  'shadow-[0_6px_0_#334155,0_12px_18px_rgba(15,23,42,0.16)] transition-[transform,box-shadow,background-color] duration-150 ease-out',
                  'hover:bg-[#F0F7FF] hover:translate-y-[2px] hover:shadow-[0_4px_0_#334155,0_8px_12px_rgba(15,23,42,0.14)]',
                  'active:translate-y-[6px] active:shadow-[0_0_0_#334155,inset_0_4px_8px_rgba(15,23,42,0.12)]',
                )}
              >
                {primeStep === 5 ? <RotateCcw size={16} /> : <Play size={15} fill="currentColor" />}
                {stepLabels[primeStep]}
              </Button>
            </div>
          </div>

          <GcdPrimeFactorizationMotion step={primeStep} />
        </section>
      ) : (
        <section
          id="gcd-showcase-panel-division"
          role="tabpanel"
          aria-labelledby="gcd-showcase-tab-division"
        >
          <div className="mb-4 rounded-[22px] border border-[#D6E8FF] bg-[#F8FBFF] px-3 py-3.5 sm:px-4 sm:py-4">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#7A95B5]">
              Compare Method
            </div>
            <div className="mt-2 text-[15px] font-black text-[#1F4F8A] sm:text-[16px]">
              나눗셈 방법은 공약수로 계속 나누고, 왼쪽에 남은 수만 곱해 최대공약수를 찾습니다.
            </div>
            <div className="mt-2 text-[12px] font-bold leading-[1.65] text-[#687791] sm:text-[13px] sm:leading-[1.7]">
              이번 쇼케이스에서는 비교용으로 기존 나눗셈 모션을 그대로 보여 줍니다. 아래 카드와 소인수분해 탭을 번갈아 보며 두 방법의 공통점을 비교해 보세요.
            </div>
          </div>

          <GcdDivisionTableMotion />
        </section>
      )}
    </div>
  )
}
