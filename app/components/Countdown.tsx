'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
  deadlineText: string;
}

function useCountdown(targetDate: Date): { timeLeft: TimeLeft; isClient: boolean } {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isClient };
}

export default function Countdown({ targetDate, deadlineText }: CountdownProps) {
  const { timeLeft, isClient } = useCountdown(targetDate);
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center animate-fade-in-up delay-100">
      <div className="text-xl font-semibold mb-6 text-tvg-forest dark:text-cream uppercase tracking-widest opacity-80">Application Deadline</div>
      <div className="flex gap-4 md:gap-8 mb-6">
        <div className="flex flex-col items-center bg-white dark:bg-white/5 p-4 rounded-xl min-w-[80px] md:min-w-[100px] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-tvg-forest to-tvg-teal bg-clip-text text-transparent mb-1" suppressHydrationWarning>{isClient ? formatNumber(timeLeft.days) : '--'}</div>
          <div className="text-xs uppercase tracking-wider opacity-60">Days</div>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-white/5 p-4 rounded-xl min-w-[80px] md:min-w-[100px] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-tvg-forest to-tvg-teal bg-clip-text text-transparent mb-1" suppressHydrationWarning>{isClient ? formatNumber(timeLeft.hours) : '--'}</div>
          <div className="text-xs uppercase tracking-wider opacity-60">Hours</div>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-white/5 p-4 rounded-xl min-w-[80px] md:min-w-[100px] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-tvg-forest to-tvg-teal bg-clip-text text-transparent mb-1" suppressHydrationWarning>{isClient ? formatNumber(timeLeft.minutes) : '--'}</div>
          <div className="text-xs uppercase tracking-wider opacity-60">Minutes</div>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-white/5 p-4 rounded-xl min-w-[80px] md:min-w-[100px] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-tvg-forest to-tvg-teal bg-clip-text text-transparent mb-1" suppressHydrationWarning>{isClient ? formatNumber(timeLeft.seconds) : '--'}</div>
          <div className="text-xs uppercase tracking-wider opacity-60">Seconds</div>
        </div>
      </div>
      <div className="text-sm font-medium opacity-60">{deadlineText}</div>
    </div>
  );
}
