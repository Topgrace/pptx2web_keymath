import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const scaleItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const blurItemVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 6 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export type RevealVariant = 'default' | 'scale' | 'blur'

function withDelay(base: Variants, delay = 0): Variants {
  if (!delay) return base

  const visible = base.visible
  if (!visible || typeof visible === 'string') return base

  const visibleState = visible as Record<string, unknown>
  const baseTransition = (visibleState.transition as Record<string, unknown> | undefined) ?? {}
  const mergedDelay =
    (typeof baseTransition.delay === 'number' ? baseTransition.delay : 0) + delay

  return {
    ...base,
    visible: {
      ...visibleState,
      transition: {
        ...baseTransition,
        delay: mergedDelay,
      },
    },
  }
}

function getVariants(variant: RevealVariant, delay = 0): Variants {
  const base = (() => {
    switch (variant) {
      case 'scale':
        return scaleItemVariants
      case 'blur':
        return blurItemVariants
      default:
        return defaultItemVariants
    }
  })()

  return withDelay(base, delay)
}

function getContainerVariants(staggerChildren: number, delayChildren: number): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

export function StaggerReveal({
  children,
  className,
  enabled = true,
  staggerChildren = 0.7,
  delayChildren = 0,
}: {
  children: ReactNode
  className?: string
  enabled?: boolean
  staggerChildren?: number
  delayChildren?: number
}) {
  const containerVariants = getContainerVariants(staggerChildren, delayChildren)

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={enabled ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  variant = 'default',
  className,
  delay = 0,
}: {
  children: ReactNode
  variant?: RevealVariant
  className?: string
  delay?: number
}) {
  return (
    <motion.div className={cn(className)} variants={getVariants(variant, delay)}>
      {children}
    </motion.div>
  )
}
