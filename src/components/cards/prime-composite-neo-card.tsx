import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PrimeCompositeNeoCardProps {
  visible?: boolean
  className?: string
}

interface ColumnStep {
  title: string
  body: string
}

const primeSteps: ColumnStep[] = [
  { title: '핵심 뜻', body: '분해되지 않는 수라서 본래의 수를 유지해요.' },
  { title: '곱으로 쓰면', body: '소수 = 1 × 자기 자신' },
  { title: '약수 개수', body: '약수는 1과 자기 자신, 딱 2개' },
]

const compositeSteps: ColumnStep[] = [
  { title: '핵심 뜻', body: '합성된 수라서 본래의 수로 분해돼요.' },
  { title: '곱으로 쓰면', body: '합성수 = 1 × 자기 자신 = 약수 × 약수' },
  { title: '약수 개수', body: '약수가 3개 이상' },
]

export function PrimeCompositeNeoCard({
  visible = false,
  className,
}: PrimeCompositeNeoCardProps) {
  return (
    <motion.section
      className={cn(
        'mx-4 rounded-sm border-4 border-[#222] bg-white shadow-[6px_6px_0px_#222] overflow-hidden',
        className,
      )}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-2 gap-3 p-3 bg-[#f6f8fb]">
        <article className="rounded-sm border-4 border-[#1f8d74] bg-white p-3">
          <h3 className="text-center text-2xl font-black text-[#1f8d74] mb-2">소수</h3>
          <div className="space-y-2.5">
            {primeSteps.map((item) => (
              <div key={item.title} className="rounded-sm border-2 border-[#1f8d74] bg-[#f2fffb] p-2.5">
                <p className="text-[13px] font-black text-[#1f8d74]">{item.title}</p>
                <p className="text-[13px] leading-snug text-[#24463f] mt-1">{item.body}</p>
              </div>
            ))}
            <div className="rounded-sm border-2 border-[#1f8d74] bg-[#f2fffb] p-2.5">
              <p className="text-[13px] font-black text-[#1f8d74]">예시</p>
              <p className="text-[13px] leading-snug text-[#24463f] mt-1">
                2, 3, 5, 7, 11, 13, 17, 19 ...
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-sm border-4 border-[#e25f8c] bg-white p-3">
          <h3 className="text-center text-2xl font-black text-[#e25f8c] mb-2">합성수</h3>
          <div className="space-y-2.5">
            {compositeSteps.map((item) => (
              <div key={item.title} className="rounded-sm border-2 border-[#e25f8c] bg-[#fff4f8] p-2.5">
                <p className="text-[13px] font-black text-[#e25f8c]">{item.title}</p>
                <p className="text-[13px] leading-snug text-[#5b2f3f] mt-1">{item.body}</p>
              </div>
            ))}
            <div className="rounded-sm border-2 border-[#e25f8c] bg-[#fff4f8] p-2.5">
              <p className="text-[13px] font-black text-[#e25f8c]">예시</p>
              <p className="text-[13px] leading-snug text-[#5b2f3f] mt-1">
                4, 6, 8, 9, 10, 12 ...
              </p>
            </div>
          </div>
        </article>
      </div>
    </motion.section>
  )
}
