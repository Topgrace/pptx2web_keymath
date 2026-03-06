import type { UnitNode } from '@/data/curriculum'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { preloadUnitRoute } from '@/lib/unit-route-loaders'

interface CourseNodeProps {
    unit: UnitNode
    index: number // 0-based across the chapter
}

export function CourseNode({ unit, index }: CourseNodeProps) {
    const isLocked = unit.status === 'locked'
    const isCompleted = unit.status === 'completed'
    const isUnlocked = unit.status === 'unlocked'
    const navigate = useNavigate()

    // Click handler instead of Link to maintain button semantics from template
    const handleUnitClick = () => {
        if (!isLocked && unit.path) {
            navigate(unit.path)
        }
    }

    const handlePrefetch = () => {
        if (!isLocked && unit.path) {
            void preloadUnitRoute(unit.path)
        }
    }

    // Styles mapped from template
    const dotColor = isCompleted ? "bg-green-500" : isUnlocked ? "bg-dashboard-accent" : "bg-gray-300 dark:bg-gray-600"

    // Status specific inner content
    let StatusIcon = <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>

    if (isUnlocked) {
        StatusIcon = (
            <div className="w-8 h-8 rounded-full bg-dashboard-accent/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-dashboard-accent text-sm">play_arrow</span>
            </div>
        )
    } else if (isLocked) {
        StatusIcon = <span className="material-symbols-outlined text-muted-light dark:text-muted-dark text-xl">lock</span>
    }

    const content = (
        <div className="relative pl-6 group">
            {/* Timeline Dot */}
            <div className={cn(
                "absolute -left-2.25 top-3 w-4 h-4 rounded-full border-4 border-white dark:border-background-dark shadow-sm z-10",
                dotColor,
                isUnlocked && "animate-pulse" // Accent ping for active node
            )} />

            {/* Main Interactive Button Card */}
            <button
                onClick={handleUnitClick}
                onPointerEnter={handlePrefetch}
                onFocus={handlePrefetch}
                onTouchStart={handlePrefetch}
                disabled={isLocked}
                className={cn(
                    "w-full bg-card-light dark:bg-card-dark rounded-xl p-4 transition-all flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-dashboard-primary",
                    isCompleted && "shadow-sm border border-transparent hover:border-dashboard-primary/20 dark:border-gray-700",
                    isUnlocked && "shadow-soft border-l-4 border-l-dashboard-accent border-y border-r border-gray-100 dark:border-gray-700",
                    isLocked && "shadow-sm border border-transparent opacity-60 cursor-not-allowed"
                )}
            >
                <div className="flex items-center space-x-3 text-left">
                    <span className={cn(
                        "text-sm font-medium transition-colors line-clamp-2",
                        isUnlocked && "font-bold text-text-light dark:text-text-dark",
                        isCompleted && "text-text-light dark:text-text-dark group-hover:text-dashboard-primary",
                        isLocked && "text-muted-light dark:text-muted-dark"
                    )}>
                        {unit.title}
                    </span>
                </div>
                <div className="shrink-0 ml-3">
                    {StatusIcon}
                </div>
            </button>
        </div>
    )

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (index % 5) * 0.1 }}
            className="w-full"
        >
            {content}
        </motion.div>
    )
}
