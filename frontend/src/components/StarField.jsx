import { useMemo } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

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

    </div>
  );
}
