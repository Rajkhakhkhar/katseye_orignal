import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function assetFolderPlugin(assetDirectory) {
  const virtualId = `virtual:${assetDirectory}`;
  const resolvedVirtualId = `\0${virtualId}`;
  let assetsRoot = '';

  const createAssetModule = () => {
    if (!existsSync(assetsRoot)) return 'export default {};';

    const assets = {};
    for (const entry of readdirSync(assetsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;

      const folder = join(assetsRoot, entry.name);
      const images = readdirSync(folder, { withFileTypes: true })
        .filter((file) => file.isFile() && IMAGE_EXTENSIONS.has(file.name.slice(file.name.lastIndexOf('.')).toLowerCase()))
        .map((file) => file.name)
        .sort();

      if (images.length > 1) {
        console.warn(`[memory-assets] "${entry.name}" has more than one image. Using "${images[0]}".`);
      }

      if (images[0]) {
        const file = join(folder, images[0]);
        assets[entry.name] = `/${assetDirectory}/${entry.name}/${images[0]}?v=${statSync(file).mtimeMs}`;
      }
    }

    return `export default ${JSON.stringify(assets)};`;
  };

  return {
    name: `${assetDirectory}-assets`,
    configResolved(config) {
      assetsRoot = join(config.publicDir, assetDirectory);
    },
    resolveId(id) {
      return id === virtualId ? resolvedVirtualId : null;
    },
    load(id) {
      return id === resolvedVirtualId ? createAssetModule() : null;
    },
    configureServer(server) {
      server.watcher.add(assetsRoot);
      server.watcher.on('all', (_event, file) => {
        if (relative(assetsRoot, file).startsWith('..')) return;
        const module = server.moduleGraph.getModuleById(resolvedVirtualId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), assetFolderPlugin('memory-assets'), assetFolderPlugin('professional-assets')],
});
