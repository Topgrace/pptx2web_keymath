import katex from 'katex'
import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function MathDisplay({
  tex,
  className,
  sizeClass = 'katex-formula',
}: {
  tex: string
  className?: string
  sizeClass?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, { throwOnError: false, displayMode: true })
    }
  }, [tex])

  return <div ref={ref} className={cn('text-center', sizeClass, className)} />
}

export function MathInline({
  tex,
  className,
}: {
  tex: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, { throwOnError: false, displayMode: false })
    }
  }, [tex])

  return <span ref={ref} className={cn('katex-inline', className)} />
}
