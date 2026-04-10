import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const POSITIONS = [-3, -2, -1, 0, 1, 2, 3] as const
const CHECKPOINTS = [-3, 0, 2] as const

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function signed(value: number) {
  return value > 0 ? `+${value}` : `${value}`
}

export function NegativeNumberLineOutro({
  className,
  stepId = 5,
}: {
  className?: string
  stepId?: number
}) {
  const [position, setPosition] = useState<(typeof POSITIONS)[number]>(0)
  const [checkpointIndex, setCheckpointIndex] = useState(0)
  const [missionCleared, setMissionCleared] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { isSolved, markSolved } = useSlideProgress()

  const solved = isSolved(stepId)
  const currentTarget = missionCleared ? null : CHECKPOINTS[checkpointIndex]
  const pointPercent = ((position + 3) / 6) * 100

  useEffect(() => {
    if (missionCleared) return
    if (position !== CHECKPOINTS[checkpointIndex]) return

    if (checkpointIndex === CHECKPOINTS.length - 1) {
      setMissionCleared(true)
      return
    }

    setCheckpointIndex((prev) => prev + 1)
  }, [checkpointIndex, missionCleared, position])

  useEffect(() => {
    if (!missionCleared || solved) return
    markSolved(stepId)
  }, [markSolved, missionCleared, solved, stepId])

  const canMoveLeft = !missionCleared && position > -3
  const canMoveRight = !missionCleared && position < 3

  const reaction = useMemo(() => {
    if (missionCleared) {
      return {
        badge: 'MISSION CLEAR',
        badgeTone: 'bg-[#F1EFFF] text-[#514CA5]',
        cardTone: 'bg-[linear-gradient(180deg,#F8F6FF_0%,#EEE9FF_100%)]',
        title: '수직선이 완성되었어요!',
        body: '이제 0을 기준으로 왼쪽은 음수, 오른쪽은 양수라는 흐름을 한 줄 위에서 볼 수 있어요.',
      }
    }

    return {
      badge: 'CHECKPOINT',
      badgeTone: 'bg-[#F4F3FF] text-[#5A57B5]',
      cardTone: 'bg-[linear-gradient(180deg,#FAF9FF_0%,#F1EEFF_100%)]',
      title: `다음 목표는 ${signed(currentTarget ?? 0)}`,
      body: '왼쪽과 오른쪽으로 이동하며 음수, 기준점, 양수를 차례대로 확인해 보세요.',
    }
  }, [currentTarget, missionCleared])

  return (
    <div className={cn('grid gap-5 lg:grid-cols-[0.92fr_1.08fr]', className)}>
      <div className="flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F3FF] px-4 py-2 text-[12px] font-black tracking-[0.18em] text-[#5A57B5]">
            NUMBER LINE MISSION
          </div>

          <h3 className="mt-4 text-[25px] font-black leading-[1.35] text-[#322F58] sm:text-[30px]">
            이제 0을 기준으로
            <br />
            수직선을 완성해요
          </h3>

          <p className="mt-3 text-[15px] font-bold leading-[1.8] text-[#6B6991]">
            체크포인트 <span className="text-[#D94F4F]">-3</span> →
            <span className="mx-1 text-[#635FB7]">0</span> →
            <span className="text-[#1F4F8A]">+2</span>를 순서대로 지나가면
            <br />
            수직선 미션이 클리어됩니다.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] bg-[#F7F5FF] px-4 py-4 text-[14px] font-bold leading-[1.75] text-[#69659C]">
            현재 위치:
            <span className={cn('ml-2 font-black', position < 0 ? 'text-[#D94F4F]' : position > 0 ? 'text-[#1F4F8A]' : 'text-[#635FB7]')}>
              {signed(position)}
            </span>
            <br />
            {missionCleared ? '모든 체크포인트 완료!' : `다음 목표: ${signed(currentTarget ?? 0)}`}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const currentIndex = POSITIONS.indexOf(position)
                setPosition(POSITIONS[clamp(currentIndex - 1, 0, POSITIONS.length - 1)])
              }}
              disabled={!canMoveLeft}
              className="rounded-2xl border-2 py-6 text-[14px] font-black"
            >
              왼쪽으로 1칸
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const currentIndex = POSITIONS.indexOf(position)
                setPosition(POSITIONS[clamp(currentIndex + 1, 0, POSITIONS.length - 1)])
              }}
              disabled={!canMoveRight}
              className="rounded-2xl border-2 py-6 text-[14px] font-black"
            >
              오른쪽으로 1칸
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border-2 border-[#D7D4FF] bg-[#FAF9FF] p-4 sm:p-5">
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
                className="flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-[12px] font-black text-[#514CA5]"
              >
                <CheckCircle2 size={14} />
                COMPLETE
              </motion.div>
            )}
          </div>

          <div className={cn('mt-3 text-[38px] font-black leading-none sm:text-[50px]', position < 0 ? 'text-[#D94F4F]' : position > 0 ? 'text-[#1F4F8A]' : 'text-[#635FB7]')}>
            {signed(position)}
          </div>
          <div className="mt-2 text-[15px] font-black text-[#635F97]">{reaction.title}</div>
          <div className="mt-2 text-[14px] font-bold leading-[1.75] text-[#6B6991]">{reaction.body}</div>
        </motion.div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <div className="rounded-[20px] bg-white px-4 py-4">
              <div className="text-[13px] font-black text-[#655FB4]">체크포인트 순서</div>
              <div className="mt-3 space-y-2 text-[14px] font-bold text-[#6F6C9F]">
                {CHECKPOINTS.map((checkpoint, index) => {
                  const passed = missionCleared || checkpointIndex > index || (missionCleared && checkpointIndex >= index)
                  const isCurrent = !missionCleared && checkpointIndex === index
                  return (
                    <div
                      key={checkpoint}
                      className={cn(
                        'rounded-[14px] px-3 py-3',
                        passed ? 'bg-[#EEF8F0] text-[#2F7A53]' : isCurrent ? 'bg-[#F4F3FF] text-[#514CA5]' : 'bg-[#FBFAFF]',
                      )}
                    >
                      {passed ? '완료' : isCurrent ? '현재 목표' : '대기'} {signed(checkpoint)}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[18px] border-2 border-dashed border-[#D7D4FF] bg-[#F6F4FF] px-4 py-3 text-[13px] font-black leading-[1.75] text-[#6B6991]">
              <span className="text-[#D94F4F]">왼쪽</span>으로 가면 음수,
              <br />
              <span className="text-[#635FB7]">0</span>은 기준점,
              <br />
              <span className="text-[#1F4F8A]">오른쪽</span>으로 가면 양수예요.
            </div>
          </div>

          <div className="rounded-[24px] bg-white px-5 py-5">
            <div className="text-center text-[14px] font-black text-[#635FB7]">완성된 수직선</div>

            <div className="relative mt-8 px-2">
              <div className="absolute left-1/2 top-1/2 h-10 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7A76C9]" />
              <div className="h-[4px] rounded-full bg-[#7A76C9]" />

              {CHECKPOINTS.map((checkpoint) => {
                const checkpointPercent = ((checkpoint + 3) / 6) * 100
                const active = !missionCleared && currentTarget === checkpoint
                const done = missionCleared || checkpointIndex > CHECKPOINTS.indexOf(checkpoint)
                return (
                  <div
                    key={checkpoint}
                    className={cn(
                      'absolute top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 text-center text-[11px] font-black leading-[28px]',
                      done ? 'border-[#2F7A53] bg-[#EEF8F0] text-[#2F7A53]' : active ? 'border-[#635FB7] bg-white text-[#635FB7]' : 'border-[#D7D4FF] bg-[#FBFAFF] text-[#9B98C8]',
                    )}
                    style={{ left: `${checkpointPercent}%` }}
                  >
                    {signed(checkpoint)}
                  </div>
                )
              })}

              <motion.div
                animate={{ left: `calc(${pointPercent}% - 12px)` }}
                transition={prefersReducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 220, damping: 24 }}
                className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 border-white bg-[#F16C6C] shadow-[0_4px_10px_rgba(0,0,0,0.16)]"
              />

              <div className="mt-8 grid grid-cols-7 text-center">
                {POSITIONS.map((value) => (
                  <div key={value} className="flex flex-col items-center gap-2">
                    <div className={cn('h-3 w-[2px] rounded-full', value === 0 ? 'bg-[#635FB7]' : 'bg-[#A39FD7]')} />
                    <div className={cn('rounded-full px-2 py-1 text-[13px] font-black', position === value ? 'bg-[#F4F3FF] text-[#4D49A8]' : 'text-[#6F6C9F]')}>
                      {signed(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-5 rounded-[18px] px-4 py-4 text-center text-[15px] font-black leading-[1.8]',
            missionCleared
              ? 'border-2 border-[#BEB9FF] bg-[#F1EFFF] text-[#514CA5]'
              : 'border-2 border-[#D7D4FF] bg-[#F7F5FF] text-[#655FB4]',
          )}
        >
          {missionCleared ? (
            <>
              이제 0을 기준으로 왼쪽은 음수,
              <br />
              오른쪽은 양수인 수직선으로 수를 나타낼 수 있다.
            </>
          ) : (
            <>
              -3, 0, +2를 차례대로 지나가며
              <br />
              수직선 미션을 완성해 보세요.
            </>
          )}
        </div>
      </div>
    </div>
  )
}
