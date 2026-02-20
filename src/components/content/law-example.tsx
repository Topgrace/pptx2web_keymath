import { MathDisplay } from '@/components/math'

export function LawExample({
  label,
  tex,
}: {
  label: string
  tex: string
}) {
  return (
    <div className="p-3.5 bg-white rounded-xl mt-3 text-center border-l-[3px] border-slide-accent">
      <div className="text-[13px] font-extrabold text-slide-muted mb-1.5">
        {label}
      </div>
      <MathDisplay tex={tex} sizeClass="katex-example" />
    </div>
  )
}
