import { useEffect, useRef, useState } from 'react';
import './KatseyeUniverse.css';
import './KatseyeUniverseMedia.css';
import './KatseyeUniverseArchiveTransition.css';
import professionalAssets from 'virtual:professional-assets';

const wildTracks = ['Animal', 'Pinky Up', 'Hootie Frutti', 'Bel Air', 'That Way', 'Unloveu'];
const campaigns = ['Gap / campaign', 'Coach / campaign', 'Fendi / campaign', 'Glossier / campaign', 'Pandora / campaign', 'Urban Outfitters / campaign', 'Jollibee / campaign'];

const campaignAssetFolders = {
  'Gap / campaign': 'gap',
  'Coach / campaign': 'coach',
  'Fendi / campaign': 'fendi',
  'Glossier / campaign': 'glossier',
  'Pandora / campaign': 'pandora',
  'Urban Outfitters / campaign': 'urban-outfitters',
  'Jollibee / campaign': 'jollibee',
};

const resolveProfessionalAsset = (folder) => professionalAssets[folder];

function useReveal(ref) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      setRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return revealed;
}

function EditorialPlaceholder({ label, className = '', folder }) {
  const [failed, setFailed] = useState(false);
  const src = folder && resolveProfessionalAsset(folder);
  if (src && !failed) return <img className={`present-media-image ${className}`} src={src} alt={`${label} professional imagery`} onError={() => setFailed(true)} />;
  return <div className={`present-placeholder ${className}`} aria-label={`${label} placeholder`} role="img"><span>IMAGE PLACEHOLDER</span><strong>{label}</strong><i aria-hidden="true" /></div>;
}

export default function KatseyeUniverse() {
  const sectionRef = useRef();
  const wildRef = useRef();
  const filmRef = useRef();
  const campaignRef = useRef();
  const wildRevealed = useReveal(wildRef);
  const filmRevealed = useReveal(filmRef);
  const campaignRevealed = useReveal(campaignRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
        section.style.setProperty('--present-parallax', `${(progress - .5) * 18}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);

  return <section className="present-day" id="universe" ref={sectionRef} aria-labelledby="present-day-title">
    <div className="present-archive-curtain" aria-hidden="true" />
    <header className="present-day-intro"><p>03 / PRESENT DAY</p><h2 id="present-day-title">NOW</h2><span>Everything happening in KATSEYE’s world today.</span></header>

    <section ref={wildRef} className={`present-wild present-reveal ${wildRevealed ? 'is-revealed' : ''}`} aria-labelledby="present-wild-title">
      <div className="present-wild-copy"><p>THIRD EP</p><h3 id="present-wild-title">WILD</h3><span>Released August 14, 2026</span></div>
      <EditorialPlaceholder label="WILD EP" folder="wild-ep" className="present-wild-image" />
      <ol className="present-track-list">{wildTracks.map((track, index) => <li key={track} style={{ '--track-delay': `${index * 100}ms` }}><i>0{index + 1}</i><span>{track}</span></li>)}</ol>
    </section>

    <section ref={filmRef} className={`present-film present-reveal ${filmRevealed ? 'is-revealed' : ''}`} aria-labelledby="present-film-title">
      <EditorialPlaceholder label="WILD HEARTS" folder="wild-hearts" className="present-film-poster" />
      <div className="present-film-copy"><p>NETFLIX DOCUMENTARY</p><h3 id="present-film-title">Wild<br />Hearts</h3><span>Coming soon</span><div>A cinematic look at the people, pressure and promise behind the next era.</div></div>
    </section>

    <section className="present-collaborations" aria-labelledby="present-collaborations-title">
      <header><p>IN PARTNERSHIP WITH</p><h3 id="present-collaborations-title">The world around KATSEYE</h3></header>
      <div className="present-ribbon" aria-label="KATSEYE collaborations"><div className="present-ribbon-track">{[...campaigns, ...campaigns].map((campaign, index) => <EditorialPlaceholder label={campaign} folder={campaignAssetFolders[campaign]} className="present-ribbon-poster" key={`${campaign}-${index}`} />)}</div></div>
    </section>

    <section ref={campaignRef} className={`present-campaigns present-reveal ${campaignRevealed ? 'is-revealed' : ''}`} aria-labelledby="present-campaigns-title">
      <header><p>CAMPAIGNS / EDITORIALS / LIVE</p><h3 id="present-campaigns-title">In every frame</h3></header>
      <div className="present-campaign-collage" aria-label="Campaign image placeholders">
        <EditorialPlaceholder label="BETTER IN DENIM" folder="better-in-denim" className="campaign-piece campaign-denim" />
        <EditorialPlaceholder label="MATRIX MOVES" folder="matrix-moves" className="campaign-piece campaign-matrix" />
        <EditorialPlaceholder label="AMERICAN MUSIC AWARDS" folder="american-music-awards" className="campaign-piece campaign-ama" />
        <EditorialPlaceholder label="WILD PROMOTION" folder="wild-promotion" className="campaign-piece campaign-wild" />
        <EditorialPlaceholder label="SOCIAL CAMPAIGNS" folder="social-campaigns" className="campaign-piece campaign-social" />
        <EditorialPlaceholder label="MAGAZINE COVERS" folder="magazine-covers" className="campaign-piece campaign-magazine" />
      </div>
    </section>

    <footer className="present-day-ending"><i aria-hidden="true" /><h3>KATSEYE continues to grow.</h3><p>Every era begins with a new story.</p></footer>
  </section>;
}
