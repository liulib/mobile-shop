module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 320,
      viewportHeight: 640,
      unitPrecision: 3,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}
