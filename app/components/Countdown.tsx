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

function useCountdown(targetDate: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
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

  return timeLeft;
}

export default function Countdown({ targetDate, deadlineText }: CountdownProps) {
  const timeLeft = useCountdown(targetDate);
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      <div className="countdown__header">Application Deadline</div>
      <div className="countdown">
        <div className="countdown__item">
          <div className="countdown__value">{formatNumber(timeLeft.days)}</div>
          <div className="countdown__label">Days</div>
        </div>
        <div className="countdown__item">
          <div className="countdown__value">{formatNumber(timeLeft.hours)}</div>
          <div className="countdown__label">Hours</div>
        </div>
        <div className="countdown__item">
          <div className="countdown__value">{formatNumber(timeLeft.minutes)}</div>
          <div className="countdown__label">Minutes</div>
        </div>
        <div className="countdown__item">
          <div className="countdown__value">{formatNumber(timeLeft.seconds)}</div>
          <div className="countdown__label">Seconds</div>
        </div>
      </div>
      <div className="countdown__deadline">{deadlineText}</div>
    </>
  );
}
