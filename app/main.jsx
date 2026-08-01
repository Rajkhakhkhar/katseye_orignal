import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import LightstickExperience from './LightstickExperience';
import DoorExperience from './components/DoorExperience';
import './styles.css';

const heroGirls = [
  { name: 'LARA', image: '/hero-lara-hq.png', number: '01', accent: 'gold' },
  { name: 'DANIELA', image: '/hero-daniela-hq.png', number: '02', accent: 'violet' },
  { name: 'MEGAN', image: '/hero-megan-hq.png', number: '03', accent: 'blue' },
  { name: 'YOONCHAE', image: '/hero-yoonchae-hq.png', number: '04', accent: 'coral' },
  { name: 'MANON', image: '/hero-manon-hq.png', number: '05', accent: 'lime' },
  { name: 'SOPHIA', image: '/hero-sophia-hq.png', number: '06', accent: 'pink' },
];

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
  const [activeGirl, setActiveGirl] = useState(0);
  const [heroLocked, setHeroLocked] = useState(false);
  const [era, setEra] = useState(null);
  const [bossCursor, setBossCursor] = useState({ x: -100, y: -100, visible: false });
  const [activeMemberRoom, setActiveMemberRoom] = useState(null);
  const memberRoomScrollY = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? (window.scrollY / max) * 100 : 0);
      setBossCursor((current) => current.visible ? { ...current, visible: false } : current);
      if (!heroLocked) setActiveGirl(Math.min(5, Math.max(0, Math.floor(window.scrollY / window.innerHeight))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [heroLocked]);

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

  const currentEra = eraData[era || 'default'];
  const cursorAsset = era === 'sis' ? '/cursor-flower.png' : era === 'chaos' ? '/cursor-knife.png' : era === 'wild' ? '/cursor-paw.png' : null;

  return <main>
    <div className="grain" aria-hidden="true" />
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Katseye home">KATSEYE<span>*</span></a>
      <p className="issue">a global story <i>01</i></p>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`}>
      <a href="#boss" onClick={() => setMenuOpen(false)}>01 / ERA ARCHIVE</a>
      <a href="#signal" onClick={() => setMenuOpen(false)}>02 / Next chapter</a>
      <a href="#top" onClick={() => setMenuOpen(false)}>03 / Back to orbit</a>
    </div>

    <section className="hero-sequence" id="top" aria-label="Katseye member introduction">
      <div className="hero-sticky">
        <div className="liquid-lines" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="hero-starfield" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="hero-giant-word" aria-hidden="true">KATSEYE</div>
        <div className="hero-interface top-left"><span>01</span><i /><span>THE EYE IS OPEN</span></div>
        <div className="hero-interface top-right"><span>LIVE / 06</span><i /><span>SCROLL EXPERIENCE</span></div>
        <div className="hero-frame" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="hero-haze haze-one" aria-hidden="true" /><div className="hero-haze haze-two" aria-hidden="true" />
        {heroGirls.map((girl, index) => <article className={`girl-scene tone-${girl.accent} ${index === activeGirl ? 'is-active' : ''}`} key={girl.name} aria-hidden={index !== activeGirl}>
          <div className="name-shadow">{girl.name}</div>
          <img className="hero-girl" src={girl.image} alt={index === activeGirl ? `${girl.name} of Katseye` : ''} />
          <div className="girl-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="girl-caption"><span>{girl.number} / 06</span><span>KATSEYE</span></div>
        </article>)}
        <div className="hero-annotation left">MEET THE GIRLS</div>
        <div className="hero-annotation right"><span className="scroll-word">SCROLL</span> <b>{String(activeGirl + 1).padStart(2, '0')}</b> / 06</div>
        <button className={`hero-lock ${heroLocked ? 'is-locked' : ''}`} onClick={() => setHeroLocked(!heroLocked)} aria-pressed={heroLocked}><span className="lock-dot" /> {heroLocked ? 'BACK TO SCROLL' : 'TAP TO LOCK'}</button>
        <div className="hero-rhythm" aria-hidden="true">FEEL THE FREQUENCY - FEEL THE FREQUENCY - FEEL THE FREQUENCY - </div>
        <div className="hero-scroll-track" aria-hidden="true"><span style={{ transform: `scaleY(${(activeGirl + 1) / 6})` }} /></div>
      </div>
    </section>

    <section className={`boss-section era-${era} ${era && bossCursor.visible ? 'has-era-cursor' : ''}`} id="boss" onMouseMove={(event) => era && setBossCursor({ x: event.clientX, y: event.clientY, visible: true })} onMouseLeave={() => setBossCursor((current) => ({ ...current, visible: false }))}>
      <div className="boss-noise" aria-hidden="true" />
      {currentEra.reference && <div className="era-collage" aria-hidden="true"><img src={currentEra.reference} alt="" /></div>}
      <div className="boss-scratch scratch-one" aria-hidden="true" /><div className="boss-scratch scratch-two" aria-hidden="true" />
      <header className="boss-header">
        <div><p className="section-index">01 - ERA ARCHIVE</p><p className="boss-status"><span /> LIVE ERA SELECTOR / 2026</p></div>
        <div className="era-switcher" aria-label="Select an era">
          <span className="era-label">ERA</span>
          {Object.entries(eraData).filter(([key]) => key !== 'default').map(([key, item]) => <button key={key} className={era === key ? 'is-active' : ''} onClick={() => setEra(era === key ? null : key)} aria-pressed={era === key}>{item.label}</button>)}
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

    <LightstickExperience onMemberSelect={openMemberRoom} />
    {activeMemberRoom && <DoorExperience member={activeMemberRoom} onExit={() => setActiveMemberRoom(null)} />}
    <footer><span>KATSEYE / UNOFFICIAL FAN PROJECT</span><span>2026</span><span>MADE TO MOVE</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
