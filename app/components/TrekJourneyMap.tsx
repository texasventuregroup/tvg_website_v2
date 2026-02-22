'use client';

interface ScheduleItem {
    time: string;
    activity: string;
    location?: string;
    type: 'visit' | 'social' | 'travel';
}

interface TrekJourneyMapProps {
    schedule: ScheduleItem[];
}

export default function TrekJourneyMap({ schedule }: TrekJourneyMapProps) {
    return (
        <div className="relative border-l-2 border-[#082820]/10 ml-6 md:ml-10 pl-8 md:pl-10 py-6 space-y-8">
            {schedule.map((item, idx) => (
                <div key={idx} className="relative group">
                    {/* Node on the line */}
                    <div className={`
                        absolute -left-[37px] md:-left-[49px] top-2 w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] border-white
                        transition-colors duration-300 z-10 shadow-sm
                        ${item.type === 'visit' ? 'bg-[#082820] group-hover:bg-[#016F4E]' :
                            item.type === 'social' ? 'bg-[#D97706] group-hover:bg-[#F59E0B]' : 'bg-gray-400'}
                    `} />

                    {/* Card */}
                    <div className="bg-white p-5 md:p-6 rounded-xl border border-[#082820]/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs md:text-sm text-[#016F4E] font-medium bg-[#016F4E]/5 px-2.5 py-1 rounded w-fit">
                                {item.time}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                {item.type}
                            </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#082820] mb-1">
                            {item.activity}
                        </h3>
                        {item.location && (
                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-gray-400" /> {item.location}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
