import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function EmojiBounce({
  children,
  enabled = true,
  className,
}: {
  children: ReactNode
  enabled?: boolean
  className?: string
}) {
  return (
    <motion.span
      className={cn('inline-block', className)}
      initial={{ opacity: 0, scale: 0, rotate: -15 }}
      animate={
        enabled
          ? { opacity: 1, scale: 1, rotate: 0 }
          : { opacity: 0, scale: 0, rotate: -15 }
      }
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      }}
    >
      {children}
    </motion.span>
  )
}
