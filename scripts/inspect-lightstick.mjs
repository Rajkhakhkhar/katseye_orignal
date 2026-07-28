import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();
const document = await io.read(process.argv[2] || 'public/katseye-lightstick-source.glb');

console.log('Meshes');
for (const mesh of document.getRoot().listMeshes()) {
  console.log(mesh.getName(), mesh.listPrimitives().map((primitive) => ({ material: primitive.getMaterial()?.getName(), mode: primitive.getMode(), attributes: Object.keys(primitive.listAttributes()) })));
}
console.log('Materials');
for (const material of document.getRoot().listMaterials()) {
  console.log(material.getName(), material.getBaseColorFactor(), material.getMetallicFactor(), material.getRoughnessFactor(), Boolean(material.getBaseColorTexture()), Boolean(material.getEmissiveTexture()));
}
