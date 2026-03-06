import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { normalizeUnitPath, preloadUnitRoute } from '@/lib/unit-route-loaders'
import { cn } from '@/lib/utils'
import { semesters } from '@/data/curriculum'

interface NextUnitAction {
  path: string
  title: string
}

interface UnitRouteMeta {
  nextUnit?: NextUnitAction
}

interface OrderedUnit {
  path?: string
  title: string
}

const orderedUnits: OrderedUnit[] = semesters.flatMap((semester) =>
  semester.chapters.flatMap((chapter) =>
    chapter.units.map((unit) => ({
      path: unit.path,
      title: unit.title,
    })),
  ),
)

const unitRouteMetaByPath = new Map<string, UnitRouteMeta>()

for (let index = 0; index < orderedUnits.length; index += 1) {
  const current = orderedUnits[index]
  if (!current.path) continue

  const next = orderedUnits[index + 1]
  const nextUnit =
    next?.path
      ? {
          path: normalizeUnitPath(next.path),
          title: next.title,
        }
      : undefined

  unitRouteMetaByPath.set(normalizeUnitPath(current.path), { nextUnit })
}

export function NextButton() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { currentStep, totalSteps, nextButtonState, advanceStep, quizStepIds } = useSlideProgress()

  const normalizedPath = normalizeUnitPath(pathname)
  const routeMeta = unitRouteMetaByPath.get(normalizedPath)
  const nextUnit = routeMeta?.nextUnit

  useEffect(() => {
    if (!nextUnit || typeof window === 'undefined') return

    const preloadNextUnit = () => {
      void preloadUnitRoute(nextUnit.path)
    }

    if ('requestIdleCallback' in window) {
      const idleHandle = window.requestIdleCallback(preloadNextUnit, { timeout: 1500 })
      return () => window.cancelIdleCallback(idleHandle)
    }

    const timeoutHandle = setTimeout(preloadNextUnit, 300)
    return () => clearTimeout(timeoutHandle)
  }, [nextUnit])

  const showCompletionActions = nextButtonState === 'done' && !!nextUnit
  const isActionStep = quizStepIds.has(currentStep)
  const shouldHideNextButton = isActionStep && nextButtonState !== 'done'

  if (shouldHideNextButton) return null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrimaryClick = () => {
    if (nextButtonState === 'locked') return
    if (nextButtonState === 'done') {
      scrollToTop()
      return
    }
    advanceStep()
  }

  const getText = () => {
    if (nextButtonState === 'done') return '처음으로'
    if (nextButtonState === 'locked') return '퀴즈를 클릭하여 채워봅시다'
    return `다음 (${currentStep + 1}/${totalSteps - 1})`
  }

  const getIcon = () => {
    if (nextButtonState === 'done') return '↻'
    if (nextButtonState === 'locked') return '🔒'
    return '→'
  }

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slide-bg via-slide-bg/80 to-transparent z-[999] flex justify-center">
      {showCompletionActions && nextUnit ? (
        <div className="w-full max-w-[640px] flex gap-3">
          <motion.button
            onClick={scrollToTop}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'flex-1 py-4 border-none rounded-[14px]',
              'text-base sm:text-lg font-extrabold font-[inherit] cursor-pointer',
              'flex items-center justify-center gap-2',
              'transition-colors duration-300',
              'bg-slide-green text-white shadow-[0_4px_16px_rgba(46,125,50,0.3)]',
            )}
          >
            <span>처음으로</span>
            <span className="text-xl">↻</span>
          </motion.button>

          <motion.button
            onClick={() => navigate(nextUnit.path)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'flex-1 py-4 border-none rounded-[14px]',
              'text-base sm:text-lg font-extrabold font-[inherit] cursor-pointer',
              'flex items-center justify-center gap-2',
              'transition-colors duration-300',
              'bg-slide-brown text-white shadow-[0_4px_16px_rgba(122,76,20,0.3)]',
            )}
          >
            <span>{`다음: ${nextUnit.title}`}</span>
            <span className="text-xl">→</span>
          </motion.button>
        </div>
      ) : (
        <motion.button
          onClick={handlePrimaryClick}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'max-w-[448px] w-full py-4 border-none rounded-[14px]',
            'text-lg font-extrabold font-[inherit] cursor-pointer',
            'flex items-center justify-center gap-2',
            'transition-colors duration-300',
            nextButtonState === 'done' &&
              'bg-slide-green text-white shadow-[0_4px_16px_rgba(46,125,50,0.3)]',
            nextButtonState === 'locked' &&
              'bg-gray-400 text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] pointer-events-none',
            nextButtonState === 'unlocked' &&
              'bg-slide-brown text-white shadow-[0_4px_16px_rgba(122,76,20,0.3)]',
          )}
        >
          <span>{getText()}</span>
          <span className="text-xl">{getIcon()}</span>
        </motion.button>
      )}
    </div>
  )
}
