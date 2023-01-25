// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

const mainPath = path.join(webpackPaths.distMainPath, 'main.js');
function getRendererPath(name: string) {
  return path.join(webpackPaths.distRendererPath, '${name}.renderer.js');
}
const window1RendererPath = getRendererPath('window1');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "npm run build:main"'
    )
  );
}

if (!fs.existsSync(window1RendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The window1 renderer process is not built yet. Build it by running "npm run build:renderer"'
    )
  );
}

