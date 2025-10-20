'use client';
import React from 'react';
import Image from 'next/image';

type Slide = { src: string; alt: string };

export default function ImageSlider({
  slides,
  interval = 6000,
  rounded = 'rounded-3xl',
  className = '',
}: {
  slides: Slide[];
  interval?: number;
  rounded?: string;
  className?: string;
}) {
  const [idx, setIdx] = React.useState(0);
  const ref = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (ref.current) clearInterval(ref.current);
    ref.current = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, interval);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [interval, slides.length]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${rounded} ${className}`}
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-700 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i === idx ? 'false' : 'true'}
        >
          <Image src={s.src} alt={s.alt} fill className="object-contain" priority={i === 0} />
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2.5 w-2.5 rounded-full border border-white/60 ${i === idx ? 'bg-white' : 'bg-white/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
