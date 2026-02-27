import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

export function NextButton() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { currentStep, totalSteps, nextButtonState, advanceStep, quizStepIds } = useSlideProgress()

  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const isCh1Intro =
    normalizedPath === '/ch1-intro' || normalizedPath === '/1-1-ch1-intro'
  const showCh1CompletionActions = nextButtonState === 'done' && isCh1Intro
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
    if (nextButtonState === 'done') return '↺'
    if (nextButtonState === 'locked') return '🔒'
    return '➜'
  }

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slide-bg via-slide-bg/80 to-transparent z-[999] flex justify-center">
      {showCh1CompletionActions ? (
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
            <span className="text-xl">↺</span>
          </motion.button>

          <motion.button
            onClick={() => navigate('/1-1-u1')}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'flex-1 py-4 border-none rounded-[14px]',
              'text-base sm:text-lg font-extrabold font-[inherit] cursor-pointer',
              'flex items-center justify-center gap-2',
              'transition-colors duration-300',
              'bg-slide-brown text-white shadow-[0_4px_16px_rgba(122,76,20,0.3)]',
            )}
          >
            <span>다음: 소수와 합성수</span>
            <span className="text-xl">➜</span>
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
