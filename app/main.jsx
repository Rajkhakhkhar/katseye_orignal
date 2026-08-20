import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import LightstickExperience from './LightstickExperience';
import HeroExperience from './components/HeroExperience';
import DoorExperience from './components/DoorExperience';
import JourneySection from './components/JourneySection';
import KatseyeUniverse from './components/KatseyeUniverse';
import GlobalMotion from './components/GlobalMotion';
import CinematicSectionTransitions from './components/CinematicSectionTransitions';
import './styles.css';
import './section-atmospheres.css';

const eraData = {
  default: {
    label: 'LIVE MIX',
    eyebrow: 'current signal / no era selected',
    title: 'NOW',
    copy: 'The live KATSEYE archive. Trending drops, new visuals, and the next signal waiting to be discovered.',
    releases: ['TRENDING NOW', 'NEW MV', 'ON REPEAT', 'LATEST DROP', 'ARCHIVE'],
    assets: ['/default-pets.jpg', '/default-denim.jpg', '/default-chaos.jpg', '/default-gabriela.jpg', '/default-aku.jpg'],
  },
  sis: {
    label: 'SIS ERA',
    eyebrow: 'soft power / pastel signal',
    title: 'SIS',
    copy: 'A softer orbit. Small joys, bright harmonies, and a world built in pastel frequencies.',
    releases: ['SIS', 'THE INTRO', 'NEW MV', 'SOFT CUTS', 'ARCHIVE'],
    reference: '/sis-dolls.jpg',
    assets: ['/sis-dolls.jpg', '/sis-album.jpg', '/sis-editorial.webp', '/sis-lounge.jpg', '/sis-street.jpg'],
  },
  chaos: {
    label: 'BEAUTIFUL CHAOS ERA',
    eyebrow: 'edge mode / live wire',
    title: 'BEAUTIFUL<br/>CHAOS',
    copy: 'Pretty things with sharp edges. Green light, black space, and no clean way out.',
    releases: ['BEAUTIFUL CHAOS', 'VISUALIZER', 'NEW SONG', 'NIGHT DRIVE', 'ARCHIVE'],
    reference: '/chaos-collage.jpg',
    assets: ['/chaos-stage.jpg', '/chaos-black.jpg', '/chaos-olive.jpg', '/chaos-night.jpg', '/chaos-market.jpg'],
  },
  wild: {
    label: 'WILD ERA',
    eyebrow: 'untamed / after dark',
    title: 'WILD',
    copy: 'A red flash in the dark. Claws out, volume up, and every instinct turned on.',
    releases: ['WILD', 'NEW EP', 'NEW MV', 'ANIMAL CUT', 'ARCHIVE'],
    reference: '/wild-collage.jpg',
    assets: ['/wild-black.jpg', '/wild-color.jpg', '/wild-animal.webp', '/wild-pink.jpg', '/wild-cloud.jpg'],
  },
};

function App() {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [era, setEra] = useState(null);
  const [bossCursor, setBossCursor] = useState({ x: -100, y: -100, visible: false });
  const [activeMemberRoom, setActiveMemberRoom] = useState(null);
  const memberRoomScrollY = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? (window.scrollY / max) * 100 : 0);
      setBossCursor((current) => current.visible ? { ...current, visible: false } : current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!activeMemberRoom) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => window.scrollTo({ top: memberRoomScrollY.current, behavior: 'auto' }));
    };
  }, [activeMemberRoom]);

  const openMemberRoom = (member) => {
    memberRoomScrollY.current = window.scrollY;
    setActiveMemberRoom(member);
  };

  const selectEra = (key) => {
    setEra(era === key ? null : key);
  };

  const currentEra = eraData[era || 'default'];
  const cursorAsset = era === 'sis' ? '/cursor-flower.png' : era === 'chaos' ? '/cursor-knife.png' : era === 'wild' ? '/cursor-paw.png' : null;

  return <main>
    <GlobalMotion />
    <CinematicSectionTransitions />
    <div className="grain" aria-hidden="true" />
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Katseye home">KATSEYE<span>*</span></a>
      <p className="issue">a global story <i>01</i></p>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`}>
      <a href="#boss" onClick={() => setMenuOpen(false)}>01 / ERA ARCHIVE</a>
      <a href="#journey" onClick={() => setMenuOpen(false)}>02 / THE JOURNEY</a>
      <a href="#universe" onClick={() => setMenuOpen(false)}>03 / NOW</a>
      <a href="#signal" onClick={() => setMenuOpen(false)}>04 / Next chapter</a>
      <a href="#top" onClick={() => setMenuOpen(false)}>05 / Back to orbit</a>
    </div>

    <HeroExperience />

    <section className={`boss-section era-${era} ${era && bossCursor.visible ? 'has-era-cursor' : ''}`} id="boss" onMouseMove={(event) => era && setBossCursor({ x: event.clientX, y: event.clientY, visible: true })} onMouseLeave={() => setBossCursor((current) => ({ ...current, visible: false }))}>
      <div className="boss-noise" aria-hidden="true" />
      {currentEra.reference && <div className="era-collage" aria-hidden="true"><img src={currentEra.reference} alt="" /></div>}
      <div className="boss-scratch scratch-one" aria-hidden="true" /><div className="boss-scratch scratch-two" aria-hidden="true" />
      <header className="boss-header">
        <div><p className="section-index">01 - ERA ARCHIVE</p><p className="boss-status"><span /> LIVE ERA SELECTOR / 2026</p></div>
        <div className="era-switcher" aria-label="Select an era">
          <span className="era-label">ERA</span>
          {Object.entries(eraData).filter(([key]) => key !== 'default').map(([key, item]) => <button key={key} className={era === key ? 'is-active' : ''} onClick={() => selectEra(key)} aria-pressed={era === key}>{item.label}</button>)}
        </div>
      </header>

      <div className="boss-intro">
        <div className="boss-title-wrap"><p className="boss-eyebrow">{currentEra.eyebrow}</p><h1 dangerouslySetInnerHTML={{ __html: currentEra.title }} /></div>
        <p className="boss-copy">{currentEra.copy}</p>
        <div className="boss-orbit-label"><span className="orbit-pulse" /> KATSEYE / B-SIDE / 001</div>
      </div>

      <div className="boss-divider"><span>NEW MUSIC / NEW VISUALS / NEW WORLD</span><i /></div>
      <div className="release-grid">
        {currentEra.releases.map((release, index) => <article className={`release-card release-${index + 1}`} key={release}>
          <div className="release-art">{currentEra.assets?.[index] ? <img className="release-image" src={currentEra.assets[index]} alt={`${release} visual`} /> : <span className="image-space">IMAGE<br />SPACE</span>}<span className="release-index">0{index + 1}</span><span className="release-arrow">↗</span><span className="release-stamp">{era === 'wild' ? 'UNTAMED' : era === 'chaos' ? 'UNFILTERED' : era === 'sis' ? 'SOFT SIGNAL' : 'LIVE SIGNAL'}</span></div>
          
        </article>)}
      </div>
      <div className="boss-marquee" aria-hidden="true"><span>{currentEra.label} * {currentEra.label} * {currentEra.label} * </span></div>
      {cursorAsset && <div className={`era-cursor era-cursor-${era} ${bossCursor.visible ? 'is-visible' : ''}`} style={{ left: bossCursor.x, top: bossCursor.y }} aria-hidden="true"><img src={cursorAsset} alt="" /></div>}
    </section>

    <JourneySection />
    <KatseyeUniverse />
    <LightstickExperience onMemberSelect={openMemberRoom} />
    {activeMemberRoom && <DoorExperience member={activeMemberRoom} onExit={() => setActiveMemberRoom(null)} />}
    <footer><span>KATSEYE / UNOFFICIAL FAN PROJECT</span><span>2026</span><span>MADE TO MOVE</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
