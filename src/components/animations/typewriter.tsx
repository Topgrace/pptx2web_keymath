import { useTypewriter } from '@/hooks/use-typewriter'
import { cn } from '@/lib/utils'

export function Typewriter({
  text,
  speed = 40,
  enabled = true,
  onComplete,
  className,
}: {
  text: string
  speed?: number
  enabled?: boolean
  onComplete?: () => void
  className?: string
}) {
  const { displayed, showCursor } = useTypewriter({ text, speed, enabled, onComplete })

  return (
    <span className={cn(className)}>
      {displayed}
      {showCursor && (
        <span className="inline-block w-[2px] h-[1.1em] bg-slide-brown ml-[1px] align-text-bottom animate-tw-blink" />
      )}
    </span>
  )
}
