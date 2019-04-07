import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

export default [{
  input: 'src/carlo-plate.js',
  output: {
    file: 'carlo-plate.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    terser()
  ]
}, {
  input: ['src/www/index.js', 'src/www/animations/syncing-animation.js'],
  output: {
    dir: './www',
    format: 'es'
  },
  plugins: [
    cjs(),
    resolve(),
    terser()
  ]
}]
