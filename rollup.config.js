import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const packageName = 'd3fc-webgl-as';

export default {
  input: 'index.js',
  output: {
    file: `build/${packageName}.js`,
    format: 'umd',
    name: 'fcWebglAS',
    sourcemap: true
  },
  plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: [
            ['@babel/preset-env']
        ]
      })
  ]
}
