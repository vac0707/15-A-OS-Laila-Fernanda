
import React, { useState, useEffect } from 'react';
import { EVENT_DATE } from '../constants';
import { TimeRemaining } from '../types';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +EVENT_DATE - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="flex justify-center gap-4 md:gap-8 mt-6">
      {[
        { label: 'Días', value: timeLeft.days },
        { label: 'Hrs', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Seg', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center shadow-md">
            <span className="text-xl md:text-3xl font-title text-emerald-700 font-bold">{item.value}</span>
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest mt-2 text-emerald-600 font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
