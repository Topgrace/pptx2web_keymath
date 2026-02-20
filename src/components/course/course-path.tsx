import type { ChapterNode } from '@/data/curriculum'
import { CourseNode } from './course-node'
import { cn } from '@/lib/utils'

interface CoursePathProps {
    chapters: ChapterNode[]
}

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

export function CoursePath({ chapters }: CoursePathProps) {
    return (
        <div className="flex flex-col w-full pb-8">
            {chapters.map((chapter, chapterIdx) => {
                // Determine chapter overall status mock logic for visual representation
                // In a real app this would compute from all children units
                const isAllCompleted = chapter.units.every(u => u.status === 'completed')
                const isAllLocked = chapter.units.every(u => u.status === 'locked')
                const _status = isAllCompleted ? 'completed' : isAllLocked ? 'locked' : 'active'

                const roman = romanNumerals[chapterIdx] || String(chapterIdx + 1)

                return (
                    <section key={chapter.id} className="w-full relative">
                        {/* Chapter Sticky Header */}
                        <div className="flex items-center justify-between mb-4 sticky top-[120px] bg-background-light dark:bg-background-dark py-2 z-10 -mx-6 px-6">
                            <h3 className="text-lg font-bold text-text-light dark:text-text-dark font-display flex items-center">
                                <span className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3 shrink-0",
                                    _status === 'completed' && "bg-dashboard-primary/10 text-dashboard-primary",
                                    _status === 'active' && "bg-dashboard-accent/10 text-dashboard-accent",
                                    _status === 'locked' && "bg-gray-200 dark:bg-gray-700 text-muted-light dark:text-muted-dark"
                                )}>
                                    {roman}
                                </span>
                                <span className="line-clamp-1">{chapter.title.split('. ')[1] || chapter.title}</span>
                            </h3>

                            {/* Chapter Status Badge */}
                            {_status === 'completed' && (
                                <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg shrink-0 ml-3">완료</span>
                            )}
                            {_status === 'active' && (
                                <span className="text-xs font-bold text-dashboard-accent bg-dashboard-accent/10 dark:bg-dashboard-accent/10 px-2 py-1 rounded-lg shrink-0 ml-3">학습중</span>
                            )}
                            {_status === 'locked' && (
                                <span className="text-xs font-bold text-muted-light bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg shrink-0 ml-3">잠김</span>
                            )}
                        </div>

                        {/* Units List with Connecting Vertical Line */}
                        <div className="space-y-3 pl-2 relative border-l-2 border-gray-100 dark:border-gray-800 ml-4 pb-8">
                            {chapter.units.map((unit, unitIdx) => (
                                <CourseNode
                                    key={unit.id}
                                    unit={unit}
                                    index={unitIdx}
                                />
                            ))}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
