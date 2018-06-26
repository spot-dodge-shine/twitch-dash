
const getColors = function(palette) {
  let bgArr, textArr
  let diffObj = {}
  let maxDiff = 0
  if (palette.Vibrant) {
    textArr = palette.Vibrant._rgb
    if (palette.LightVibrant) {
      diffObj = populateObj(diffObj, 'LightVibrant', 'Vibrant', palette)
    }
    if (palette.DarkVibrant) {
      diffObj = populateObj(diffObj, 'DarkVibrant', 'Vibrant', palette)
    }
    if (palette.Muted) {
      diffObj = populateObj(diffObj, 'Muted', 'Vibrant', palette)
    }
    if (palette.LightMuted) {
      diffObj = populateObj(diffObj, 'LightMuted', 'Vibrant', palette)
    }
    if (palette.DarkMuted) {
      diffObj = populateObj(diffObj, 'DarkMuted', 'Vibrant', palette)
    }

    Object.keys(diffObj).forEach(color => {
      if (diffObj[color].diff > maxDiff) {
        maxDiff = diffObj[color].diff
        bgArr = diffObj[color].arr
      }
    })

  }
  else if (palette.Muted) {
    textArr = palette.Muted._rgb
    if (palette.LightVibrant) {
      diffObj = populateObj(diffObj, 'LightVibrant', 'Muted', palette)
    }
    if (palette.DarkVibrant) {
      diffObj = populateObj(diffObj, 'DarkVibrant', 'Muted', palette)
    }
    if (palette.LightMuted) {
      diffObj = populateObj(diffObj, 'Muted', 'Muted', palette)
    }
    if (palette.DarkMuted) {
      diffObj = populateObj(diffObj, 'DarkMuted', 'Muted', palette)
    }

    Object.keys(diffObj).forEach(color => {
      if (diffObj[color].diff > maxDiff) {
        maxDiff = diffObj[color].diff
        bgArr = diffObj[color].arr
      }
    })
  }
  else {
    bgArr = [255, 255, 255]
    textArr = [0, 0, 0]
  }

  return {bgArr, textArr}

}

function populateObj(diffObj, color, compColor, palette) {
  if (palette[color]) {
    diffObj[color] = {}
    diffObj[color].diff = 0
    diffObj[color].arr = palette[color]._rgb

    diffObj[color].diff = diffObj[color].diff + Math.abs(palette[compColor].r - palette[color].r)
    diffObj[color].diff = diffObj[color].diff + Math.abs(palette[compColor].g - palette[color].g)
    diffObj[color].diff = diffObj[color].diff + Math.abs(palette[compColor].b - palette[color].b)
  }
  return diffObj
}

export default getColors
