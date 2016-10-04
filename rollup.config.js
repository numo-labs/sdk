
import cleanup from 'rollup-plugin-cleanup';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'index.js',
  plugins: [
      cleanup(),
      uglify()
  ],
  targets: [
    { dest: 'dist/sdk.js', format: 'cjs' }
  ]
};