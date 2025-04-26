
import React, { useEffect, useState } from 'react';

interface SoundWaveAnimationProps {
  isActive: boolean;
  className?: string;
  barCount?: number;
}

const SoundWaveAnimation: React.FC<SoundWaveAnimationProps> = ({
  isActive = false,
  className = '',
  barCount = 5
}) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(barCount).fill(10));
      return;
    }

    const interval = setInterval(() => {
      const newHeights = Array(barCount)
        .fill(0)
        .map(() => isActive ? Math.floor(Math.random() * 70) + 30 : 10);
      setHeights(newHeights);
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  return (
    <div className={`sound-wave ${className}`}>
      {heights.map((height, index) => (
        <div
          key={index}
          className="sound-wave-bar"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};

export default SoundWaveAnimation;
