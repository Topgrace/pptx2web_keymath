import { cn } from '@/lib/utils'
import { MathInline } from '@/components/math'

export function SignTable({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn('flex gap-3 mt-3', className)}>
      <div className="flex-1 text-center py-3.5 px-3 rounded-xl bg-white border-2 border-slide-green">
        <div className="text-[13px] font-extrabold text-slide-green mb-1.5">(음수)^짝수</div>
        <div className="text-xl font-extrabold text-slide-green">+ 양수</div>
        <div className="text-[13px] text-gray-400 mt-1"><MathInline tex="(-2)^2=+4" /></div>
      </div>
      <div className="flex-1 text-center py-3.5 px-3 rounded-xl bg-white border-2 border-slide-red">
        <div className="text-[13px] font-extrabold text-slide-red mb-1.5">(음수)^홀수</div>
        <div className="text-xl font-extrabold text-slide-red">− 음수</div>
        <div className="text-[13px] text-gray-400 mt-1"><MathInline tex="(-2)^3=-8" /></div>
      </div>
    </div>
  )
}
