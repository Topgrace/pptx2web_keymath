import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Thermometer } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MIN_TEMPERATURE = -40
const MAX_TEMPERATURE = 40
const START_TEMPERATURE = 20
const STEP_AMOUNT = 5
const TARGET_TEMPERATURE = -40
const AUTO_ADVANCE_DELAY_MS = 1000

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function formatTemperature(value: number) {
  return `${value > 0 ? '+' : ''}${value}℃`
}

export function NegativeTemperatureStage({
  className,
  stepId = 1,
}: {
  className?: string
  stepId?: number
}) {
  const [temperature, setTemperature] = useState(START_TEMPERATURE)
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
  const progress = ((temperature - MIN_TEMPERATURE) / (MAX_TEMPERATURE - MIN_TEMPERATURE)) * 100

  useEffect(() => {
    if (temperature === TARGET_TEMPERATURE && !missionCleared) {
      setMissionCleared(true)
    }
  }, [missionCleared, temperature])

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

  const canIncrease = !missionCleared && temperature < MAX_TEMPERATURE
  const canDecrease = !missionCleared && temperature > MIN_TEMPERATURE
  const isBelowZero = temperature < 0

  const reaction = useMemo(() => {
    if (missionCleared) {
      return {
        badge: 'MISSION CLEAR',
        badgeTone: 'bg-[#E7F8F0] text-[#23734E]',
        cardTone: 'bg-[linear-gradient(180deg,#E5F7FF_0%,#C8ECFF_100%)]',
        bearText: '시원해서 행복해요!',
        body: '영하 40℃에 도달했어요. 0보다 낮은 온도를 나타내려면 음수가 꼭 필요해요.',
        bearMood: '🐻‍❄️',
        effect: '❄️❄️❄️',
      }
    }

    if (temperature > 10) {
      return {
        badge: 'TOO HOT',
        badgeTone: 'bg-[#FFF0E3] text-[#B55B16]',
        cardTone: 'bg-[linear-gradient(180deg,#FFF1D7_0%,#FFD79C_100%)]',
        bearText: '너무 더워요...',
        body: '지금은 20℃라서 북극곰이 힘들어해요. 온도를 내려 시원하게 해 주세요.',
        bearMood: '🥵',
        effect: '☀️',
      }
    }

    if (temperature >= 0) {
      return {
        badge: 'NEAR ZERO',
        badgeTone: 'bg-[#F3F7FF] text-[#4567A0]',
        cardTone: 'bg-[linear-gradient(180deg,#F4F8FF_0%,#E5EEFF_100%)]',
        bearText: '조금 나아졌어요.',
        body: '0℃는 기준점이에요. 이제 이보다 더 낮은 온도로 내려가 보세요.',
        bearMood: '😮‍💨',
        effect: '💧',
      }
    }

    return {
      badge: 'BELOW ZERO',
      badgeTone: 'bg-[#EAF7FF] text-[#19649A]',
      cardTone: 'bg-[linear-gradient(180deg,#E7F6FF_0%,#CFEFFF_100%)]',
      bearText: '이제 시원해졌어요!',
      body: '0보다 낮은 상태로 내려왔어요. 숫자는 -5, -10처럼 음수로 바뀌어요.',
      bearMood: '🙂',
      effect: '❄️',
    }
  }, [missionCleared, temperature])

  return (
    <div className={cn('grid gap-5 lg:grid-cols-[0.92fr_1.08fr]', className)}>
      <div className="flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E7F6FF] px-4 py-2 text-[12px] font-black tracking-[0.18em] text-[#26638E]">
            <Thermometer size={16} />
            POLAR BEAR MISSION
          </div>

          <h3 className="mt-4 text-[25px] font-black leading-[1.35] text-[#203245] sm:text-[30px]">
            0도 아래를 나타낼
            <br />
            새로운 수가 필요해요
          </h3>

          <p className="mt-3 text-[15px] font-bold leading-[1.8] text-[#5A6B78]">
            지금은 <span className="text-[#C96418]">20℃</span>라서 북극곰이 너무 더워해요.
            <br />
            온도를 내려서 <span className="text-[#1566A5]">영하 40℃</span>까지 도달하면
            <br />
            미션이 클리어됩니다.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] bg-[#F5FBFF] px-4 py-4 text-[14px] font-bold leading-[1.75] text-[#4E6575]">
            목표 온도:
            <span className="ml-2 font-black text-[#1566A5]">{formatTemperature(TARGET_TEMPERATURE)}</span>
            <br />
            <span className="font-black text-[#1F4F8A]">0℃</span>를 지나 더 낮아질수록
            <span className="ml-1 font-black text-[#1566A5]">음수</span>가 필요해져요.
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={() => setTemperature((prev) => clamp(prev + STEP_AMOUNT, MIN_TEMPERATURE, MAX_TEMPERATURE))}
              disabled={!canIncrease}
              className="rounded-2xl bg-[#F7A64A] py-6 text-[14px] font-black text-white hover:bg-[#EB9837] disabled:bg-[#F1C691]"
            >
              온도 올리기
              <br />
              (+5℃)
            </Button>
            <Button
              type="button"
              onClick={() => setTemperature((prev) => clamp(prev - STEP_AMOUNT, MIN_TEMPERATURE, MAX_TEMPERATURE))}
              disabled={!canDecrease}
              className="rounded-2xl bg-[#3C93D2] py-6 text-[14px] font-black text-white hover:bg-[#2F85C3] disabled:bg-[#93C7EA]"
            >
              온도 내리기
              <br />
              (-5℃)
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border-2 border-[#C5DDEC] bg-[#F8FCFF] p-4 sm:p-5">
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
                className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[12px] font-black text-[#23734E]"
              >
                <CheckCircle2 size={14} />
                NEXT STEP
              </motion.div>
            )}
          </div>

          <div
            className={cn(
              'mt-3 text-[38px] font-black leading-none sm:text-[52px]',
              missionCleared ? 'text-[#1566A5]' : isBelowZero ? 'text-[#1A6EA8]' : 'text-[#C96418]',
            )}
          >
            {formatTemperature(temperature)}
          </div>

          <div className="mt-2 text-[15px] font-black text-[#486273]">{reaction.bearText}</div>
          <div className="mt-2 text-[14px] font-bold leading-[1.75] text-[#587182]">{reaction.body}</div>
        </motion.div>

        <div className="mt-5 grid items-center gap-4 sm:grid-cols-[92px_minmax(0,1fr)] sm:gap-6">
          <div className="relative mx-auto h-[300px] w-[92px] shrink-0">
            <div className="absolute left-1/2 top-2 h-[248px] w-8 -translate-x-1/2 rounded-full border-4 border-[#315872] bg-[#DDEAF2]">
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 rounded-full transition-colors duration-300',
                  isBelowZero ? 'bg-[linear-gradient(180deg,#67C3FF_0%,#2D8DDD_100%)]' : 'bg-[linear-gradient(180deg,#FFB35A_0%,#E65353_100%)]',
                )}
                style={{ height: `${progress}%` }}
              />

              <motion.div
                animate={{ bottom: `calc(${progress}% - 18px)` }}
                transition={prefersReducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 260, damping: 24 }}
                className="absolute left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border-4 border-white bg-[#1F4F8A] shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
              />
            </div>

            <div className="absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border-[6px] border-[#315872] bg-white" />

            {[40, 20, 0, -20, -40].map((value) => {
              const markerProgress = ((value - MIN_TEMPERATURE) / (MAX_TEMPERATURE - MIN_TEMPERATURE)) * 100
              return (
                <div
                  key={value}
                  className="absolute right-full mr-3 flex items-center gap-2"
                  style={{ bottom: `calc(${markerProgress}% - 3px)` }}
                >
                  <div className="h-[2px] w-4 rounded-full bg-[#7A94A8]" />
                  <div
                    className={cn(
                      'text-[13px] font-black',
                      value === 0 ? 'text-[#1F4F8A]' : value < 0 ? 'text-[#1566A5]' : 'text-[#607181]',
                    )}
                  >
                    {formatTemperature(value)}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-3">
            <motion.div
              animate={
                missionCleared
                  ? { scale: 1 }
                  : temperature > 10
                    ? { rotate: [0, -2, 2, -2, 0], y: [0, -2, 0, -2, 0] }
                    : { scale: 1 }
              }
              transition={
                missionCleared
                  ? { duration: 0.2 }
                  : temperature > 10 && !prefersReducedMotion
                    ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.2 }
              }
              className={cn(
                'rounded-[24px] border-2 px-4 py-5 text-center',
                missionCleared ? 'border-[#9FD3F0] bg-[#F3FBFF]' : 'border-[#D8E7F2] bg-white',
              )}
            >
              <div className="text-[66px] leading-none">{reaction.bearMood}</div>
              <div className="mt-3 text-[17px] font-black text-[#395164]">북극곰 상태</div>
              <div className="mt-2 text-[14px] font-bold leading-[1.75] text-[#5B7180]">
                {temperature > 10 && '지금은 너무 더워서 얼음이 필요해요.'}
                {temperature <= 10 && temperature >= 0 && '조금 시원해졌지만 아직 0℃보다 위예요.'}
                {temperature < 0 && !missionCleared && '0보다 낮은 온도로 내려왔어요. 이제 음수가 등장해요.'}
                {missionCleared && '북극곰이 편안한 온도에 도착했어요.'}
              </div>
              <div className="mt-3 text-[24px]">{reaction.effect}</div>
            </motion.div>

            <div className="rounded-[18px] border-2 border-dashed border-[#BCD8EA] bg-[#F3FAFF] px-4 py-3 text-[13px] font-black leading-[1.75] text-[#4B6778]">
              <span className="text-[#1F4F8A]">0℃</span>는 기준점이에요.
              <br />
              그보다 낮아지면 숫자는
              <span className="mx-1 text-[#1566A5]">-5, -10, -15...</span>
              처럼 음수로 바뀝니다.
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-5 rounded-[18px] px-4 py-4 text-center text-[15px] font-black leading-[1.8]',
            missionCleared
              ? 'border-2 border-[#99D0EE] bg-[#EAF7FF] text-[#24597A]'
              : 'border-2 border-[#B8D3E8] bg-[#F4F9FF] text-[#305C7B]',
          )}
        >
          {missionCleared ? (
            <>
              0보다 낮은 온도를 나타내기 위해
              <br />
              음수가 필요해요.
            </>
          ) : (
            <>
              온도를 더 내려서
              <br />
              영하 40℃ 미션을 클리어해 보세요.
            </>
          )}
        </div>
      </div>
    </div>
  )
}
