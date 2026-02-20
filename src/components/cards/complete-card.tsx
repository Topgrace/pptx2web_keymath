import type { ReactNode } from 'react'
import { StepCard } from './step-card'
import { GradientText, EmojiBounce } from '@/components/animations'
import { motion } from 'framer-motion'

export function CompleteCard({
  visible,
  emoji = '🎉',
  title,
  children,
}: {
  visible: boolean
  emoji?: string
  title: string
  children?: ReactNode
}) {
  return (
    <StepCard visible={visible} className="text-center pt-10 pb-6">
      {/* Animated emoji */}
      <div className="text-5xl mb-3">
        <EmojiBounce enabled={visible}>{emoji}</EmojiBounce>
      </div>

      {/* Gradient title */}
      <div className="text-2xl font-extrabold text-slide-brown mb-2">
        <GradientText>{title}</GradientText>
      </div>

      {/* Description with blur-in */}
      <motion.div
        className="text-[15px] text-slide-muted leading-relaxed"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={visible ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </StepCard>
  )
}
