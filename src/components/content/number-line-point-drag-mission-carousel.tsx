import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, XCircle } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

type DragMissionItem = {
  id: string
  target: number
  step: number
  min: number
  max: number
  kind: 'integer' | 'fraction' | 'decimal'
  display?: string
  numerator?: number
  denominator?: number
  sign?: '+' | '-'
}

type MissionStatus = 'idle' | 'correct' | 'incorrect'

const MISSIONS: DragMissionItem[] = [
  { id: 'drag-1', target: -3, step: 1, min: -5, max: 2, kind: 'integer' },
  {
    id: 'drag-2',
    target: 4 / 3,
    step: 1 / 3,
    min: -1,
    max: 3,
    kind: 'fraction',
    numerator: 4,
    denominator: 3,
    sign: '+',
  },
  {
    id: 'drag-3',
    target: -5 / 4,
    step: 1 / 4,
    min: -3,
    max: 1,
    kind: 'fraction',
    numerator: 5,
    denominator: 4,
    sign: '-',
  },
  { id: 'drag-4', target: 2.5, step: 0.5, min: -1, max: 4, kind: 'decimal', display: '+2.5' },
]

const formatTick = (value: number) => (value > 0 ? `+${value}` : value)

function FractionLabel({
  sign,
  numerator,
  denominator,
}: {
  sign?: '+' | '-'
  numerator: number
  denominator: number
}) {
  return (
    <span className="mx-2 inline-flex items-center align-middle text-[#2563eb]">
      {sign && <span className="mr-1">{sign}</span>}
      <span className="inline-flex translate-y-[2px] flex-col items-center justify-center">
        <span className="border-b-[2.5px] border-current px-[3px] pb-[2px] text-[0.72em] leading-none">
          {numerator}
        </span>
        <span className="px-[3px] pt-[2px] text-[0.72em] leading-none">{denominator}</span>
      </span>
    </span>
  )
}

function MissionTargetLabel({ item }: { item: DragMissionItem }) {
  if (item.kind === 'fraction' && item.numerator && item.denominator) {
    return (
      <FractionLabel
        sign={item.sign}
        numerator={item.numerator}
        denominator={item.denominator}
      />
    )
  }

  return <span className="mx-2 text-[#2563eb]">{item.display ?? formatTick(item.target)}</span>
}

function NumberLine({
  value,
  onChange,
  disabled,
  step,
  min,
  max,
}: {
  value: number
  onChange: (value: number) => void
  disabled: boolean
  step: number
  min: number
  max: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const mainTicks = Array.from({ length: Math.round(max - min) + 1 }, (_, index) => min + index)

  const subTicks = (() => {
    if (step >= 1) {
      return []
    }

    const subTickCount = Math.round(1 / step)
    const ticks: number[] = []

    for (let valueIndex = min; valueIndex < max; valueIndex += 1) {
      for (let subIndex = 1; subIndex < subTickCount; subIndex += 1) {
        ticks.push(Number((valueIndex + subIndex * step).toFixed(4)))
      }
    }

    return ticks
  })()

  const getPositionPercent = (rawValue: number) => {
    const percent = ((rawValue - min) / (max - min)) * 100
    return Math.max(0, Math.min(100, percent))
  }

  const updateValue = (clientX: number) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const rect = track.getBoundingClientRect()
    const padding = 12
    const startX = rect.left + padding
    const trackWidth = rect.width - padding * 2
    const rawRatio = Math.max(0, Math.min(1, (clientX - startX) / trackWidth))
    const rawValue = min + rawRatio * (max - min)
    const snappedValue = Math.round(rawValue / step) * step

    onChange(Number(snappedValue.toFixed(4)))
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }

    event.preventDefault()
    setIsDragging(true)
    updateValue(event.clientX)

    const handlePointerMove = (moveEvent: PointerEvent) => {
      updateValue(moveEvent.clientX)
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
  }

  return (
    <div className="mx-auto w-full max-w-none px-0 py-4 sm:px-1 sm:py-6">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className={cn(
          'relative h-40 touch-none select-none sm:h-44',
          disabled ? 'cursor-default' : isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <div className="absolute left-[10px] right-[10px] top-1/2 h-[3px] -translate-y-1/2 rounded-[1px] bg-[#111827]" />
        <div className="absolute left-[2px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[6px] border-r-[8px] border-y-transparent border-r-[#111827]" />
        <div className="absolute right-[2px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-[#111827]" />

        <div className="pointer-events-none absolute inset-y-0 left-[12px] right-[12px]">
          {subTicks.map((tick) => (
            <div
              key={tick}
              className="absolute top-1/2 flex -translate-x-1/2 flex-col items-center opacity-60"
              style={{ left: `${getPositionPercent(tick)}%` }}
            >
              <div className="-mt-[4px] h-[8px] w-[1.5px] rounded-full bg-slate-500" />
            </div>
          ))}

          {mainTicks.map((tick) => (
            <div
              key={tick}
              className="absolute top-1/2 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${getPositionPercent(tick)}%` }}
            >
              <div className="-mt-[7px] h-[14px] w-[2.5px] rounded-full bg-[#111827]" />
              <span className="mt-3 text-[13px] font-extrabold text-slate-800 sm:text-[15px]">
                {formatTick(tick)}
              </span>
            </div>
          ))}

          <div
            className={cn(
              'absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center',
              isDragging ? '' : 'transition-all duration-200 ease-out',
            )}
            style={{ left: `${getPositionPercent(value)}%` }}
          >
            <div className={cn('relative z-20 flex items-center justify-center', disabled ? 'opacity-80' : 'scale-110')}>
              <div className="h-3 w-3 rounded-full bg-[#2563eb] shadow-sm" />
            </div>

            <div className="absolute top-12 z-10 origin-top drop-shadow-md">
              <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M16 2 C 16 2, 30 14, 30 26 A 14 14 0 0 1 2 26 C 2 14, 16 2, 16 2 Z"
                  fill="#FDE047"
                />
                <circle cx="16" cy="25" r="7" fill="#2563eb" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feedback({ status }: { status: MissionStatus }) {
  if (status === 'incorrect') {
    return (
      <div className="flex items-center justify-center gap-2 text-[14px] font-extrabold text-[#dc2626] sm:text-[15px]">
        <XCircle className="size-5" strokeWidth={2.6} />
        <span>정확하지 않습니다. 다시 움직여 보세요.</span>
      </div>
    )
  }

  if (status === 'correct') {
    return (
      <div className="flex items-center justify-center gap-2 text-[15px] font-extrabold text-[#2E7D57] sm:text-[16px]">
        <CheckCircle2 className="size-5" strokeWidth={2.6} />
        <span>정답입니다!</span>
      </div>
    )
  }

  return <div className="text-center text-[13px] font-bold text-slate-500">점을 드래그한 뒤 확인하세요.</div>
}

export function NumberLinePointDragMissionCarousel() {
  const { advanceStep, currentStep, totalSteps } = useSlideProgress()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState(() => MISSIONS.map(() => 0))
  const [statuses, setStatuses] = useState<MissionStatus[]>(() => MISSIONS.map(() => 'idle'))

  const currentMission = MISSIONS[currentIndex]
  const currentValue = answers[currentIndex]
  const currentStatus = statuses[currentIndex]
  const isAllSolved = statuses.every((status) => status === 'correct')
  const canMovePrev = currentIndex > 0
  const canMoveNext = currentIndex < MISSIONS.length - 1 && currentStatus === 'correct'

  const handleValueChange = (newValue: number) => {
    if (currentStatus === 'correct') {
      return
    }

    setAnswers((current) =>
      current.map((answer, index) => (index === currentIndex ? newValue : answer)),
    )

    if (currentStatus === 'incorrect') {
      setStatuses((current) =>
        current.map((status, index) => (index === currentIndex ? 'idle' : status)),
      )
    }
  }

  const handleCheck = () => {
    const isCorrect = Math.abs(currentValue - currentMission.target) < 0.001

    setStatuses((current) =>
      current.map((status, index) => (index === currentIndex ? (isCorrect ? 'correct' : 'incorrect') : status)),
    )
  }

  const handleNext = () => {
    if (currentIndex < MISSIONS.length - 1) {
      setCurrentIndex((index) => index + 1)
      return
    }

    if (currentStep < totalSteps - 1) {
      advanceStep()
      window.setTimeout(() => {
        document.getElementById(`step-${currentStep + 1}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 50)
      return
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  const handlePrev = () => {
    setCurrentIndex((index) => Math.max(0, index - 1))
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#D6DDE5] bg-white text-left shadow-[0_10px_24px_rgba(31,53,84,0.08)]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <div>
          <div className="text-[16px] font-black text-[#1F3554] sm:text-[18px]">
            수직선 위에 점을 놓기
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canMovePrev}
            aria-label="이전 드래그 미션 보기"
            className={cn(
              'grid size-9 place-items-center rounded-full border transition',
              canMovePrev
                ? 'border-[#C9D4E2] bg-white text-[#1F4F8A] shadow-sm hover:bg-[#F5F8FC]'
                : 'cursor-not-allowed border-[#DDE3EA] bg-[#F3F6F9] text-slate-300',
            )}
          >
            <ChevronLeft className="size-4" strokeWidth={3} />
          </button>

          <div className="min-w-[58px] rounded-full bg-[#2E7D57]/10 px-3 py-1.5 text-center text-[13px] font-black text-[#2E7D57]">
            {isAllSolved ? '완료' : `${currentIndex + 1} / ${MISSIONS.length}`}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canMoveNext}
            aria-label="다음 드래그 미션 보기"
            className={cn(
              'grid size-9 place-items-center rounded-full border transition',
              canMoveNext
                ? 'border-[#C9D4E2] bg-white text-[#1F4F8A] shadow-sm hover:bg-[#F5F8FC]'
                : 'cursor-not-allowed border-[#DDE3EA] bg-[#F3F6F9] text-slate-300',
            )}
          >
            <ChevronRight className="size-4" strokeWidth={3} />
          </button>
        </div>
      </div>

      <motion.div
        key={currentMission.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="px-4 pb-4 sm:px-5 sm:pb-5"
      >
        <div className="rounded-2xl bg-[#F8FAFC] px-3 py-5 sm:px-5">
          <h3 className="break-keep text-center text-[20px] font-black leading-[1.45] text-slate-800 sm:text-[24px]">
            점 <MissionTargetLabel item={currentMission} />을(를) 선택하세요.
          </h3>

          <NumberLine
            value={currentValue}
            onChange={handleValueChange}
            disabled={currentStatus === 'correct'}
            step={currentMission.step}
            min={currentMission.min}
            max={currentMission.max}
          />
        </div>

        <div className="mt-4 min-h-7">
          <Feedback status={currentStatus} />
        </div>

        <div className="mt-3 flex justify-center">
          {currentStatus === 'correct' ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-[#2E7D57] py-3.5 text-[16px] font-black text-white shadow-sm transition hover:bg-[#256847] active:scale-[0.98]"
            >
              <span>{currentIndex < MISSIONS.length - 1 ? '다음' : '완료'}</span>
              <ArrowRight className="size-5" strokeWidth={2.8} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCheck}
              className="w-full max-w-sm rounded-2xl bg-[#2563eb] py-3.5 text-[16px] font-black text-white shadow-sm transition hover:bg-[#1d4ed8] active:scale-[0.98]"
            >
              확인
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
