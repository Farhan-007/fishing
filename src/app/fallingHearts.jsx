"use client"
import { useEffect, useRef } from 'react';

export default function FallingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const hearts = ['❤️', '💖', '💝', '💗', '💓'];

    // Create 40 hearts at staggered intervals.
    for (let i = 0; i < 1000; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        // Set a random horizontal starting position.
        const startX = Math.random() * window.innerWidth;
        heart.style.left = `${startX}px`;
        heart.style.top = '100%';

        // Append the heart to our container.
        containerRef.current?.appendChild(heart);

        // Animate the heart upward.
        let position = window.innerHeight;
        const interval = setInterval(() => {
          if (position < -50) {
            clearInterval(interval);
            heart.remove();
          }
          position -= 2;
          heart.style.top = `${position}px`;
          // Slight horizontal wiggle:
          heart.style.left = `${parseFloat(heart.style.left) + (Math.random() - 0.5) * 2}px`;
        }, 20);
      }, i * 200);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
    </div>
  );
}
