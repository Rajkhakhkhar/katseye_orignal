import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';

const input = 'public/katseye-lightstick-source.glb';
const output = 'public/katseye-lightstick.glb';
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies(KHRONOS_EXTENSIONS);
const document = await io.read(input);
const materials = document.getRoot().listMaterials();

// Geometry, UVs, hierarchy, transforms, and pivots are deliberately preserved.
// Existing branding textures are detached so their original logos and colours cannot remain visible.
materials.forEach((material, index) => {
  const name = material.getName().toLowerCase();
  const isGlass = /glass|clear|dome|transparent|crystal|screen/.test(name);
  const isMetal = /metal|chrome|silver|ring|rim|steel|black/.test(name);
  const isLed = /led|light|bulb|emissive|glow/.test(name);
  const isStar = /star/.test(name);

  material.setBaseColorTexture(null).setNormalTexture(null).setOcclusionTexture(null).setEmissiveTexture(null);
  material.setName(isGlass ? 'Katseye Crystal Dome' : isLed ? 'Katseye Lavender Core' : isStar ? 'Katseye Pearl Star' : isMetal ? 'Katseye Brushed Silver' : `Katseye Pearl White ${index + 1}`);
  material.setAlphaMode(isGlass ? 'BLEND' : 'OPAQUE');
  material.setDoubleSided(isGlass);

  if (isGlass) {
    material.setBaseColorFactor([0.94, 0.91, 1, 0.22]);
    material.setMetallicFactor(0.02).setRoughnessFactor(0.035);
    // Standard alpha-blend PBR keeps this portable for the web loader; the live R3F scene upgrades it to physical transmission.
    material.setEmissiveFactor([0.035, 0.025, 0.08]);
  } else if (isLed) {
    material.setBaseColorFactor([0.92, 0.88, 1, 1]);
    material.setMetallicFactor(0.08).setRoughnessFactor(0.23);
    material.setEmissiveFactor([0.55, 0.35, 1]);
  } else if (isStar) {
    material.setBaseColorFactor([0.94, 0.92, 1, 1]);
    material.setMetallicFactor(0.54).setRoughnessFactor(0.22);
    material.setEmissiveFactor([0.17, 0.1, 0.32]);
  } else if (isMetal) {
    material.setBaseColorFactor([0.68, 0.7, 0.74, 1]);
    material.setMetallicFactor(0.92).setRoughnessFactor(0.3);
    material.setEmissiveFactor([0, 0, 0]);
  } else {
    material.setBaseColorFactor([0.93, 0.92, 0.96, 1]);
    material.setMetallicFactor(0.16).setRoughnessFactor(0.27);
    material.setEmissiveFactor([0.015, 0.01, 0.03]);
  }
});

// Do not weld, prune, reorder, or otherwise optimize geometry here: the source topology,
// UVs, mesh structure, pivots, and scale must remain exactly intact.
await io.write(output, document);
console.log(`Wrote ${output}`);
