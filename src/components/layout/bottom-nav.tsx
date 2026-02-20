import { cn } from '@/lib/utils'

interface BottomNavProps {
    className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
    return (
        <nav className={cn(
            "absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-6 pt-3 px-6 z-50",
            className
        )}>
            <div className="flex justify-around items-center">
                <button className="flex flex-col items-center space-y-1 text-dashboard-primary transition-transform active:scale-95">
                    <span className="material-icons-round text-[26px]">home</span>
                    <span className="text-[10px] font-bold">홈</span>
                </button>
                <button className="flex flex-col items-center space-y-1 text-muted-light dark:text-muted-dark hover:text-dashboard-primary transition-all active:scale-95">
                    <span className="material-icons-round text-[26px]">leaderboard</span>
                    <span className="text-[10px] font-bold">통계</span>
                </button>

                {/* Floating Action Button Style Center Action */}
                <div className="w-14 h-14 bg-dashboard-primary rounded-full flex items-center justify-center shadow-glow -mt-8 border-[5px] border-white dark:border-background-dark cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0">
                    <span className="material-icons-round text-white text-3xl pl-0.5">play_arrow</span>
                </div>

                <button className="flex flex-col items-center space-y-1 text-muted-light dark:text-muted-dark hover:text-dashboard-primary transition-all active:scale-95">
                    <span className="material-icons-round text-[26px]">school</span>
                    <span className="text-[10px] font-bold">오답노트</span>
                </button>
                <button className="flex flex-col items-center space-y-1 text-muted-light dark:text-muted-dark hover:text-dashboard-primary transition-all active:scale-95">
                    <span className="material-icons-round text-[26px]">person</span>
                    <span className="text-[10px] font-bold">내 정보</span>
                </button>
            </div>
        </nav>
    )
}
