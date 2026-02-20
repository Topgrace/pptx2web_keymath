import { motion } from 'framer-motion'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { cn } from '@/lib/utils'

export function NextButton() {
  const { currentStep, totalSteps, nextButtonState, advanceStep } = useSlideProgress()

  const handleClick = () => {
    if (nextButtonState === 'locked') return
    if (nextButtonState === 'done') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    advanceStep()
  }

  const getText = () => {
    if (nextButtonState === 'done') return '처음으로'
    if (nextButtonState === 'locked') return '❓ 클릭하여 채워봅시다'
    return `다음 (${currentStep + 1}/${totalSteps - 1})`
  }

  const getIcon = () => {
    if (nextButtonState === 'done') return '↑'
    if (nextButtonState === 'locked') return '🔒'
    return '→'
  }

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slide-bg via-slide-bg/80 to-transparent z-[999] flex justify-center">
      <motion.button
        onClick={handleClick}
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
    </div>
  )
}
