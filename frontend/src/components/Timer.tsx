import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isTestMode: boolean;
}

const Timer: React.FC<TimerProps> = ({ isTestMode }) => {
  const [timeElapsed, setTimeElapsed] = useState(0); // Time in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0 || hours > 0) {
      parts.push(`${minutes}m`);
    }
    parts.push(`${remainingSeconds}s`);

    return parts.join(' ');
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
      isTestMode ? 'bg-red-50 text-red-900' : 'bg-gray-100 text-gray-900'
    }`}>
      <Clock className={`h-4 w-4 ${
        isTestMode ? 'text-red-900' : 'text-gray-600'
      }`} />
      <span className="font-medium">{formatTime(timeElapsed)}</span>
    </div>
  );
};

export default Timer;