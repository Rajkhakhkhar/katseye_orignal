export const ROOM = {
  width: 8,
  height: 5,
  length: 22,
  entranceZ: 9,
  backWallZ: -10,
  cameraHeight: 1.6,
};

// These rectangles are literal openings in the two Lara side-wall meshes.
// ExhibitionWalls uses the same positions for the physical cavity interiors.
export const LARA_NICHE_LAYOUT = Object.freeze({
  left: Object.freeze([
    // Reference wall: one large front showcase, then two smaller, widely spaced recesses.
    Object.freeze({ id: 'front-gallery', y: 2.62, z: 5.45, width: 2.7, height: 3.85, shelves: 3, glazed: true }),
    Object.freeze({ id: 'upper-plaque', y: 3.4, z: 1.65, width: 1.7, height: 1.2, shelves: 1, glazed: true }),
    Object.freeze({ id: 'lower-accessory', y: 2.18, z: -1.45, width: 1.2, height: 2.35, shelves: 3, glazed: true }),
  ]),
  right: Object.freeze([
    // The opposite wall mirrors the rhythm, not the exact module sizes.
    Object.freeze({ id: 'front-collection', y: 2.58, z: 5.35, width: 2.85, height: 3.95, shelves: 3, glazed: true }),
    Object.freeze({ id: 'slim-vertical', y: 2.45, z: 1.95, width: .95, height: 2.65, shelves: 3, glazed: true }),
    Object.freeze({ id: 'mid-gallery', y: 2.45, z: -1.35, width: 1.55, height: 2.75, shelves: 2, glazed: true }),
  ]),
});
