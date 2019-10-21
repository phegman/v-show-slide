import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    name: 'VShowSlide',
    exports: 'named',
  },
  plugins: [resolve(), commonjs(), typescript({ clean: true }), terser()],
}
