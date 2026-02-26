import { cn } from '@/lib/utils'

interface CompositeConfusionTableProps {
  className?: string
}

type ConfusionRow = {
  group: string
  left: string
  right: string
}

const confusionRows: ConfusionRow[] = [
  { group: '13이 곱해진 수', left: '91=7×13', right: '143=11×13' },
  { group: '17이 곱해진 수', left: '51=3×17', right: '119=7×17' },
  { group: '19가 곱해진 수', left: '57=3×19', right: '133=7×19' },
  { group: '기타', left: '111=3×37', right: '161=7×23' },
]

export function CompositeConfusionTable({ className }: CompositeConfusionTableProps) {
  return (
    <div
      className={cn(
        'mt-3 rounded-xl border-2 border-[#222] bg-white overflow-hidden',
        className,
      )}
    >
      <div className="px-3 py-2 bg-[#ffe3ec] border-b-2 border-[#222] text-center text-[13px] font-black text-[#8e2c55]">
        소수로 착각하기 쉬운 합성수
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-70 border-collapse text-[13px]">
          <tbody>
            {confusionRows.map((row, rowIdx) => (
              <tr key={row.group} className={rowIdx % 2 === 0 ? 'bg-[#fff9fc]' : 'bg-white'}>
                <td className="px-2.5 py-2 border-r border-[#c9c9c9] bg-[#f2f2f2] text-center font-bold text-[#2f2f2f]">
                  {row.group}
                </td>
                <td className="px-2.5 py-2 border-r border-[#d3d3d3] text-center font-bold text-[#333]">
                  {row.left}
                </td>
                <td className="px-2.5 py-2 text-center font-bold text-[#333]">
                  {row.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
