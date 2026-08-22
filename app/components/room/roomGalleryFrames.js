import { ROOM } from './roomConfig.js';

// Public image files are deliberately listed here by their slot rather than by
// visual guesswork. Each folder is the source of truth for that frame location.
const assets = Object.freeze({
  lara: Object.freeze({
    hero: '542745187_17945751069024648_8330918265717007794_n.jpg',
    'left-01': '67830f3aa02b79ecf24cd6054eb6f9fe.jpg', 'left-02': '2adcf92097e3f5947a9e7cec8d81d946.jpg', 'left-03': 'f03f3af3c1088189a034bddd78c88fc5.jpg', 'left-04': 'a look at Animal part 2JULY 23 9PM PT - JULY 24 12AM ET pre-save Animal now!!.jpg', 'left-05': '514007910_17936257704024648_1874328377856184626_n.jpg',
    'right-01': '8e17bfbd56876d3616f687471c067eb4.jpg', 'right-02': '670601260_17975273310024648_4711890579217604231_n.jpg', 'right-03': 'cd835512fd185187ea6210cc5be0a663 (1).jpg', 'right-04': '491453122_17930717160024648_7945775553013583058_n.jpg', 'right-05': '1c22530f8ecd890adcc8391a6c52d618.jpg',
  }),
  sophia: Object.freeze({
    hero: '753702084_17988718047024648_1185025879457896776_n.jpg',
    'left-01': '8f12cc3f64d775b87453a1628ca5931d.jpg', 'left-02': 'd8797f90468a9a023effe934caefacd9.jpg', 'left-03': 'a look at Animal part 2JULY 23 9PM PT - JULY 24 12AM ET pre-save Animal now!! (2).jpg', 'left-04': 'e8c96f097c8163a4e795fcdb45bfccd4.jpg',
    'right-01': 'download.png', 'right-02': '7610f1c856d0a1e21204909470d1e549.jpg', 'right-03': 'acd2b310880ae110513ab25f30e68238.jpg', 'right-04': 'b7042eb20c408c93b0618fcd89de3ede.jpg',
  }),
  daniela: Object.freeze({
    hero: '7a3c88e54e17e9fed58da9eec93ccd32.jpg',
    'left-01': '889d65a1768152d862c4631d477f6002.jpg', 'left-02': '21ac5fe942160f8c4d5927cef71e3058.jpg', 'left-03': '180caa4f86f5c262d434a94b14856e12.jpg', 'left-04': '696759134_17978764593024648_5520015552533417409_n.jpg',
    'right-01': '707248088_17980561224024648_5043278973768373876_n.jpg', 'right-02': '3aa87fca3474fbb01efd795d1231bc96.jpg', 'right-03': 'f061c9a21ab4275f52428a8ca6774220.jpg', 'right-04': 'a look at Animal part 2JULY 23 9PM PT - JULY 24 12AM ET pre-save Animal now!! (4).jpg',
  }),
  megan: Object.freeze({
    hero: '497000109_17930717181024648_1415759582627383244_n.jpg',
    'left-01': '752881024_17988718038024648_7288006572606028120_n.jpg', 'left-02': '1ba9b500721fcbade06f12d423cd22f9.jpg', 'left-03': '684053548_17977083960024648_8194457196050022724_n.jpg', 'left-04': 'a look at Animal part 3song and official video out now everywhere!! (5).jpg',
    'right-01': 'dc60f914f79eb2432cf62d7248210abc.jpg', 'right-02': 'aba5569b51ed0eb787d5b418cdbf3547.jpg', 'right-03': '662323058_17971491687024648_905259162069793778_n.jpg', 'right-04': '670850239_17975273361024648_7321598015360269104_n.jpg',
  }),
  manon: Object.freeze({
    hero: '886a91ccd89231a4b977292db27fd55f.jpg',
    'left-01': '84a0ddd5658e3ee9b9a674e578a317f4.jpg', 'left-02': '470223216_17913629079024648_5596633431528565328_n.jpg', 'left-03': '625340518_17962468164024648_1964249954734894980_n.jpg', 'left-04': '544090896_17945751024024648_3572007747229871575_n.jpg',
    'right-01': '521601820_17939551122024648_6311009656446719957_n.jpg', 'right-02': '508881831_17935018056024648_2328949221892444100_n.jpg', 'right-03': '514045025_17936257728024648_598538021290259823_n.jpg', 'right-04': '470193892_17913628269024648_3346344311978379161_n.jpg', 'right-05': '495869797_17930717199024648_5663672721141116701_n.jpg',
  }),
  yoonchae: Object.freeze({
    hero: 'eb7f223ac900438dc3c5c1eb72cab015.jpg',
    'left-01': '722205059_17982661437024648_1946546801119816251_n.jpg', 'left-02': 'f055caea1983a415fcad8152bd57d427.jpg', 'left-03': 'd7c57677401b093ac26a6c43fe2c8383.jpg', 'left-04': 'dd90116be9b124cb820df331e5b58ed3.jpg', 'left-05': 'cc1106588fcc60c123cae22f927ca145.jpg',
    'right-01': '8492578257bf4734943cba07c9c3981d.jpg', 'right-02': '5c5d36c70e82bcd4c3aee172a15fb5db.jpg', 'right-03': '1813ad73a8f51137d295cc8c69c49d75.jpg', 'right-04': '671077993_17975273328024648_5704916116768383428_n.jpg', 'right-05': '72406069aa30baa35ca6d1a76f566e56.jpg',
  }),
});

const leftSlots = Object.freeze([
  { id: 'left-01', position: [-3.04, 2.88, 2.72], maxWidth: 1.64, maxHeight: 2.12 },
  { id: 'left-02', position: [-3.04, 2.84, .1], maxWidth: 1.48, maxHeight: 1.94 },
  { id: 'left-03', position: [-3.04, 2.38, -2.62], maxWidth: 1.18, maxHeight: 1.52 },
  { id: 'left-04', position: [-3.04, 2.42, -5.42], maxWidth: 1.18, maxHeight: 1.52 },
  { id: 'left-05', position: [-3.04, 2.2, 8.0], maxWidth: .92, maxHeight: 1.12 },
]);
const rightSlots = Object.freeze([
  { id: 'right-01', position: [3.04, 2.86, 5.48], maxWidth: 1.6, maxHeight: 2.08 },
  { id: 'right-02', position: [3.04, 2.84, 2.72], maxWidth: 1.48, maxHeight: 1.94 },
  { id: 'right-03', position: [3.04, 2.38, .1], maxWidth: 1.18, maxHeight: 1.52 },
  { id: 'right-04', position: [3.04, 2.42, -2.62], maxWidth: 1.18, maxHeight: 1.52 },
  { id: 'right-05', position: [3.04, 1.38, -5.42], maxWidth: .92, maxHeight: 1.12 },
]);

function styleFor(slot) {
  if (slot === 'hero') return { borderThickness: .16, depth: .11 };
  if (slot.endsWith('02') || slot.endsWith('04')) return { borderThickness: .055, depth: .045 };
  return { borderThickness: .095, depth: .07 };
}

export function getRoomGalleryFrames(member) {
  const memberAssets = assets[member];
  if (!memberAssets) return [];
  const frames = [{
    id: `${member}-hero`, src: `/room-assets/${member}/hero/${memberAssets.hero}`,
    // A single centred exhibition field owns the rear wall. The lower stage is
    // kept below the art's clear aperture, so the portrait reads first from
    // the entrance rather than appearing suspended in the ceiling zone.
    position: [0, 2.5, ROOM.backWallZ + .38], rotation: [0, 0, 0], maxWidth: 3.3, maxHeight: 2.45, frameStyle: styleFor('hero'), priority: 0,
  }];
  const addSide = (slots, side) => slots.forEach((slot) => {
    if (!memberAssets[slot.id]) return;
    frames.push({
      id: `${member}-${slot.id}`, src: `/room-assets/${member}/${slot.id}/${memberAssets[slot.id]}`,
      position: slot.position, rotation: [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0], maxWidth: slot.maxWidth, maxHeight: slot.maxHeight,
      frameStyle: styleFor(slot.id), priority: slot.id.endsWith('01') ? 1 : 2,
    });
  });
  addSide(leftSlots, -1);
  addSide(rightSlots, 1);
  return frames;
}
