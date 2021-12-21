/* eslint-disable @typescript-eslint/quotes */
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from "rollup-plugin-postcss";
// import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser';

const config = {
  input: {
    GUI: 'src/extension/GUI.tsx',
    content: 'src/extension/content.ts',
    background: 'src/extension/background.ts',
    options: 'src/extension/options.ts',
  }, // 進入點
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: true,
    }),
    typescript(),
    commonjs(),
    postcss({
      // extract: true,
      minimize: true,
      extract: path.resolve('dist/extension/GUI.css'),
    }),
    terser(),
    // visualizer({
    //   filename: 'bundle-analysis.html',
    //   open: true,
    // }),
  ], // 插件
  external: [], // 外部插件
  // onwarn(warning, warn) { // 自定義警告
  //   // do something...
  // },
  treeshake: true, // 刪除沒用到的程式碼
  output: { // 輸出檔案
    // name: 'bundle', // 全域名稱
    dir: 'dist',
    // file: 'dist/content.js', // 輸出檔案
    entryFileNames: 'extension/[name].js',
    assetFileNames: 'extension/[name].[ext]',
    format: 'module', // module | iife 輸出格式
    sourcemap: false, // 是否產生 sourcemap
  },
};

export default config;
