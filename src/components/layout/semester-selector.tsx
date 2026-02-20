import { cn } from '@/lib/utils'
import type { SemesterData, SemesterId } from '@/data/curriculum'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SemesterSelectorProps {
    semesters: SemesterData[]
    activeSemester: SemesterId
    onChange: (id: SemesterId) => void
}

export function SemesterSelector({ semesters, activeSemester, onChange }: SemesterSelectorProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Scroll active item into view on mount or change
    useEffect(() => {
        if (containerRef.current) {
            const activeEl = containerRef.current.querySelector('[data-state="active"]')
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
            }
        }
    }, [activeSemester])

    return (
        <nav className="w-full bg-white border-b border-slate-100 pb-3 pt-2 shadow-sm relative z-20" aria-label="학기 선택">
            <div
                ref={containerRef}
                role="tablist"
                className="flex overflow-x-auto gap-2 px-6 py-1 no-scrollbar snap-x snap-mandatory relative"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {semesters.map((sem) => {
                    const isActive = sem.id === activeSemester
                    return (
                        <button
                            key={sem.id}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${sem.id}`}
                            id={`tab-${sem.id}`}
                            data-state={isActive ? 'active' : 'inactive'}
                            onClick={() => onChange(sem.id)}
                            className={cn(
                                "relative snap-center shrink-0 rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                                isActive
                                    ? "text-white"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-semester-pill"
                                    className="absolute inset-0 bg-slate-900 rounded-full z-[-1] shadow-md shadow-slate-900/20"
                                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                />
                            )}
                            <span className="relative z-10">{sem.id}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
