import { useEffect, useRef, useState } from 'react';
import './JourneySection.css';
import './JourneyMedia.css';
import './JourneyPolish.css';
import './JourneyArchiveTransition.css';
import './JourneyLayoutFix.css';
import memoryAssets from 'virtual:memory-assets';

const groups = [
  { year: '2023', milestones: [
    ['Dream Academy begins', 'Dream Academy', ['20 contestants compete for six debut positions.', 'A global girl group starts to take shape.']],
    ['Final Live', 'Final Live', ['The final stage brings every possibility into focus.', 'One announcement changes everything.']],
    ['Reveal all six members', 'Final Selection', ['Six individual stories become one shared future.', 'KATSEYE is formed.'], 'members'],
  ] },
  { year: '2024', milestones: [
    ['Debut', 'Debut', ['The beginning of KATSEYE.', 'A new global group steps into the world.']],
    ['Touch', 'Touch', ['A viral dance moment travels worldwide.', 'KATSEYE finds its first shared rhythm.']],
    ['SIS EP', 'SIS', ['The first EP opens a new chapter.', 'A softer side of KATSEYE takes shape.']],
    ['Billboard 200', 'Billboard 200', ['KATSEYE makes its Billboard 200 debut.', 'A first major chart milestone arrives.']],
    ['Asian Tour', 'Asian Tour', ['The journey meets fans across Asia.', 'The live story begins to expand.']],
    ['Megan Injury', 'Megan Injury', ['An unexpected pause tests the group.', 'The story keeps moving together.']],
    ['Flame Collaboration', 'Flame Collaboration', ['A new collaboration carries the momentum forward.', 'Another page turns.']],
  ] },
  { year: '2025', milestones: [
    ['Wango Tango', 'Wango Tango', ['A major stage marks the next step.', 'The audience gets bigger.']],
    ['Gnarly', 'Gnarly', ['A new sound starts a new conversation.', 'KATSEYE pushes forward.']],
    ['Gnarly Remix', 'Gnarly Remix', ['The moment returns in a different form.', 'The energy keeps building.']],
    ['Gabriela', 'Gabriela', ['A performance-led release arrives.', 'The next visual chapter begins.']],
    ['Beautiful Chaos EP', 'Beautiful Chaos', ['The second EP expands their world.', 'The story grows bolder.']],
    ['Billboard Top 10', 'Billboard Top 10', ['Beautiful Chaos reaches the Billboard Top 10.', 'A new level of recognition follows.']],
    ['Lollapalooza Chicago', 'Lollapalooza Chicago', ['One of KATSEYE’s biggest festival performances.', 'The live story reaches Chicago.']],
    ['Beautiful Chaos Tour', 'Beautiful Chaos Tour', ['Their first headlining North American tour.', 'The world becomes their stage.']],
    ['Sold Out Shows', 'Sold Out Shows', ['More dates sell out as the tour grows.', 'The connection gets louder.']],
    ['Grammy Nominations', 'Grammy Nominations', ['A major recognition milestone arrives.', 'The story enters a new room.']],
  ] },
  { year: '2026', milestones: [
    ['Internet Girl', 'Internet Girl', ['A new era begins with a new point of view.', 'The next evolution is here.']],
    ['Manon Hiatus', 'Manon Hiatus', ['The group moves through another pause together.', 'The journey holds space for every chapter.']],
    ['Lollapalooza Argentina', 'Lollapalooza Argentina', ['A huge South American audience joins the story.', 'The Wild era moves forward.']],
    ['Lollapalooza Chile', 'Lollapalooza Chile', ['The journey continues across Chile.', 'Another crowd becomes part of the archive.']],
    ['Lollapalooza Brazil', 'Lollapalooza Brazil', ['Another major festival crowd enters the story.', 'The momentum keeps travelling.']],
    ['Coachella', 'Coachella', ['KATSEYE reaches one of music’s biggest stages.', 'A landmark performance moment.']],
    ['Pinky Up', 'Pinky Up', ['A live performance moment becomes essential.', 'The group’s energy lands in real time.']],
    ['3 American Music Awards', 'American Music Awards', ['Three wins. One unforgettable night.', 'KATSEYE takes the stage again.']],
    ['Iconic by Mistake', 'Iconic by Mistake', ['A new cultural moment takes hold.', 'The conversation keeps growing.']],
    ['Wild Hearts Documentary', 'Wild Hearts Documentary', ['The story comes closer than ever before.', 'The archive opens up.']],
    ['Sophia Hiatus', 'Sophia Hiatus', ['Another chapter asks the group to adapt.', 'The story remains shared.']],
    ['Wild EP', 'Wild', ['The Wild era takes its complete form.', 'A new identity is fully revealed.']],
    ['WILDWORLD Tour', 'WILDWORLD Tour', ['A new tour brings the era to life.', 'The world keeps opening.']],
    ['Sold Out within 48 Hours', 'Sold Out', ['The first wave of dates sells out within 48 hours.', 'The next chapter is already calling.']],
  ] },
];

const memoryAssetFolders = {
  'Dream Academy begins': 'dream-academy',
  'Final Live': 'final-lineup',
  'Reveal all six members': 'katseye-formed',
  'Debut': 'debut',
  'Touch': 'touch',
  'SIS EP': 'sis',
  'Billboard 200': 'billboard-200',
  'Asian Tour': 'asian-tour',
  'Megan Injury': 'megan-injury',
  'Flame Collaboration': 'flame',
  'Wango Tango': 'wango-tango',
  'Gnarly': 'gnarly',
  'Gnarly Remix': 'gnarly-remix',
  'Gabriela': 'gabriela',
  'Beautiful Chaos EP': 'beautiful-chaos',
  'Billboard Top 10': 'billboard-top-10',
  'Lollapalooza Chicago': 'lollapalooza-chicago',
  'Beautiful Chaos Tour': 'beautiful-chaos-tour',
  'Sold Out Shows': 'sold-out-shows',
  'Grammy Nominations': 'grammy-nominations',
  'Internet Girl': 'internet-girl',
  'Manon Hiatus': 'manon-hiatus',
  'Lollapalooza Argentina': 'lollapalooza-argentina',
  'Lollapalooza Chile': 'lollapalooza-chile',
  'Lollapalooza Brazil': 'lollapalooza-brazil',
  'Coachella': 'coachella',
  'Pinky Up': 'pinky-up',
  '3 American Music Awards': 'american-music-awards',
  'Iconic by Mistake': 'iconic-by-mistake',
  'Wild Hearts Documentary': 'wild-hearts',
  'Sophia Hiatus': 'sophia-hiatus',
  'Wild EP': 'wild-ep',
  'WILDWORLD Tour': 'wildworld-tour',
  'Sold Out within 48 Hours': 'sold-out-shows',
};

const milestones = groups.flatMap((group) => group.milestones.map(([title, image, lines, type]) => ({
  year: group.year,
  title,
  image,
  lines,
  type,
  assetFolder: memoryAssetFolders[title],
})));
const members = ['Sophia', 'Lara', 'Yoonchae', 'Megan', 'Daniela', 'Manon'];
const mediaPresentation = {
  'Grammy Nominations': { className: 'is-rotated-media' },
};

const resolveMemoryAsset = (folder) => memoryAssets[folder] || (folder === 'manon-hiatus' ? memoryAssets['manon-haitus'] : undefined);

function TypedText({ text, active, speed = 11 }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (!active) return undefined;
    let index = 0;
    setValue('');
    const timer = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [active, text, speed]);
  return <>{value}{active && value !== text && <i className="journey-v3-cursor" aria-hidden="true" />}</>;
}

function JourneyMedia({ milestone, src }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) return <img src={src} alt={`${milestone.title} memory`} onError={() => setFailed(true)} />;
  return <div className="journey-v3-placeholder"><strong>{milestone.image}</strong><span>Image Coming Soon</span></div>;
}

export default function JourneySection() {
  const sectionRef = useRef();
  const [visibleCards, setVisibleCards] = useState(() => new Set());
  const [archiveEntered, setArchiveEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setArchiveEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setArchiveEntered(true);
      observer.disconnect();
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    milestones.forEach((milestone) => {
      const src = milestone.assetFolder && resolveMemoryAsset(milestone.assetFolder);
      if (src) {
        console.info(`[Memory Journey] ${milestone.title}\n${src}`);
      } else {
        console.warn(`❌ Missing image:\npublic/memory-assets/${milestone.assetFolder || 'unmapped'}`);
      }
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let frame = 0;
    const updatePath = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
      section.style.setProperty('--journey-progress', progress.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updatePath); };
    updatePath();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-journey-card]');
    if (!cards || !('IntersectionObserver' in window)) {
      setVisibleCards(new Set(milestones.map((_, index) => index)));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting).map((entry) => Number(entry.target.dataset.journeyCard));
      if (entering.length) setVisibleCards((current) => new Set([...current, ...entering]));
    }, { threshold: .2 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <section className={`journey-v3 ${archiveEntered ? 'is-archive-entered' : ''}`} id="journey" ref={sectionRef} aria-labelledby="journey-v3-title">
    <header className="journey-v3-intro"><p className="journey-v3-eyebrow">02 / MEMORY</p><h2 className="journey-v3-title" id="journey-v3-title">Our Journey</h2><h3 className="journey-v3-subtitle">The Story of KATSEYE</h3><span className="journey-v3-summary">From Dream Academy...<br />to becoming one of the world’s fastest rising global girl groups.</span></header>
    <div className="journey-v3-flow" style={{ maxWidth: '1900px' }}>
      <svg className="journey-v3-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="journey-v3-path-base" d="M50 0 C50 5 44 8 50 12 S56 19 50 24 S44 31 50 36 S56 43 50 48 S44 55 50 60 S56 67 50 72 S44 79 50 84 S56 91 50 100" pathLength="1" /><path className="journey-v3-path-progress" d="M50 0 C50 5 44 8 50 12 S56 19 50 24 S44 31 50 36 S56 43 50 48 S44 55 50 60 S56 67 50 72 S44 79 50 84 S56 91 50 100" pathLength="1" /></svg>
      {milestones.map((milestone, index) => {
        const previous = milestones[index - 1];
        const side = index % 2 ? 'right' : 'left';
        const active = visibleCards.has(index);
        const memoryAsset = milestone.assetFolder && resolveMemoryAsset(milestone.assetFolder);
        const presentation = mediaPresentation[milestone.title];
        return <div key={milestone.title}>
          {(!previous || previous.year !== milestone.year) && <div className="journey-v3-year"><span>{milestone.year}</span></div>}
          <article className={`journey-v3-row journey-v3-row-${side}`}>
            <i className={`journey-v3-node ${active ? 'is-active' : ''}`} style={{ '--node-entry-delay': `${Math.min(index, 5) * 150}ms` }} aria-hidden="true" />
            <div className={`journey-v3-card ${active ? 'is-visible' : ''} ${index === 0 ? 'is-first-card' : ''}`} data-journey-card={index}>
              <div className={`journey-v3-image ${memoryAsset ? 'has-image' : ''} ${presentation?.className || ''}`}><JourneyMedia milestone={milestone} src={memoryAsset} /></div>
              <div className="journey-v3-copy"><p>{milestone.year}</p><h4><TypedText text={milestone.title} active={active} speed={16} /></h4>{milestone.lines.map((line) => <div key={line}><TypedText text={line} active={active} speed={8} /></div>)}</div>
              {milestone.type === 'members' && <div className={`journey-v3-members ${active ? 'is-visible' : ''}`}>{members.map((member, memberIndex) => <span key={member} style={{ '--member-delay': `${memberIndex * .7}s` }}>✓ {member}</span>)}<strong>KATSEYE IS FORMED</strong></div>}
            </div>
          </article>
        </div>;
      })}
    </div>
    <footer className="journey-v3-ending"><i aria-hidden="true" /><h3>The Story Continues...</h3><p>Every ending is the beginning of another chapter.</p></footer>
  </section>;
}
