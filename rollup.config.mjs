import filesize from 'rollup-plugin-filesize'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/fancy-holder.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/fancy-holder.esm.min.js',
        format: 'esm',
        plugins: [terser()]
      }
    ],
    plugins: [
      typescript(),
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**'],
        exclude: ['node_modules/**']
      }),
      resolve(),
      commonjs(),
      filesize(),
      babel({ babelHelpers: 'runtime', exclude: ['node_modules/**'] })
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'fancy-holder',
        file: 'dist/fancy-holder.umd.js',
        format: 'umd'
      },
      {
        name: 'fancy-holder',
        file: 'dist/fancy-holder.umd.min.js',
        format: 'umd',
        plugins: [terser()]
      }
    ],
    plugins: [
      typescript(),
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**'],
        exclude: ['node_modules/**']
      }),
      resolve(),
      commonjs(),
      filesize(),
      babel({ babelHelpers: 'runtime', exclude: ['node_modules/**'] })
    ]
  }
]
