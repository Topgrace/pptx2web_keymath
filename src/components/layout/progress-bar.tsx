import { motion } from 'framer-motion'
import { useSlideProgress } from '@/hooks/use-slide-progress'

export function ProgressBar() {
  const { progressPercent } = useSlideProgress()

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-[1000]">
      <motion.div
        className="h-full bg-gradient-to-r from-slide-accent to-slide-brown rounded-r-sm"
        initial={{ width: '0%' }}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
