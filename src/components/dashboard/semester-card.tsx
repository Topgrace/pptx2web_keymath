import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type SemesterStatus = 'completed' | 'active' | 'locked' | 'new';

export interface SemesterCardProps {
    id: string
    title: string
    subtitle: string
    status: SemesterStatus
    progress?: number // 0-100
    onClick: () => void
}

export function SemesterCard({ id, title, subtitle, status, progress = 0, onClick }: SemesterCardProps) {
    // Map visual configurations based on the mock template's semester ids
    const getVisualConfig = (): { bgOuter: string, innerShape: ReactNode } => {
        switch (id) {
            case '1-1': // Blue / Calculate
                return {
                    bgOuter: "bg-blue-50 dark:bg-blue-900/20",
                    innerShape: (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-blue-400 rounded-lg transform rotate-12 opacity-80" />
                            <div className="w-12 h-12 bg-indigo-500 rounded-full absolute -ml-4 mt-4 opacity-80 mix-blend-multiply dark:mix-blend-screen" />
                            <span className="material-icons-round text-white absolute text-[32px] drop-shadow-md">calculate</span>
                        </div>
                    )
                }
            case '1-2': // Yellow / Pie Chart
                return {
                    bgOuter: "bg-yellow-50 dark:bg-yellow-900/20",
                    innerShape: (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[60px] h-[30px] bg-yellow-400 rounded-t-full absolute mt-6 opacity-90" />
                            <div className="w-[36px] h-[36px] bg-orange-400 rounded-xl transform rotate-45 absolute -mt-4 opacity-80" />
                            <span className="material-icons-round text-white absolute text-[30px] drop-shadow-md">pie_chart</span>
                        </div>
                    )
                }
            case '2-1': // Purple / Timeline / New
            case '2-2': // Green / Lock (Fallback if 2-2 is locked, but let's base it on ID)
                if (id === '2-1') {
                    return {
                        bgOuter: "bg-purple-50 dark:bg-purple-900/20",
                        innerShape: (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 border-[5px] border-purple-400 rounded-full opacity-60" />
                                <div className="w-1.5 bg-purple-500 h-16 absolute transform rotate-45 rounded-full" />
                                <div className="w-16 h-1.5 bg-purple-500 absolute transform rotate-45 rounded-full" />
                                <span className="material-icons-round text-purple-600 dark:text-purple-300 absolute text-3xl drop-shadow-sm bg-white dark:bg-gray-800 rounded-full p-1.5">timeline</span>
                            </div>
                        )
                    }
                } else {
                    return {
                        bgOuter: "bg-green-50 dark:bg-green-900/20",
                        innerShape: (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[25px] border-l-transparent border-b-[40px] border-b-green-400 border-r-[25px] border-r-transparent mb-2 opacity-80" />
                                <div className="w-8 h-8 bg-teal-500 rounded-lg absolute -bottom-1 -right-2 opacity-80" />
                                {status === 'locked' && (
                                    <span className="material-icons-round text-gray-500 text-[32px] absolute z-20">lock</span>
                                )}
                            </div>
                        )
                    }
                }
            case '3-1': // Red / Square Root
                return {
                    bgOuter: "bg-red-50 dark:bg-red-900/20",
                    innerShape: (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[45px] h-[45px] border-4 border-red-400 rounded-xl transform rotate-45 opacity-60" />
                            <div className="w-8 h-8 bg-red-500 rounded-full absolute opacity-80" />
                            <span className="material-icons-round text-white absolute text-2xl font-bold">functions</span>
                        </div>
                    )
                }
            case '3-2': // Indigo / Architecture
            default:
                return {
                    bgOuter: "bg-indigo-50 dark:bg-indigo-900/20",
                    innerShape: (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-400 to-blue-300 rounded-full opacity-50 blur-sm" />
                            <div className="w-10 h-10 border-[3px] border-indigo-600 dark:border-indigo-300 absolute transform rotate-12" />
                            <span className="material-icons-round text-indigo-700 dark:text-indigo-200 absolute text-3xl">architecture</span>
                        </div>
                    )
                }
        }
    }

    const { bgOuter, innerShape } = getVisualConfig()
    const isLocked = status === 'locked'

    return (
        <motion.div
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            onClick={!isLocked ? onClick : undefined}
            className={cn(
                "group relative bg-card-light dark:bg-card-dark rounded-[20px] p-4 shadow-soft transition-all duration-300 border-2 border-transparent",
                !isLocked ? "cursor-pointer hover:shadow-lg hover:border-dashboard-primary/20" : "opacity-70 cursor-not-allowed"
            )}
        >
            {/* Status Badge */}
            {status === 'completed' && (
                <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">완료</div>
            )}
            {status === 'active' && (
                <div className="absolute top-3 right-3 bg-dashboard-accent text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">학습중</div>
            )}
            {status === 'new' && (
                <div className="absolute top-3 right-3 bg-dashboard-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">NEW</div>
            )}

            {/* Lock Overlay */}
            {isLocked && (
                <div className="absolute inset-0 bg-white/50 dark:bg-black/20 rounded-[20px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-icons-round text-gray-500 text-3xl">lock</span>
                </div>
            )}

            {/* Visual Header */}
            <div className={cn("w-full aspect-square rounded-xl mb-4 flex items-center justify-center relative overflow-hidden", bgOuter)}>
                {innerShape}
            </div>

            {/* Text Content */}
            <h3 className="text-[15px] font-bold text-text-light dark:text-text-dark mb-1 leading-tight tracking-tight">{title}</h3>
            <p className="text-[11px] text-muted-light dark:text-muted-dark mb-3 line-clamp-1">{subtitle}</p>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                {!isLocked && (
                    <div
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-700 ease-out",
                            status === 'completed' ? 'bg-green-500' : (status === 'active' ? 'bg-dashboard-accent' : 'bg-gray-300')
                        )}
                        style={{ width: `${progress}%` }}
                    />
                )}
            </div>
        </motion.div>
    )
}
