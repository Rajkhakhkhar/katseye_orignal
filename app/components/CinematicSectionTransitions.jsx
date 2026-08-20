import { useEffect, useRef, useState } from 'react';
import './CinematicSectionTransitions.css';

// These are the actual full-page chapters. Bridges are deliberately visual
// only: no pinning, cloned content, or competing scroll timelines.
const chapters = [
  { id: 'hero', selector: '.hero-r3f' },
  { id: 'era', selector: '.boss-section' },
  { id: 'journey', selector: '.journey-v3' },
  { id: 'now', selector: '.present-day' },
  { id: 'lightstick', selector: '.lightstick-transition' },
];

export default function CinematicSectionTransitions() {
  const [boundaries, setBoundaries] = useState([]);
  const bridgeRefs = useRef(new Map());
  const positionBridgesRef = useRef(() => {});

  useEffect(() => {
    const page = document.querySelector('main');
    const chapterNodes = chapters
      .map((chapter) => ({ ...chapter, node: document.querySelector(chapter.selector) }))
      .filter((chapter) => chapter.node);
    if (!page || !chapterNodes.length) return undefined;

    chapterNodes.forEach(({ node }) => node.classList.add('cinematic-chapter'));
    setBoundaries(chapterNodes.slice(0, -1).flatMap((chapter, index) => {
      const nextChapter = chapterNodes[index + 1];
      return [{ id: `${chapter.id}-${nextChapter.id}`, from: chapter.id, to: nextChapter.id }];
    }));

    const positionBridges = () => {
      const pageTop = page.getBoundingClientRect().top;
      chapterNodes.slice(0, -1).forEach((chapter, index) => {
        const bridge = bridgeRefs.current.get(`${chapter.id}-${chapterNodes[index + 1].id}`);
        if (!bridge) return;
        const seam = chapter.node.getBoundingClientRect().bottom - pageTop;
        bridge.style.setProperty('--bridge-y', `${seam.toFixed(1)}px`);
      });
    };
    positionBridgesRef.current = positionBridges;

    const frame = window.requestAnimationFrame(positionBridges);
    const resizeObserver = new ResizeObserver(positionBridges);
    resizeObserver.observe(page);
    chapterNodes.forEach(({ node }) => resizeObserver.observe(node));
    window.addEventListener('resize', positionBridges);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', positionBridges);
      positionBridgesRef.current = () => {};
      setBoundaries([]);
      chapterNodes.forEach(({ node }) => node.classList.remove('cinematic-chapter'));
    };
  }, []);

  useEffect(() => {
    if (!boundaries.length) return undefined;
    const frame = window.requestAnimationFrame(() => positionBridgesRef.current());
    return () => window.cancelAnimationFrame(frame);
  }, [boundaries]);

  useEffect(() => {
    if (!boundaries.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const bridges = [...document.querySelectorAll('.cinematic-boundary-bridge')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-active', entry.isIntersecting);
      });
    }, { rootMargin: '-18% 0px -18% 0px', threshold: .08 });
    bridges.forEach((bridge) => observer.observe(bridge));
    return () => observer.disconnect();
  }, [boundaries]);

  return <div className="cinematic-boundary-system" aria-hidden="true">
    {boundaries.map((boundary) => <div
      className={`cinematic-boundary-bridge bridge-${boundary.from}-to-${boundary.to}`}
      key={boundary.id}
      ref={(node) => {
        if (node) bridgeRefs.current.set(boundary.id, node);
        else bridgeRefs.current.delete(boundary.id);
      }}
    >
      <span className="cinematic-bridge-guide" />
      <span className="cinematic-bridge-dust"><i /><i /><i /><i /><i /><i /></span>
    </div>)}
  </div>;
}
