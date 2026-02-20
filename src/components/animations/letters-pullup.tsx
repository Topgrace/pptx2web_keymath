import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function LettersPullUp({
  text,
  className,
  enabled = true,
}: {
  text: string
  className?: string
  enabled?: boolean
}) {
  return (
    <motion.span
      className={cn('inline-block overflow-hidden pb-[2px]', className)}
      variants={containerVariants}
      initial="hidden"
      animate={enabled ? 'visible' : 'hidden'}
    >
      {[...text].map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={charVariants}
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
