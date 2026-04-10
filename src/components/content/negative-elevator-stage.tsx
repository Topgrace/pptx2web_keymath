import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUp, CheckCircle2 } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const FLOORS = [3, 2, 1, 0, -1, -2, -3] as const
const START_FLOOR = 1
const TARGET_FLOOR = -3
const AUTO_ADVANCE_DELAY_MS = 1000

function floorLabel(floor: number) {
  if (floor > 0) return `${floor}층`
  if (floor === 0) return '0층'
  return `${floor}층`
}

function basementLabel(floor: number) {
  if (floor >= 0) return floorLabel(floor)
  return `B${Math.abs(floor)} / ${floor}층`
}

export function NegativeElevatorStage({
  className,
  stepId = 2,
}: {
  className?: string
  stepId?: number
}) {
  const [currentFloor, setCurrentFloor] = useState<(typeof FLOORS)[number]>(START_FLOOR)
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
  const currentIndex = FLOORS.indexOf(currentFloor)
  const targetIndex = FLOORS.indexOf(TARGET_FLOOR)
  const cabinTop = currentIndex * 52 + 10
  const targetTop = targetIndex * 52 + 10

  useEffect(() => {
    if (currentFloor === TARGET_FLOOR && !missionCleared) {
      setMissionCleared(true)
    }
  }, [currentFloor, missionCleared])

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

  const canMoveUp = !missionCleared && currentFloor < 3
  const canMoveDown = !missionCleared && currentFloor > -3

  const reaction = useMemo(() => {
    if (missionCleared) {
      return {
        badge: 'MISSION CLEAR',
        badgeTone: 'bg-[#EAF7FF] text-[#25618B]',
        cardTone: 'bg-[linear-gradient(180deg,#E9F4FF_0%,#D7E9FF_100%)]',
        title: 'B3에 도착했어요!',
        body: '0층 아래쪽으로 내려가려면 -1층, -2층, -3층처럼 음수가 필요해요.',
      }
    }

    if (currentFloor > 0) {
      return {
        badge: 'ABOVE GROUND',
        badgeTone: 'bg-[#EEF2FF] text-[#4357A5]',
        cardTone: 'bg-[linear-gradient(180deg,#F5F8FF_0%,#E9EFFF_100%)]',
        title: '아직 지표면 위예요',
        body: '0층을 지나 아래로 내려가야 음수 층이 나타나요.',
      }
    }

    if (currentFloor === 0) {
      return {
        badge: 'GROUND ZERO',
        badgeTone: 'bg-[#F7F8FD] text-[#50617A]',
        cardTone: 'bg-[linear-gradient(180deg,#FAFBFF_0%,#F0F4FC_100%)]',
        title: '여기가 기준점 0층',
        body: '이제 한 층만 더 내려가도 음수 층으로 들어가요.',
      }
    }

    return {
      badge: 'BELOW GROUND',
      badgeTone: 'bg-[#FFF0F0] text-[#C75252]',
      cardTone: 'bg-[linear-gradient(180deg,#FFF7F7_0%,#FFEAEA_100%)]',
      title: '음수 층으로 내려왔어요',
      body: '0층 아래는 -1층, -2층처럼 음수로 나타내요. 목표인 B3까지 가 보세요.',
    }
  }, [currentFloor, missionCleared])

  return (
    <div className={cn('grid gap-5 lg:grid-cols-[0.92fr_1.08fr]', className)}>
      <div className="flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F5FF] px-4 py-2 text-[12px] font-black tracking-[0.18em] text-[#4257A6]">
            <ArrowDown size={16} />
            ELEVATOR MISSION
          </div>

          <h3 className="mt-4 text-[25px] font-black leading-[1.35] text-[#26354B] sm:text-[30px]">
            기준점의 아래쪽,
            <br />
            반대 방향은 음수예요
          </h3>

          <p className="mt-3 text-[15px] font-bold leading-[1.8] text-[#5D6C7C]">
            지금은 <span className="text-[#334BAE]">1층</span>에 있어요.
            <br />
            아래로 내려가서 <span className="text-[#D95B5B]">B3 / -3층</span>에 도착하면
            <br />
            미션이 클리어됩니다.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] bg-[#F4F7FF] px-4 py-4 text-[14px] font-bold leading-[1.75] text-[#596A83]">
            목표 층:
            <span className="ml-2 font-black text-[#D95B5B]">{basementLabel(TARGET_FLOOR)}</span>
            <br />
            <span className="font-black text-[#334BAE]">0층</span>은 기준점,
            그 아래는 <span className="font-black text-[#D95B5B]">음수</span> 층이에요.
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={() => setCurrentFloor((prev) => FLOORS[Math.max(0, FLOORS.indexOf(prev) - 1)])}
              disabled={!canMoveUp}
              className="rounded-2xl bg-[#798DDA] py-6 text-[14px] font-black text-white hover:bg-[#667BCA] disabled:bg-[#B9C4EB]"
            >
              <ArrowUp size={16} />
              위로 1층
            </Button>
            <Button
              type="button"
              onClick={() => setCurrentFloor((prev) => FLOORS[Math.min(FLOORS.length - 1, FLOORS.indexOf(prev) + 1)])}
              disabled={!canMoveDown}
              className="rounded-2xl bg-[#E06C6C] py-6 text-[14px] font-black text-white hover:bg-[#D15B5B] disabled:bg-[#F0B6B6]"
            >
              <ArrowDown size={16} />
              아래로 1층
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border-2 border-[#D8E0FF] bg-[#F9FAFF] p-4 sm:p-5">
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
                className="flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-[12px] font-black text-[#25618B]"
              >
                <CheckCircle2 size={14} />
                NEXT STEP
              </motion.div>
            )}
          </div>

          <div className={cn('mt-3 text-[34px] font-black sm:text-[46px]', currentFloor < 0 ? 'text-[#D95B5B]' : 'text-[#4257A6]')}>
            {basementLabel(currentFloor)}
          </div>
          <div className="mt-2 text-[15px] font-black text-[#4F6385]">{reaction.title}</div>
          <div className="mt-2 text-[14px] font-bold leading-[1.75] text-[#607086]">{reaction.body}</div>
        </motion.div>

        <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_150px]">
          <div className="space-y-3">
            <div className="rounded-[18px] bg-white px-4 py-3 text-[14px] font-bold leading-[1.75] text-[#556575]">
              위로 가는 방향은 <span className="font-black text-[#334BAE]">양수</span>,
              <br />
              아래로 가는 방향은 <span className="font-black text-[#E25656]">음수</span>로
              <br />
              나타내면 위치를 정확히 말할 수 있어요.
            </div>

            <div className="rounded-[18px] border-2 border-dashed border-[#CCD8FF] bg-[#F4F7FF] px-4 py-3 text-[13px] font-black leading-[1.7] text-[#5C6F92]">
              0층을 지나면 층수는
              <span className="mx-1 text-[#E25656]">-1층, -2층, -3층</span>
              처럼 바뀝니다.
            </div>
          </div>

          <div className="mx-auto">
            <div className="relative h-[332px] w-[120px] rounded-[26px] border-4 border-[#43546B] bg-[#DAE1EA] px-4 py-3">
              {FLOORS.map((floor, index) => (
                <div
                  key={floor}
                  className="absolute left-3 right-3 flex items-center justify-between text-[12px] font-black text-[#5B6C7A]"
                  style={{ top: index * 52 + 16 }}
                >
                  <span>{floorLabel(floor)}</span>
                  <span className={cn(floor < 0 && 'text-[#D95B5B]', floor === 0 && 'text-[#334BAE]')}>
                    {floor === 0 ? '기준' : floor < 0 ? `B${Math.abs(floor)}` : ''}
                  </span>
                </div>
              ))}

              <div
                className="absolute left-[18px] right-[18px] rounded-[12px] border-2 border-dashed border-[#E28A8A] bg-[#FFF4F4]/80 text-center text-[11px] font-black text-[#C45757]"
                style={{ top: targetTop, height: 44, lineHeight: '40px' }}
              >
                목표 B3
              </div>

              <motion.div
                animate={{ top: cabinTop }}
                transition={prefersReducedMotion ? { duration: 0.14 } : { type: 'spring', stiffness: 230, damping: 24 }}
                className="absolute left-[22px] right-[22px] h-[44px] rounded-[14px] border-4 border-[#243041] bg-[linear-gradient(180deg,#FFE27A_0%,#FFC93D_100%)] shadow-[0_6px_10px_rgba(0,0,0,0.16)]"
              >
                <div className="flex h-full items-center justify-center gap-2 text-[20px] font-black text-[#243041]">
                  <span>●</span>
                  <span className="text-[16px]">{missionCleared ? '😄' : currentFloor < 0 ? '🙂' : '😯'}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-5 rounded-[18px] px-4 py-4 text-center text-[15px] font-black leading-[1.8]',
            missionCleared
              ? 'border-2 border-[#B9C6FF] bg-[#EEF2FF] text-[#374EA4]'
              : 'border-2 border-[#D1DBFF] bg-[#F5F8FF] text-[#4B5D96]',
          )}
        >
          {missionCleared ? (
            <>
              기준점의 아래쪽, 반대 방향은
              <br />
              음수로 나타낸다.
            </>
          ) : (
            <>
              B3 / -3층에 도착해
              <br />
              음수 층 미션을 클리어해 보세요.
            </>
          )}
        </div>
      </div>
    </div>
  )
}
