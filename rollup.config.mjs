import tsPlugin from 'rollup-plugin-typescript2'
import terserPlugin from '@rollup/plugin-terser'
import runPlugin from '@rollup/plugin-run'

export default {
  input: 'src/main.ts',
  output: {
    file: 'build/index.mjs',
    format: 'es',
    compact: true
  },
  plugins: [tsPlugin(), terserPlugin(), runPlugin()]
}
