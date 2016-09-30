
import cleanup from 'rollup-plugin-cleanup';

export default {
  entry: 'index.js',
  plugins: [
      cleanup()
  ],
  targets: [
    { dest: 'dist/sdk.js', format: 'cjs' }
  ]
};