const buildPreset = require('babel-preset-es2015').buildPreset


module.exports = {
  presets: [
    [ buildPreset, {
      loose: true,
      modules: 'commonjs'
    } ]
  ]
}
