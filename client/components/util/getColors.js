
const getColors = function(palette) {
  let bgArr, textArr
  let colorObj = {}
  let maxPop = 0

  if (palette.Vibrant) {
    colorObj = populateObj(colorObj, 'Vibrant', palette)
  }
  if (palette.LightVibrant) {
    colorObj = populateObj(colorObj, 'LightVibrant', palette)
  }
  if (palette.DarkVibrant) {
    colorObj = populateObj(colorObj, 'DarkVibrant', palette)
  }
  if (palette.Muted) {
    colorObj = populateObj(colorObj, 'Muted', palette)
  }
  if (palette.LightMuted) {
    colorObj = populateObj(colorObj, 'LightMuted', palette)
  }
  if (palette.DarkMuted) {
    colorObj = populateObj(colorObj, 'DarkMuted', palette)
  }

  if (!Object.keys(colorObj).length) {
    bgArr = [255, 255, 255]
  }

  Object.keys(colorObj).forEach(color => {
    if (colorObj[color].pop > maxPop) {
      maxPop = colorObj[color].pop
      bgArr = colorObj[color].arr
    }
  })

  return {bgArr}

}

function populateObj(diffObj, color, palette) {

  diffObj[color] = {}
  diffObj[color].pop = palette[color]._population
  diffObj[color].arr = palette[color]._rgb
  return diffObj
}

export default getColors
