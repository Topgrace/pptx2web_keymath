import type { ReactNode } from 'react'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'
import { LcmDivisionTableMotion, type LcmDivisionStep } from '@/components/content/lcm-division-table-motion'
import { LcmPrimeFactorizationMotion, type LcmPrimeStep } from '@/components/content/lcm-prime-factorization-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MethodTab = 'prime' | 'division'
type PrimeStage = 0 | 1 | 2 | 3
type DivisionStage = 0 | 1 | 2 | 3

interface InteractiveLcmShowcaseProps {
  className?: string
  completionContent?: ReactNode
}

const methodTabs: Array<{ id: MethodTab; label: string; subtitle: string }> = [
  { id: 'prime', label: '소인수분해', subtitle: '필요한 소인수를 모두 고르고 큰 지수를 선택하기' },
  { id: 'division', label: '나눗셈', subtitle: '1이 아닌 수로 나누고 마지막 몫까지 곱하기' },
]

const stepLabels: Record<LcmPrimeStep, string> = {
  0: '소인수분해',
  1: '소인수분해',
  2: '소인수분해',
  3: '세로 정렬',
  4: '소인수선택',
  5: '소인수선택',
  6: '최소공배수',
  7: '다시 보기',
}

const stepBadgeLabels: Record<PrimeStage, string> = {
  0: '준비',
  1: '분해',
  2: '스캔',
  3: '조립',
}

const divisionStepLabels: Record<LcmDivisionStep, string> = {
  0: '나눗셈 시작',
  1: '3으로 나누기',
  2: '3으로 나누기',
  3: '3으로 나누기',
  4: '2, 4, 5 확인',
  5: '두 수만 나누기',
  6: '최소공배수',
  7: '다시 보기',
}

const divisionStepBadgeLabels: Record<DivisionStage, string> = {
  0: '준비',
  1: '나누기',
  2: '판단',
  3: '정답',
}

const primeStages: PrimeStage[] = [0, 1, 2, 3]
const divisionStages: DivisionStage[] = [0, 1, 2, 3]
const tabSpring = {
  type: 'spring',
  stiffness: 320,
  damping: 24,
  mass: 0.82,
} as const

function getPrimeStage(step: LcmPrimeStep): PrimeStage {
  if (step === 0) {
    return 0
  }
  if (step <= 3) {
    return 1
  }
  if (step <= 6) {
    return 2
  }
  return 3
}

function getDivisionStage(step: LcmDivisionStep): DivisionStage {
  if (step === 0) {
    return 0
  }
  if (step <= 5) {
    return 1
  }
  if (step === 6) {
    return 2
  }
  return 3
}

export function InteractiveLcmShowcase({
  className,
  completionContent,
}: InteractiveLcmShowcaseProps) {
  const [activeMethod, setActiveMethod] = useState<MethodTab>('prime')
  const [primeStep, setPrimeStep] = useState<LcmPrimeStep>(0)
  const [divisionStep, setDivisionStep] = useState<LcmDivisionStep>(0)
  const [hasCompletedPrime, setHasCompletedPrime] = useState(false)
  const [hasCompletedDivision, setHasCompletedDivision] = useState(false)
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
    setPrimeStep((prev) => Math.max(0, prev - 1) as LcmPrimeStep)
  }

  const moveNext = () => {
    setPrimeStep((prev) => {
      if (prev === 6) {
        setHasCompletedPrime(true)
        return 7
      }
      return (prev === 7 ? 0 : prev + 1) as LcmPrimeStep
    })
  }

  const moveDivisionPrev = () => {
    setDivisionStep((prev) => Math.max(0, prev - 1) as LcmDivisionStep)
  }

  const moveDivisionNext = () => {
    setDivisionStep((prev) => {
      if (prev === 6) {
        setHasCompletedDivision(true)
        return 7
      }
      return (prev === 7 ? 0 : prev + 1) as LcmDivisionStep
    })
  }

  const currentPrimeStage = getPrimeStage(primeStep)
  const currentDivisionStage = getDivisionStage(divisionStep)
  const shouldShowDivisionHint = activeMethod === 'prime' && hasCompletedPrime && !hasCompletedDivision

  return (
    <div className={cn('rounded-[24px] bg-transparent p-0', className)}>
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-4">
        <div className="flex justify-center">
          <div className="rounded-[18px] bg-[#F4F9FF] px-3 py-2.5 text-center">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#7B93B0]">
              Example
            </div>
            <div className="mt-1 text-[16px] font-black text-[#1F4F8A] sm:text-[18px]">18, 36, 45</div>
            <div className="text-[12px] font-bold text-[#718099]">세 수의 최소공배수 찾기</div>
          </div>
        </div>

        <nav
          role="tablist"
          aria-label="최소공배수 풀이 방법 선택"
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
                aria-controls={`lcm-showcase-panel-${tab.id}`}
                id={`lcm-showcase-tab-${tab.id}`}
                initial={false}
                onClick={() => {
                  setActiveMethod(tab.id)
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
          id="lcm-showcase-panel-prime"
          role="tabpanel"
          aria-labelledby="lcm-showcase-tab-prime"
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
                {primeStep === 7 ? <RotateCcw size={16} /> : <Play size={15} fill="currentColor" />}
                {stepLabels[primeStep]}
              </Button>
            </div>
          </div>

          <LcmPrimeFactorizationMotion step={primeStep} />
        </section>
      ) : (
        <section
          id="lcm-showcase-panel-division"
          role="tabpanel"
          aria-labelledby="lcm-showcase-tab-division"
        >
          <div className="mb-4 flex flex-col gap-3 rounded-[22px] border border-[#D6E8FF] bg-[#F8FBFF] px-3 py-3 sm:px-4">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <div className="shrink-0 text-[11px] font-black uppercase tracking-[0.22em] text-[#7A95B5]">
                Progress
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {divisionStages.map((stageNumber) => {
                  const active = currentDivisionStage === stageNumber
                  const completed = currentDivisionStage > stageNumber

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
                      {divisionStepBadgeLabels[stageNumber]}
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
                onClick={moveDivisionPrev}
                disabled={divisionStep === 0}
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
                onClick={moveDivisionNext}
                className={cn(
                  'rounded-full border-2 border-[#163D69] bg-[#F6FBFF] px-3.5 font-black text-[#1F4F8A] sm:px-5',
                  'shadow-[0_6px_0_#334155,0_12px_18px_rgba(15,23,42,0.16)] transition-[transform,box-shadow,background-color] duration-150 ease-out',
                  'hover:bg-[#F0F7FF] hover:translate-y-[2px] hover:shadow-[0_4px_0_#334155,0_8px_12px_rgba(15,23,42,0.14)]',
                  'active:translate-y-[6px] active:shadow-[0_0_0_#334155,inset_0_4px_8px_rgba(15,23,42,0.12)]',
                )}
              >
                {divisionStep === 7 ? <RotateCcw size={16} /> : <Play size={15} fill="currentColor" />}
                {divisionStepLabels[divisionStep]}
              </Button>
            </div>
          </div>

          <LcmDivisionTableMotion step={divisionStep} />
        </section>
      )}

      {hasCompletedDivision ? (
        <>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="mt-5 rounded-[20px] bg-[#F4F9FF] p-4 sm:mt-6 sm:rounded-[24px] sm:p-5"
          >
            <div className="mb-3 flex items-center gap-2 text-[16px] font-black text-[#1F4F8A]">
              <motion.span
                animate={prefersReducedMotion ? { y: 0 } : { y: [0, -3, 0] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                💡
              </motion.span>
              핵심 기억하기
            </div>
            <ul className="space-y-2 text-[14px] font-bold leading-[1.8] text-[#5F6D82]">
              <li>
                <b className="text-[#1F4F8A]">소인수분해:</b> 필요한 소인수는 모두 고르고, 같은 소인수는 <b>지수가 가장 큰 것</b>을 선택해요.
              </li>
              <li>
                <b className="text-[#1F4F8A]">나눗셈:</b> <b>왼쪽의 수</b>와 <b>마지막 몫</b>을 모두 곱하면 최소공배수를 구할 수 있어요.
              </li>
            </ul>
          </motion.div>

          {completionContent ? (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.08 }}
              className="mt-5 sm:mt-6"
            >
              {completionContent}
            </motion.div>
          ) : null}
        </>
      ) : null}

      {shouldShowDivisionHint ? (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="mt-5 rounded-[18px] border border-[#F0C419] bg-[linear-gradient(180deg,#fffef7_0%,#fff3c7_100%)] px-4 py-3 text-center text-[13px] font-black leading-[1.7] text-[#9A6300] sm:mt-6"
        >
          나눗셈 탭을 눌러 다른 방법도 확인하세요.
        </motion.div>
      ) : null}
    </div>
  )
}
