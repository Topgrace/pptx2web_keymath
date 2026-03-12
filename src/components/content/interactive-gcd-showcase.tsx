import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Sparkles } from 'lucide-react'
import { GcdDivisionTableMotion } from '@/components/content/gcd-division-table-motion'
import { GcdPrimeFactorizationMotion } from '@/components/content/gcd-prime-factorization-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MethodTab = 'prime' | 'division'
type PrimeStep = 0 | 1 | 2 | 3

interface InteractiveGcdShowcaseProps {
  className?: string
}

const methodTabs: Array<{ id: MethodTab; label: string; subtitle: string }> = [
  { id: 'prime', label: '소인수분해', subtitle: '공통 소인수와 작은 지수 고르기' },
  { id: 'division', label: '나눗셈', subtitle: '공약수로 계속 나누기' },
]

const stepLabels: Record<PrimeStep, string> = {
  0: '소인수분해 시작',
  1: '공통 소인수 찾기',
  2: '최대공약수 조립',
  3: '다시 보기',
}

const stepBadgeLabels: Record<PrimeStep, string> = {
  0: '준비',
  1: '분해',
  2: '스캔',
  3: '조립',
}

const primeSteps: PrimeStep[] = [0, 1, 2, 3]

export function InteractiveGcdShowcase({
  className,
}: InteractiveGcdShowcaseProps) {
  const [activeMethod, setActiveMethod] = useState<MethodTab>('prime')
  const [primeStep, setPrimeStep] = useState<PrimeStep>(0)

  const movePrev = () => {
    setPrimeStep((prev) => Math.max(0, prev - 1) as PrimeStep)
  }

  const moveNext = () => {
    setPrimeStep((prev) => (prev === 3 ? 0 : (prev + 1) as PrimeStep))
  }

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
          className="grid grid-cols-2 gap-1.5 rounded-[20px] bg-[#ECF5FF] p-1 sm:gap-2 sm:rounded-[24px] sm:p-1.5"
        >
          {methodTabs.map((tab) => {
            const isActive = tab.id === activeMethod
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`gcd-showcase-panel-${tab.id}`}
                id={`gcd-showcase-tab-${tab.id}`}
                onClick={() => {
                  setActiveMethod(tab.id)
                  setPrimeStep(0)
                }}
                className={cn(
                  'relative min-w-0 overflow-hidden rounded-[16px] px-2.5 py-2 text-left transition sm:rounded-[20px] sm:px-4 sm:py-3',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FAFFF] focus-visible:ring-offset-2',
                  !isActive && 'hover:bg-white/60',
                )}
              >
                {isActive ? (
                  <motion.div
                    layoutId="gcd-showcase-active-tab"
                    className="absolute inset-0 rounded-[16px] bg-[#1F4F8A] shadow-[0_10px_18px_rgba(31,79,138,0.18)] sm:rounded-[20px] sm:shadow-[0_12px_24px_rgba(31,79,138,0.22)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <div className="relative z-10 min-w-0">
                  <div className={cn('truncate text-[13px] font-black sm:text-[15px]', isActive ? 'text-white' : 'text-[#1F4F8A]')}>
                    {tab.label}
                  </div>
                  <div
                    className={cn(
                      'mt-0.5 break-keep text-[10px] leading-[1.25] font-bold sm:mt-1 sm:text-[12px]',
                      isActive ? 'text-[#DCEEFF]' : 'text-[#6B7F99]',
                    )}
                  >
                    {tab.subtitle}
                  </div>
                </div>
              </button>
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
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-[#D6E8FF] bg-[#F8FBFF] px-3 py-3 sm:px-4">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#7A95B5]">
                Progress
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {primeSteps.map((stepNumber) => {
                  const active = primeStep === stepNumber
                  const completed = primeStep > stepNumber
                  return (
                    <div
                      key={stepNumber}
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[11px] font-black transition sm:px-3 sm:text-[12px]',
                        active && 'bg-[#1F4F8A] text-white',
                        !active && completed && 'bg-[#DDF0FF] text-[#2D67A8]',
                        !active && !completed && 'bg-white text-[#8A98AE]',
                      )}
                    >
                      {stepBadgeLabels[stepNumber]}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={movePrev}
                disabled={primeStep === 0}
                className="rounded-full border-[#B8D5F3] bg-white px-3 font-black text-[#47688E] hover:bg-[#F0F7FF] sm:px-4"
              >
                이전
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={moveNext}
                className="rounded-full bg-[#1F4F8A] px-3.5 font-black text-white hover:bg-[#173f70] sm:px-5"
              >
                {primeStep === 3 ? <RotateCcw size={16} /> : <Sparkles size={16} />}
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
