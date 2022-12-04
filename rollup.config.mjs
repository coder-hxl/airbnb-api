import tsPlugin from 'rollup-plugin-typescript2'
import terserPlugin from '@rollup/plugin-terser'
import runPlugin from '@rollup/plugin-run'

export default {
  input: 'src/main.ts',
  output: {
    dir: 'build',
    format: 'cjs',
    compact: true,
    preserveModules: true
  },
  external: ['koa', 'dotenv'],
  plugins: [tsPlugin(), terserPlugin(), runPlugin()]
}
