import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function QuizFeedback({
  message,
  type,
}: {
  message: string | null
  type: 'success' | 'fail' | null
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={cn(
            'text-center mt-3 text-[15px] font-extrabold',
            type === 'fail' && 'text-red-600',
            type === 'success' && 'text-slide-green',
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
