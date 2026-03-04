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
  { title: '핵심 뜻', body: '분해되지 않는 수' },
  { title: '곱으로 쓰면', body: '(소수)=1×(자기자신)' },
  { title: '약수 개수', body: '약수는 1과 자기 자신, 딱 2개' },
]

const compositeSteps: ColumnStep[] = [
  { title: '핵심 뜻', body: '합성된 수라서 본래의 수(소수)로 분해돼요.' },
  { title: '곱으로 쓰면', body: '(합성수)=1×(자기자신)\n=(약수)×(약수)' },
  { title: '약수 개수', body: '약수가 3개 이상' },
]

export function PrimeCompositeNeoCard({
  visible = false,
  className,
}: PrimeCompositeNeoCardProps) {
  const pairedSteps = primeSteps.map((prime, index) => ({
    prime,
    composite: compositeSteps[index],
  }))

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
      <div className="bg-[#f8fafc]">
        <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="p-3 pb-2">
            <h3 className="text-center text-2xl font-black text-[#1f8d74]">소수</h3>
          </div>
          <div className="border-l-4 border-[#222] p-3 pb-2">
            <h3 className="text-center text-2xl font-black text-[#e25f8c]">합성수</h3>
          </div>
        </div>

        <div className="px-3 pb-3">
          {pairedSteps.map(({ prime, composite }, itemIdx) => (
            <div
              key={prime.title}
              className={cn(
                'grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] py-2',
                itemIdx !== pairedSteps.length - 1 && 'border-b border-[#dbe4ea]',
              )}
            >
              <div className="pr-3">
                <p className="text-[13px] font-black text-[#1f8d74]">{prime.title}</p>
                <p
                  className={cn(
                    'text-[13px] leading-snug text-[#24463f] mt-1',
                    itemIdx === 1 && 'whitespace-nowrap',
                  )}
                >
                  {prime.body}
                </p>
              </div>
              <div className="border-l-4 border-[#222] pl-3">
                <p className="text-[13px] font-black text-[#e25f8c]">{composite.title}</p>
                <p
                  className={cn(
                    'text-[13px] leading-snug text-[#5b2f3f] mt-1',
                    itemIdx === 1 && 'whitespace-pre-line',
                  )}
                >
                  {composite.body}
                </p>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] pt-2">
            <div className="pr-3">
              <p className="text-[13px] font-black text-[#1f8d74]">예시</p>
              <p className="text-[13px] leading-snug text-[#24463f] mt-1">
                2, 3, 5, 7, 11, 13, 17, 19 ...
              </p>
            </div>
            <div className="border-l-4 border-[#222] pl-3">
              <p className="text-[13px] font-black text-[#e25f8c]">예시</p>
              <p className="text-[13px] leading-snug text-[#5b2f3f] mt-1">
                4, 6, 8, 9, 10, 12 ...
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
