import { useEffect, useMemo, useRef, useState } from 'react';
import './GlobalMotion.css';

const particleSeed = Array.from({ length: 28 }, (_, index) => ({
  x: (index * 37 + 11) % 100,
  y: (index * 61 + 7) % 100,
  size: 1 + ((index * 7) % 3),
  opacity: .08 + (((index * 13) % 8) * .012),
  duration: 18 + ((index * 11) % 19),
  delay: -((index * 17) % 31),
  driftX: -11 + ((index * 19) % 23),
  driftY: -14 + ((index * 23) % 29),
}));

export default function GlobalMotion() {
  const cursor = useRef();
  const frame = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const root = document.documentElement;
    const pointerQuery = window.matchMedia('(pointer: fine)');
    let pointerX = window.innerWidth * .5;
    let pointerY = window.innerHeight * .5;
    let smoothX = pointerX;
    let smoothY = pointerY;
    let visible = !document.hidden;
    let scrollFrame = 0;

    const renderCursor = () => {
      frame.current = 0;
      if (!visible) return;

      if (pointerQuery.matches && cursor.current) {
        smoothX += (pointerX - smoothX) * .085;
        smoothY += (pointerY - smoothY) * .085;
        cursor.current.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0) translate3d(-50%, -50%, 0)`;
        if (Math.abs(pointerX - smoothX) > .25 || Math.abs(pointerY - smoothY) > .25) {
          frame.current = window.requestAnimationFrame(renderCursor);
        }
      }
    };

    const updateScrollDrift = () => {
      scrollFrame = 0;
      const driftY = Math.sin(window.scrollY * .0012) * 14;
      const driftX = Math.cos(window.scrollY * .0008) * 9;
      root.style.setProperty('--global-drift-x', `${driftX.toFixed(2)}px`);
      root.style.setProperty('--global-drift-y', `${driftY.toFixed(2)}px`);
    };

    const startCursor = () => {
      if (!frame.current && visible && pointerQuery.matches) frame.current = window.requestAnimationFrame(renderCursor);
    };
    const onPointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.current?.classList.add('is-active');
      startCursor();
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollDrift);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      root.classList.toggle('global-motion-paused', !visible);
      if (!visible && frame.current) {
        window.cancelAnimationFrame(frame.current);
        frame.current = 0;
      }
      if (visible) updateScrollDrift();
    };

    root.classList.add('global-motion-enabled');
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    updateScrollDrift();

    return () => {
      root.classList.remove('global-motion-enabled', 'global-motion-paused');
      root.style.removeProperty('--global-drift-x');
      root.style.removeProperty('--global-drift-y');
      window.cancelAnimationFrame(frame.current);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion]);

  const particles = useMemo(() => particleSeed, []);
  if (reducedMotion) return null;

  return <div className="global-motion" aria-hidden="true">
    <div className="global-motion-breath" />
    <div ref={cursor} className="global-cursor-glow" />
    <div className="global-particle-field">
      {particles.map((particle, index) => <i key={index} style={{
        '--particle-x': `${particle.x}%`,
        '--particle-y': `${particle.y}%`,
        '--particle-size': `${particle.size}px`,
        '--particle-opacity': particle.opacity,
        '--particle-duration': `${particle.duration}s`,
        '--particle-delay': `${particle.delay}s`,
        '--particle-drift-x': `${particle.driftX}px`,
        '--particle-drift-y': `${particle.driftY}px`,
      }} />)}
    </div>
  </div>;
}
