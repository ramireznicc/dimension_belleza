import { useMemo } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

const SHOOTING_STARS = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  top: `${rand(8, 45)}%`,
  delay: `${rand(3, 14)}s`,
  duration: `${rand(1.8, 2.8)}s`,
  width: rand(90, 160),
}));

export default function StarField({ count = 120 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${rand(0, 100)}%`,
        left: `${rand(0, 100)}%`,
        size: rand(1, 3),
        duration: `${rand(2.5, 6)}s`,
        delay: `${rand(0, 5)}s`,
        maxOpacity: rand(0.4, 0.9),
      })),
    [count]
  );

  return (
    <div className="stars-layer" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--duration': s.duration,
            '--delay': s.delay,
            '--max-opacity': s.maxOpacity,
          }}
        />
      ))}

      {SHOOTING_STARS.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="shooting-star"
          style={{
            top: s.top,
            '--shoot-delay': s.delay,
            '--shoot-duration': s.duration,
            '--shoot-width': `${s.width}px`,
          }}
        />
      ))}
    </div>
  );
}
