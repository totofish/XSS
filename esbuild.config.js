#!/usr/bin/env node

const { sassPlugin } = require('esbuild-sass-plugin')
const cssModulesPlugin = require("esbuild-css-modules-plugin")
// const babel = require('esbuild-plugin-babel')

const target = ['esnext']

require('esbuild').build({
  entryPoints: ['src/extension/GUI.tsx'],
  bundle: true,
  outfile: 'dist/GUI.js',
  minify: true,
  plugins: [
    // babel(),
    sassPlugin(),
    cssModulesPlugin(),
  ],
  target,
}).catch(() => process.exit(1))

require('esbuild').build({
  entryPoints: ['src/extension/content.ts'],
  bundle: true,
  outfile: 'dist/content.js',
  minify: true,
  plugins: [
    // babel(),
    sassPlugin(),
    cssModulesPlugin(),
  ],
  target,
}).catch(() => process.exit(1))

require('esbuild').build({
  entryPoints: ['src/extension/background.ts'],
  bundle: true,
  outfile: 'dist/background.js',
  minify: true,
  plugins: [
    // babel(),
    sassPlugin(),
    cssModulesPlugin(),
  ],
  target,
}).catch(() => process.exit(1))

require('esbuild').build({
  entryPoints: ['src/extension/options.ts'],
  bundle: true,
  outfile: 'dist/options.js',
  minify: true,
  plugins: [
    // babel(),
    sassPlugin(),
    cssModulesPlugin(),
  ],
  target,
}).catch(() => process.exit(1))
// .catch((e) => console.error(e.message))
