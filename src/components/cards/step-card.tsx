import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { CardVariant } from '@/schemas/step'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

export function StepCard({
  children,
  variant = 'default',
  visible = false,
  className,
}: {
  children: ReactNode
  variant?: CardVariant
  visible?: boolean
  className?: string
}) {
  return (
    <motion.div
      className={cn(
        'rounded-[20px] mx-4 px-6 py-7 relative overflow-hidden',
        'shadow-[0_2px_12px_rgba(0,0,0,0.06)]',
        variant === 'white' ? 'bg-white' : 'bg-slide-card',
        className,
      )}
      initial={{ opacity: 0, y: 40, maxHeight: 0 }}
      animate={
        visible
          ? { opacity: 1, y: 0, maxHeight: 5000 }
          : { opacity: 0, y: 40, maxHeight: 0 }
      }
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function StepDivider({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="flex justify-center my-2"
      initial={{ opacity: 0, maxHeight: 0 }}
      animate={visible ? { opacity: 1, maxHeight: 20, marginTop: 8, marginBottom: 8 } : { opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Separator className="w-10 h-[3px] bg-slide-accent rounded-sm" />
    </motion.div>
  )
}
