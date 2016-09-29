
import cleanup from 'rollup-plugin-cleanup';

export default {
  entry: 'index.js',
  format: 'cjs',
  dest: 'dist/sdk.js', // equivalent to --output
  plugins: [
      cleanup()
  ]
};