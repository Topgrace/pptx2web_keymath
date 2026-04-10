import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const START_FORCE = 30
const TARGET_NET_FORCE = 20
const AUTO_ADVANCE_DELAY_MS = 1000

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function signed(value: number) {
  return value > 0 ? `+${value}` : `${value}`
}

export function NegativeTugOfWarStage({
  className,
  stepId = 4,
}: {
  className?: string
  stepId?: number
}) {
  const [rightForce, setRightForce] = useState(START_FORCE)
  const [leftForce, setLeftForce] = useState(START_FORCE)
  const [missionCleared, setMissionCleared] = useState(false)
  const clearTimerRef = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const {
    advanceStep,
    currentStep,
    isSolved,
    markSolved,
    showAllSteps,
    totalSteps,
  } = useSlideProgress()

  const solved = isSolved(stepId)
  const netForce = rightForce - leftForce
  const cancelAmount = Math.min(rightForce, leftForce)
  const ropeOffset = clamp(netForce * 1.8, -96, 96)

  useEffect(() => {
    if (netForce === TARGET_NET_FORCE && !missionCleared) {
      setMissionCleared(true)
    }
  }, [missionCleared, netForce])

  useEffect(() => {
    if (!missionCleared || solved) return
    markSolved(stepId)
  }, [markSolved, missionCleared, solved, stepId])

  useEffect(() => {
    if (!missionCleared) return undefined
    if (showAllSteps) return undefined
    if (currentStep !== stepId || currentStep >= totalSteps - 1) return undefined

    clearTimerRef.current = window.setTimeout(() => {
      advanceStep()
    }, AUTO_ADVANCE_DELAY_MS)

    return () => {
      if (clearTimerRef.current) {
        window.clearTimeout(clearTimerRef.current)
      }
    }
  }, [advanceStep, currentStep, missionCleared, showAllSteps, stepId, totalSteps])

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) {
        window.clearTimeout(clearTimerRef.current)
      }
    }
  }, [])

  const reaction = useMemo(() => {
    if (missionCleared) {
      return {
        badge: 'MISSION CLEAR',
        badgeTone: 'bg-[#EEF8EE] text-[#39623C]',
        cardTone: 'bg-[linear-gradient(180deg,#F5FFF5_0%,#E2F6E2_100%)]',
        title: '오른쪽으로 +20 완성!',
        body: '서로 반대 방향의 힘은 양수와 음수로 표현하고, 만나면 서로 상쇄할 수 있어요.',
      }
    }

    if (netForce < TARGET_NET_FORCE) {
      return {
        badge: 'KEEP TUNING',
        badgeTone: 'bg-[#F4FAF1] text-[#4A754A]',
        cardTone: 'bg-[linear-gradient(180deg,#F8FCF7_0%,#EEF7EE_100%)]',
        title: '오른쪽 힘이 아직 부족해요',
        body: '오른쪽 힘을 더 키우거나 왼쪽 힘을 줄여서 +20을 만들어 보세요.',
      }
    }

    return {
      badge: 'TOO FAR',
      badgeTone: 'bg-[#FFF8EA] text-[#A36D12]',
      cardTone: 'bg-[linear-gradient(180deg,#FFFDF5_0%,#FFF4D8_100%)]',
      title: '조금만 줄이면 목표예요',
      body: '지금은 +20보다 커요. 오른쪽 힘을 줄이거나 왼쪽 힘을 키워 보세요.',
    }
  }, [missionCleared, netForce])

  return (
    <div className={cn('grid gap-5 lg:grid-cols-[0.92fr_1.08fr]', className)}>
      <div className="flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F1F7EC] px-4 py-2 text-[12px] font-black tracking-[0.18em] text-[#437148]">
            TUG MISSION
          </div>

          <h3 className="mt-4 text-[25px] font-black leading-[1.35] text-[#2D3A2E] sm:text-[30px]">
            반대 방향의 힘은
            <br />
            서로 상쇄될 수 있어요
          </h3>

          <p className="mt-3 text-[15px] font-bold leading-[1.8] text-[#637264]">
            목표는 밧줄을 <span className="text-[#1F4F8A]">오른쪽으로 +20</span> 움직이는 거예요.
            <br />
            왼쪽 힘은 음수, 오른쪽 힘은 양수라고 생각하고
            <br />
            힘을 조절해 보세요.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {[
            {
              label: '왼쪽 팀',
              value: leftForce,
              display: signed(-leftForce),
              color: 'text-[#D94F4F]',
              minus: () => setLeftForce((prev) => clamp(prev - 10, 0, 100)),
              plus: () => setLeftForce((prev) => clamp(prev + 10, 0, 100)),
            },
            {
              label: '오른쪽 팀',
              value: rightForce,
              display: signed(rightForce),
              color: 'text-[#1F4F8A]',
              minus: () => setRightForce((prev) => clamp(prev - 10, 0, 100)),
              plus: () => setRightForce((prev) => clamp(prev + 10, 0, 100)),
            },
          ].map((team) => (
            <div key={team.label} className="rounded-[20px] border-2 border-[#D6E7D6] bg-white px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="text-[15px] font-black text-[#455846]">{team.label}</div>
                <div className={cn('text-[24px] font-black', team.color)}>{team.display}</div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={team.minus}
                  disabled={missionCleared}
                  className="rounded-xl border-2 py-5 font-black"
                >
                  -10
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={team.plus}
                  disabled={missionCleared}
                  className="rounded-xl border-2 py-5 font-black"
                >
                  +10
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border-2 border-[#DCEBD9] bg-[#F7FCF6] p-4 sm:p-5">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={cn('rounded-[24px] px-5 py-5 text-center transition-colors duration-300', reaction.cardTone)}
        >
          <div className="flex items-center justify-center gap-2">
            <div className={cn('rounded-full px-3 py-1 text-[12px] font-black tracking-[0.14em]', reaction.badgeTone)}>
              {reaction.badge}
            </div>
            {missionCleared && (
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.84, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-[12px] font-black text-[#39623C]"
              >
                <CheckCircle2 size={14} />
                NEXT STEP
              </motion.div>
            )}
          </div>

          <div className="mt-3 text-[32px] font-black leading-none text-[#2E3F2F] sm:text-[40px]">
            {signed(rightForce)} + ({signed(-leftForce)}) = {signed(netForce)}
          </div>
          <div className="mt-2 text-[15px] font-black text-[#506550]">{reaction.title}</div>
          <div className="mt-2 text-[14px] font-bold leading-[1.75] text-[#667766]">{reaction.body}</div>
        </motion.div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            <div className="rounded-[18px] bg-white px-4 py-3 text-[14px] font-bold leading-[1.75] text-[#516351]">
              목표 순힘:
              <span className="ml-2 font-black text-[#1F4F8A]">+20</span>
              <br />
              상쇄된 힘:
              <span className="ml-2 font-black text-[#4E8454]">{cancelAmount}</span>
            </div>

            <div className="rounded-[18px] border-2 border-dashed border-[#CFE3CF] bg-[#F4FBF4] px-4 py-3 text-[13px] font-black leading-[1.75] text-[#587058]">
              오른쪽 힘은 <span className="text-[#1F4F8A]">양수</span>,
              <br />
              왼쪽 힘은 <span className="text-[#D94F4F]">음수</span>라고 보면
              <br />
              서로 만나며 일부가 상쇄돼요.
            </div>
          </div>

          <div className="relative rounded-[26px] bg-[linear-gradient(180deg,#EEF7EE_0%,#E5F1E5_100%)] px-4 py-8">
            <div className="absolute left-1/2 top-4 h-[72px] w-[4px] -translate-x-1/2 rounded-full bg-[#768D76]" />
            <div className="mb-5 text-center text-[13px] font-black text-[#5F725F]">기준점 0</div>

            <div className="relative h-[140px]">
              <motion.div
                animate={{ x: ropeOffset }}
                transition={prefersReducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 180, damping: 22 }}
                className="absolute left-1/2 top-1/2 flex w-[320px] max-w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[38px]">👾</div>
                  <div className="rounded-full bg-[#FFF1F1] px-3 py-1 text-[12px] font-black text-[#D94F4F]">
                    {signed(-leftForce)}
                  </div>
                </div>

                <div className="relative mx-3 flex-1">
                  <div className="h-[8px] rounded-full bg-[#C9A26D]" />
                  <div className="absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#A76B35]" />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="text-[38px]">🤖</div>
                  <div className="rounded-full bg-[#EEF5FF] px-3 py-1 text-[12px] font-black text-[#1F4F8A]">
                    {signed(rightForce)}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-5 rounded-[18px] px-4 py-4 text-center text-[15px] font-black leading-[1.8]',
            missionCleared
              ? 'border-2 border-[#A9D3A8] bg-[#EEF8EE] text-[#39623C]'
              : 'border-2 border-[#C7DFC6] bg-[#F5FBF5] text-[#4E6A50]',
          )}
        >
          {missionCleared ? (
            <>
              반대 방향의 힘은 양수와 음수로 표현하고,
              <br />
              만나면 서로 상쇄된다.
            </>
          ) : (
            <>
              밧줄을 오른쪽으로 +20 움직여
              <br />
              줄다리기 미션을 클리어해 보세요.
            </>
          )}
        </div>
      </div>
    </div>
  )
}
