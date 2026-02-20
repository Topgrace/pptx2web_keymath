import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.7,
    },
  },
}

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

function getVariants(variant: RevealVariant): Variants {
  switch (variant) {
    case 'scale':
      return scaleItemVariants
    case 'blur':
      return blurItemVariants
    default:
      return defaultItemVariants
  }
}

export function StaggerReveal({
  children,
  className,
  enabled = true,
}: {
  children: ReactNode
  className?: string
  enabled?: boolean
}) {
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
}: {
  children: ReactNode
  variant?: RevealVariant
  className?: string
}) {
  return (
    <motion.div className={cn(className)} variants={getVariants(variant)}>
      {children}
    </motion.div>
  )
}
