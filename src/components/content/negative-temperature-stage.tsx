import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Thermometer } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

const MIN_TEMPERATURE = -30
const MAX_TEMPERATURE = 40
const AUTO_ADVANCE_DELAY_MS = 1000
const TEMPERATURE_MARKS = Array.from(
  { length: MAX_TEMPERATURE - MIN_TEMPERATURE + 1 },
  (_, index) => MIN_TEMPERATURE + index,
)
const CITY_ORDER = ['seoul', 'moscow'] as const

type CityKey = (typeof CITY_ORDER)[number]
type TemperatureState = Record<CityKey, number>

const CITY_CONFIG: Record<
  CityKey,
  {
    label: string
    initialValue: number
    targetValue: number
    handleSide: 'left' | 'right'
    handleClassName: string
    handleTailClassName: string
    fluidClassName: string
  }
> = {
  seoul: {
    label: '서울',
    initialValue: 24,
    targetValue: 20,
    handleSide: 'left',
    handleClassName: 'border-[#F5B7BE] bg-[#EF5A64] text-white',
    handleTailClassName: 'bg-[#EF5A64]',
    fluidClassName: 'bg-[linear-gradient(180deg,#FF8E97_0%,#EF5A64_100%)]',
  },
  moscow: {
    label: '모스크바',
    initialValue: 13,
    targetValue: -10,
    handleSide: 'right',
    handleClassName: 'border-[#B8D3FF] bg-[#4E8EF7] text-white',
    handleTailClassName: 'bg-[#4E8EF7]',
    fluidClassName: 'bg-[linear-gradient(180deg,#8BC5FF_0%,#4E8EF7_100%)]',
  },
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function valueToPercent(value: number) {
  return ((value - MIN_TEMPERATURE) / (MAX_TEMPERATURE - MIN_TEMPERATURE)) * 100
}

function valueToTopPercent(value: number) {
  return 100 - valueToPercent(value)
}

function valueToTrackTop(value: number) {
  return `${valueToTopPercent(value)}%`
}

function formatTemperature(value: number) {
  return `${value}℃`
}

function formatAriaTemperature(value: number) {
  return value < 0 ? `영하 ${Math.abs(value)}도` : `${value}도`
}

export function NegativeTemperatureStage({
  className,
  stepId = 1,
}: {
  className?: string
  stepId?: number
}) {
  const [temperatures, setTemperatures] = useState<TemperatureState>({
    seoul: CITY_CONFIG.seoul.initialValue,
    moscow: CITY_CONFIG.moscow.initialValue,
  })
  const [activeCity, setActiveCity] = useState<CityKey | null>(null)
  const clearTimerRef = useRef<number | null>(null)
  const scaleRef = useRef<HTMLDivElement | null>(null)
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
  const allTargetsMatched = CITY_ORDER.every(
    (city) => temperatures[city] === CITY_CONFIG[city].targetValue,
  )
  const missionCleared = solved || allTargetsMatched

  const setCityTemperature = useCallback(
    (city: CityKey, nextValue: number) => {
      if (solved) return

      const snappedValue = clamp(Math.round(nextValue), MIN_TEMPERATURE, MAX_TEMPERATURE)
      setTemperatures((prev) => {
        if (prev[city] === snappedValue) return prev
        return { ...prev, [city]: snappedValue }
      })
    },
    [solved],
  )

  const getTemperatureFromClientY = useCallback((clientY: number) => {
    const rect = scaleRef.current?.getBoundingClientRect()
    if (!rect || rect.height <= 0) return null

    const offsetY = clamp(clientY - rect.top, 0, rect.height)
    const ratio = 1 - offsetY / rect.height
    return MIN_TEMPERATURE + ratio * (MAX_TEMPERATURE - MIN_TEMPERATURE)
  }, [])

  const updateTemperatureFromClientY = useCallback(
    (city: CityKey, clientY: number) => {
      const nextValue = getTemperatureFromClientY(clientY)
      if (nextValue === null) return
      setCityTemperature(city, nextValue)
    },
    [getTemperatureFromClientY, setCityTemperature],
  )

  const handlePointerDown = useCallback(
    (city: CityKey, event: ReactPointerEvent<HTMLButtonElement>) => {
      if (missionCleared) return

      event.preventDefault()
      event.currentTarget.focus()
      setActiveCity(city)
      updateTemperatureFromClientY(city, event.clientY)
    },
    [missionCleared, updateTemperatureFromClientY],
  )

  const handleKeyDown = useCallback(
    (city: CityKey, event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (missionCleared) return

      const currentValue = temperatures[city]

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowRight':
          event.preventDefault()
          setCityTemperature(city, currentValue + 1)
          return
        case 'ArrowDown':
        case 'ArrowLeft':
          event.preventDefault()
          setCityTemperature(city, currentValue - 1)
          return
        case 'PageUp':
          event.preventDefault()
          setCityTemperature(city, currentValue + 5)
          return
        case 'PageDown':
          event.preventDefault()
          setCityTemperature(city, currentValue - 5)
          return
        case 'Home':
          event.preventDefault()
          setCityTemperature(city, MIN_TEMPERATURE)
          return
        case 'End':
          event.preventDefault()
          setCityTemperature(city, MAX_TEMPERATURE)
          return
        default:
          return
      }
    },
    [missionCleared, setCityTemperature, temperatures],
  )

  useEffect(() => {
    if (!activeCity || missionCleared) return undefined

    const handlePointerMove = (event: PointerEvent) => {
      updateTemperatureFromClientY(activeCity, event.clientY)
    }

    const stopDragging = () => {
      setActiveCity(null)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)
    window.addEventListener('blur', stopDragging)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
      window.removeEventListener('blur', stopDragging)
    }
  }, [activeCity, missionCleared, updateTemperatureFromClientY])

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

  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF5FF] px-4 py-2 text-[12px] font-black tracking-[0.18em] text-[#3563B1]">
          <Thermometer size={16} />
          TEMPERATURE MISSION
        </div>

        <div>
          <h3 className="text-[28px] font-black leading-[1.2] text-[#1F2C3B] sm:text-[34px]">
            두 도시의 온도 비교
          </h3>
          <p className="mt-2 text-[15px] font-bold leading-[1.8] text-[#708092]">
            온도계 바늘을 드래그하여 두 도시의 온도에 맞게 조정하세요         </p>
        </div>

        <div className="mx-auto max-w-[560px] rounded-[22px] border border-[#DAE5F1] bg-white/90 px-4 py-4 text-[15px] font-black leading-[1.8] text-[#314154] shadow-[0_16px_32px_rgba(15,23,42,0.06)]">
          서울은 <span className="text-[#EF5A64]">20℃</span>이고, 모스크바는{' '}
          <span className="text-[#4E8EF7]">영하 10℃</span>이다.
        </div>
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={cn(
          'rounded-[34px] border px-3 py-6 shadow-[0_28px_64px_rgba(15,23,42,0.08)] sm:px-5 sm:py-8',
          missionCleared
            ? 'border-[#CFE1FF] bg-[linear-gradient(180deg,#FAFCFF_0%,#EFF6FF_100%)]'
            : 'border-[#E4EBF3] bg-[linear-gradient(180deg,#FBFDFF_0%,#F4F8FD_100%)]',
        )}
      >
        <div className="mx-auto flex max-w-[220px] justify-center">
          <div className="mx-auto">
            <div className="relative h-[500px] w-[164px] select-none">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[22px] font-black tracking-[-0.03em] text-[#556476]">
                ℃
              </div>

              <div ref={scaleRef} className="absolute left-1/2 top-10 bottom-[76px] w-full -translate-x-1/2">
                {TEMPERATURE_MARKS.map((value) => {
                  const isMajor = value % 10 === 0
                  return (
                    <div
                      key={value}
                      className="absolute inset-x-0 -translate-y-1/2"
                      style={{ top: valueToTrackTop(value) }}
                    >
                      <div className="absolute left-0 top-1/2 flex w-[66px] -translate-y-1/2 items-center justify-end gap-2">
                        <span
                          className={cn(
                            'w-[26px] text-right text-[13px] font-black',
                            isMajor ? 'opacity-100' : 'opacity-0',
                            value === 0 ? 'text-[#2E4154]' : 'text-[#6B7C8E]',
                          )}
                        >
                          {value}
                        </span>
                        <div
                          className={cn(
                            'rounded-full bg-[#D7DEE8]',
                            isMajor ? 'h-[2px] w-5' : 'h-px w-2.5',
                          )}
                        />
                      </div>
                    </div>
                  )
                })}

                <div className="absolute left-1/2 top-0 bottom-0 w-[38px] -translate-x-1/2 overflow-hidden rounded-full border-[3px] border-[#CFD8E4] bg-white shadow-[inset_0_0_0_8px_rgba(248,250,252,0.95)]">
                  <div
                    className={cn('absolute bottom-0 left-[8px] w-[8px] rounded-full', CITY_CONFIG.seoul.fluidClassName)}
                    style={{ top: valueToTrackTop(temperatures.seoul) }}
                  />
                  <div
                    className={cn('absolute bottom-0 right-[8px] w-[8px] rounded-full', CITY_CONFIG.moscow.fluidClassName)}
                    style={{ top: valueToTrackTop(temperatures.moscow) }}
                  />
                </div>

                {CITY_ORDER.map((city) => {
                  const config = CITY_CONFIG[city]
                  const value = temperatures[city]
                  const isMatched = value === config.targetValue
                  const isActive = activeCity === city

                  return (
                    <button
                      key={city}
                      type="button"
                      role="slider"
                      aria-label={`${config.label} 온도`}
                      aria-orientation="vertical"
                      aria-valuemin={MIN_TEMPERATURE}
                      aria-valuemax={MAX_TEMPERATURE}
                      aria-valuenow={value}
                      aria-valuetext={`${config.label} ${formatAriaTemperature(value)}`}
                      disabled={missionCleared}
                      onPointerDown={(event) => handlePointerDown(city, event)}
                      onKeyDown={(event) => handleKeyDown(city, event)}
                      className={cn(
                        'absolute z-20 flex -translate-y-1/2 items-center touch-none outline-none focus-visible:ring-4 focus-visible:ring-[#CBD7E6] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                        config.handleSide === 'left'
                          ? 'left-[-90px] flex-row sm:left-[-102px]'
                          : 'right-[-54px] flex-row-reverse sm:right-[-66px]',
                        missionCleared ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
                      )}
                      style={{ top: valueToTrackTop(value) }}
                    >
                      <span
                        className={cn(
                          'flex min-w-[88px] flex-col items-center justify-center rounded-[14px] border px-3 py-2 text-white shadow-[0_10px_22px_rgba(15,23,42,0.18)] transition-transform duration-150 sm:min-w-[96px]',
                          config.handleClassName,
                          isActive && !missionCleared && !prefersReducedMotion && 'scale-105',
                          isMatched && 'ring-2 ring-white/70',
                          missionCleared && 'opacity-75',
                        )}
                      >
                        <span className="text-[11px] font-black leading-none opacity-90">
                          {config.label}
                        </span>
                        <span className="mt-1 text-[15px] font-black leading-none">
                          {formatTemperature(value)}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'h-[6px] w-[22px] rounded-full sm:w-[28px]',
                          config.handleTailClassName,
                          config.handleSide === 'left' ? '-ml-2' : '-mr-2',
                        )}
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-[2px] w-[30px] rounded-full sm:w-[36px]',
                          config.handleTailClassName,
                          config.handleSide === 'left' ? '-ml-1' : '-mr-1',
                        )}
                      />
                    </button>
                  )
                })}
              </div>

              <div className="absolute bottom-0 left-1/2 h-[72px] w-[72px] -translate-x-1/2 rounded-full border-[4px] border-[#CFD8E4] bg-white shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <div className="absolute inset-[8px] overflow-hidden rounded-full bg-[#F8FAFD]">
                  <div className={cn('absolute inset-y-0 left-0 w-1/2', CITY_CONFIG.seoul.fluidClassName)} />
                  <div className={cn('absolute inset-y-0 right-0 w-1/2', CITY_CONFIG.moscow.fluidClassName)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-6 rounded-[22px] px-4 py-4 text-center text-[14px] font-black leading-[1.8] sm:text-[15px]',
            missionCleared
              ? 'border border-[#CFE1FF] bg-[#EEF5FF] text-[#315491]'
              : 'border border-[#E0E8F1] bg-white/85 text-[#5F7082]',
          )}
        >
          {missionCleared ? (
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={18} />
              서울 20℃, 모스크바 영하 10℃를 모두 맞춰 미션을 완료했어요.
            </span>
          ) : (
            '핸들을 드래그하여 온도를 조절하세요. 방향키로도 1℃씩 조정할 수 있어요.'
          )}
        </div>
      </motion.div>
    </div>
  )
}
