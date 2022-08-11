import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// import typescript from 'typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';

import pkg from './package.json';

const extensions = ['.ts'];
const resolve = (...args) => path.resolve(...args);

const paths = {
  input: path.join(__dirname, '/src/index.ts'),
  output: path.join(__dirname, '/lib'),
}

const config = [
  {
    input: paths.input,
    output: [
      {
        file: path.join(paths.output, 'index.js'),
        format: 'umd',
        name: 'atools',
        sourcemap: true,
      },
      {
        file: path.join(paths.output, 'index.min.js'),
        format: 'umd',
        name: 'atools',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: path.join(paths.output, 'index.mjs'),
        format: 'esm',
        name: 'atools',
        sourcemap: true
      },
      {
        file: path.join(paths.output, 'index.min.mjs'),
        format: 'esm',
        name: 'atools',
        sourcemap: true,
        plugins: [terser()],
      }
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({
        extensions,
      }),
      // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
      commonjs(),
      // ts 的功能只在于编译出声明文件，所以 target 为 ESNext，编译交给 babel 来做
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: [...DEFAULT_EXTENSIONS, '.ts'],
        exclude: 'node_modules/**'
      }),
    ],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: path.join(__dirname, '/src/index.ts'),
    output: {
      file: resolve('./', pkg.types),
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default config;
