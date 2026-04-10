import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ShoppingCart } from 'lucide-react'
import { useSlideProgress } from '@/hooks/use-slide-progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const START_BALANCE = 1000
const ITEM_PRICE = 1500
const WORK_REWARD = 1000
const TARGET_BALANCE = 500
const AUTO_ADVANCE_DELAY_MS = 1000

function formatWon(value: number) {
  return `${value > 0 ? '+' : ''}${value.toLocaleString()}원`
}

export function NegativeWalletStage({
  className,
  stepId = 3,
}: {
  className?: string
  stepId?: number
}) {
  const [balance, setBalance] = useState(START_BALANCE)
  const [itemOwned, setItemOwned] = useState(false)
  const [missionCleared, setMissionCleared] = useState(false)
  const [warningVisible, setWarningVisible] = useState(false)
  const warningTimerRef = useRef<number | null>(null)
  const clearTimerRef = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const {
    advanceStep,
    currentStep,
    isSolved,
    markSolved,
    showAllSteps,
    totalSteps,
  } = useSlideProgress()

  const solved = isSolved(stepId)

  useEffect(() => {
    if (itemOwned && balance === TARGET_BALANCE && !missionCleared) {
      setMissionCleared(true)
    }
  }, [balance, itemOwned, missionCleared])

  useEffect(() => {
    if (!missionCleared || solved) return
    markSolved(stepId)
  }, [markSolved, missionCleared, solved, stepId])

  useEffect(() => {
    if (!missionCleared) return undefined
    if (showAllSteps) return undefined
    if (currentStep !== stepId || currentStep >= totalSteps - 1) return undefined

    clearTimerRef.current = window.setTimeout(() => {
      advanceStep()
    }, AUTO_ADVANCE_DELAY_MS)

    return () => {
      if (clearTimerRef.current) {
        window.clearTimeout(clearTimerRef.current)
      }
    }
  }, [advanceStep, currentStep, missionCleared, showAllSteps, stepId, totalSteps])

  useEffect(() => {
    return () => {
      if (warningTimerRef.current) {
        window.clearTimeout(warningTimerRef.current)
      }
      if (clearTimerRef.current) {
        window.clearTimeout(clearTimerRef.current)
      }
    }
  }, [])

  const showWarning = () => {
    setWarningVisible(true)
    if (warningTimerRef.current) {
      window.clearTimeout(warningTimerRef.current)
    }
    warningTimerRef.current = window.setTimeout(() => {
      setWarningVisible(false)
    }, 1200)
  }

  const handlePurchase = () => {
    if (missionCleared || itemOwned) return
    setItemOwned(true)
    setBalance(START_BALANCE - ITEM_PRICE)
    showWarning()
  }

  const handleWork = () => {
    if (missionCleared || !itemOwned || balance >= TARGET_BALANCE) return
    setBalance((prev) => prev + WORK_REWARD)
  }

  const canBuy = !missionCleared && !itemOwned
  const canWork = !missionCleared && itemOwned && balance < TARGET_BALANCE

  const reaction = useMemo(() => {
    if (missionCleared) {
      return {
        badge: 'MISSION CLEAR',
        badgeTone: 'bg-[#EAF8EE] text-[#25724E]',
        cardTone: 'bg-[linear-gradient(180deg,#F0FFF4_0%,#DDF5E7_100%)]',
        title: '잔액이 +500원이 되었어요!',
        body: '0보다 더 부족한 상태는 음수로 나타내고, 다시 돈을 벌면 양수로 돌아올 수 있어요.',
      }
    }

    if (!itemOwned) {
      return {
        badge: 'STEP 1',
        badgeTone: 'bg-[#FFF3E8] text-[#B25A21]',
        cardTone: 'bg-[linear-gradient(180deg,#FFF8F2_0%,#FFEADF_100%)]',
        title: '먼저 아이템을 사 보세요',
        body: '1,500원짜리 아이템을 사면 잔액이 -500원으로 바뀌어요.',
      }
    }

    if (balance < 0) {
      return {
        badge: 'DEBT',
        badgeTone: 'bg-[#FFF0F0] text-[#C95252]',
        cardTone: 'bg-[linear-gradient(180deg,#FFF7F7_0%,#FFE9E9_100%)]',
        title: '이제 빚이 생겼어요',
        body: '0보다 더 부족한 상태라서 잔액이 음수예요. 알바해서 다시 양수로 바꿔 보세요.',
      }
    }

    return {
      badge: 'RECOVERY',
      badgeTone: 'bg-[#EEF7FF] text-[#2E6C96]',
      cardTone: 'bg-[linear-gradient(180deg,#F5FBFF_0%,#E4F3FF_100%)]',
      title: '거의 다 왔어요',
      body: '음수였던 잔액이 다시 양수로 회복되고 있어요.',
    }
  }, [balance, itemOwned, missionCleared])

  return (
    <div className={cn('grid gap-5 lg:grid-cols-[0.92fr_1.08fr]', className)}>
      <div className="flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF2E8] px-4 py-2 text-[12px] font-black tracking-[0.18em] text-[#A5531D]">
            <ShoppingCart size={16} />
            WALLET MISSION
          </div>

          <h3 className="mt-4 text-[25px] font-black leading-[1.35] text-[#3B2E28] sm:text-[30px]">
            돈이 부족한 상태도
            <br />
            음수로 나타낼 수 있어요
          </h3>

          <p className="mt-3 text-[15px] font-bold leading-[1.8] text-[#6F625B]">
            <span className="text-[#243E63]">+1000원</span>으로 시작해
            <br />
            아이템을 사면 <span className="text-[#D24E4E]">-500원</span>,
            <br />
            알바까지 해서 <span className="text-[#23734E]">+500원</span>을 만들면 미션 클리어예요.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] bg-[#FFF7F0] px-4 py-4 text-[14px] font-bold leading-[1.75] text-[#7A6154]">
            목표:
            <span className="ml-2 font-black text-[#23734E]">{formatWon(TARGET_BALANCE)}</span>
            <br />
            순서: <span className="font-black text-[#D96B3C]">아이템 사기</span> →
            <span className="ml-1 font-black text-[#2F8F5B]">알바하기</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handlePurchase}
              disabled={!canBuy}
              className="rounded-2xl bg-[#D96B3C] py-6 text-[14px] font-black text-white hover:bg-[#C95C2C] disabled:bg-[#E8B69F]"
            >
              아이템 사기
              <br />
              (-1,500원)
            </Button>
            <Button
              type="button"
              onClick={handleWork}
              disabled={!canWork}
              className="rounded-2xl bg-[#2F8F5B] py-6 text-[14px] font-black text-white hover:bg-[#2A8152] disabled:bg-[#9FD0B6]"
            >
              알바하기
              <br />
              (+1,000원)
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border-2 border-[#F0D5C2] bg-[#FFF9F5] p-4 sm:p-5">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={cn('rounded-[24px] px-5 py-5 text-center transition-colors duration-300', reaction.cardTone)}
        >
          <div className="flex items-center justify-center gap-2">
            <div className={cn('rounded-full px-3 py-1 text-[12px] font-black tracking-[0.14em]', reaction.badgeTone)}>
              {reaction.badge}
            </div>
            {missionCleared && (
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.84, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-[12px] font-black text-[#23734E]"
              >
                <CheckCircle2 size={14} />
                NEXT STEP
              </motion.div>
            )}
          </div>

          <div className={cn('mt-3 text-[36px] font-black leading-none sm:text-[48px]', balance < 0 ? 'text-[#D24E4E]' : missionCleared ? 'text-[#23734E]' : 'text-[#243E63]')}>
            {formatWon(balance)}
          </div>
          <div className="mt-2 text-[15px] font-black text-[#6C574D]">{reaction.title}</div>
          <div className="mt-2 text-[14px] font-bold leading-[1.75] text-[#7A655A]">{reaction.body}</div>

          {warningVisible && balance < 0 && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-3 inline-flex items-center gap-2 rounded-[16px] border-2 border-[#F29A9A] bg-[#FFF0F0] px-3 py-2 text-[13px] font-black text-[#D24E4E]"
            >
              <AlertTriangle size={16} />
              삐용삐용! 500원을 갚아야 해요
            </motion.div>
          )}
        </motion.div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            <div className="rounded-[20px] bg-white px-4 py-4">
              <div className="text-[13px] font-black text-[#8A5A39]">미션 체크리스트</div>
              <div className="mt-3 space-y-2 text-[14px] font-bold text-[#6D5B53]">
                <div className={cn('rounded-[14px] px-3 py-3', itemOwned ? 'bg-[#FFF0F0] text-[#C95252]' : 'bg-[#FFF7F0]')}>
                  {itemOwned ? '완료 1. 아이템을 사서 -500원이 되었어요' : '1. 아이템을 사서 -500원 만들기'}
                </div>
                <div className={cn('rounded-[14px] px-3 py-3', missionCleared ? 'bg-[#ECFAF1] text-[#23734E]' : 'bg-[#F7FBF8]')}>
                  {missionCleared ? '완료 2. 알바해서 +500원으로 회복했어요' : '2. 알바해서 +500원 만들기'}
                </div>
              </div>
            </div>

            <div className="rounded-[18px] border-2 border-dashed border-[#F0D5C2] bg-[#FFF7F0] px-4 py-3 text-[13px] font-black leading-[1.75] text-[#7A6154]">
              0보다 더 부족하면 <span className="text-[#D24E4E]">음수</span>,
              <br />
              다시 돈을 벌어 0보다 많아지면 <span className="text-[#23734E]">양수</span>가 돼요.
            </div>
          </div>

          <div className="rounded-[24px] border-2 border-[#F1DDCF] bg-white px-4 py-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] bg-[#FFF8F1] px-3 py-3 text-center">
                <div className="text-[12px] font-black text-[#8A5A39]">진열대</div>
                <div className="mt-2 text-[34px]">{itemOwned ? '✨' : '🧙‍♂️'}</div>
                <div className="mt-1 text-[15px] font-black text-[#55453D]">희귀 아이템</div>
                <div className="text-[13px] font-black text-[#D05D2E]">{ITEM_PRICE.toLocaleString()}원</div>
              </div>

              <div className={cn('rounded-[18px] border-2 px-3 py-3 text-center transition-colors', itemOwned ? 'border-[#F0B2B2] bg-[#FFF4F4]' : 'border-[#D7C3B6] bg-[#FFFDFC]')}>
                <div className="text-[12px] font-black text-[#7A6154]">장바구니</div>
                <div className="mt-2 text-[32px]">{itemOwned ? '🛒' : '🧺'}</div>
                <div className="mt-1 text-[13px] font-black text-[#6B5A51]">
                  {itemOwned ? '아이템 구매 완료!' : '아직 아이템을 사지 않았어요'}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[18px] bg-[#FFF7F0] px-4 py-4 text-center text-[13px] font-black leading-[1.8] text-[#7A6154]">
              {itemOwned ? (
                <>
                  아이템을 사는 순간 잔액이
                  <span className="mx-1 text-[#D24E4E]">-500원</span>
                  으로 바뀌었어요.
                </>
              ) : (
                <>
                  먼저 아이템을 사서
                  <br />
                  0보다 더 부족한 상태를 만들어 보세요.
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-5 rounded-[18px] px-4 py-4 text-center text-[15px] font-black leading-[1.8]',
            missionCleared
              ? 'border-2 border-[#B8DFCA] bg-[#EDF9F2] text-[#2A6E4C]'
              : 'border-2 border-[#F0B2B2] bg-[#FFF3F3] text-[#C94E4E]',
          )}
        >
          {missionCleared ? (
            <>
              0원보다 더 부족한 상태,
              <br />
              즉 빚이나 결핍도 음수로 나타낸다.
            </>
          ) : (
            <>
              아이템을 사고 알바까지 해서
              <br />
              잔액 +500원 미션을 클리어해 보세요.
            </>
          )}
        </div>
      </div>
    </div>
  )
}
