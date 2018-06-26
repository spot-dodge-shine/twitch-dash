const getColors = function(palette) {
  let bgArr, textArr
  let lightDiff = 0
  let darkDiff = 0
  if (palette.Vibrant) {
    if (palette.LightVibrant && palette.DarkVibrant) {
      lightDiff = lightDiff + Math.abs(palette.Vibrant.r - palette.LightVibrant.r)
      lightDiff = lightDiff + Math.abs(palette.Vibrant.g - palette.LightVibrant.g)
      lightDiff = lightDiff + Math.abs(palette.Vibrant.b - palette.LightVibrant.b)
      
      darkDiff = darkDiff + Math.abs(palette.Vibrant.r - palette.DarkVibrant.r)
      darkDiff = darkDiff + Math.abs(palette.Vibrant.g - palette.DarkVibrant.g)
      darkDiff = darkDiff + Math.abs(palette.Vibrant.b - palette.DarkVibrant.b)
  
      if (lightDiff > darkDiff) {
        bgArr = palette.LightVibrant._rgb,
        textArr = palette.Vibrant._rgb
      } else {
        bgArr = palette.DarkVibrant._rgb,
        textArr = palette.Vibrant._rgb
      }
    }
    else if (palette.LightVibrant) {
      bgArr = palette.LightVibrant._rgb,
      textArr = palette.Vibrant._rgb
    }
    else if (palette.DarkVibrant) {
      bgArr = palette.DarkVibrant._rgb,
      textArr = palette.Vibrant._rgb
    }
    else {
      bgArr = [255, 255, 255]
      textArr = [0, 0, 0]
    }
    
  } else if (palette.Muted) {
    if (palette.LightMuted && palette.DarkMuted) {
      lightDiff = lightDiff + Math.abs(palette.Muted.r - palette.LightMuted.r)
      lightDiff = lightDiff + Math.abs(palette.Muted.g - palette.LightMuted.g)
      lightDiff = lightDiff + Math.abs(palette.Muted.b - palette.LightMuted.b)
      
      darkDiff = darkDiff + Math.abs(palette.Muted.r - palette.DarkMuted.r)
      darkDiff = darkDiff + Math.abs(palette.Muted.g - palette.DarkMuted.g)
      darkDiff = darkDiff + Math.abs(palette.Muted.b - palette.DarkMuted.b)
  
      if (lightDiff > darkDiff) {
        bgArr = palette.LightMuted._rgb,
        textArr = palette.Muted._rgb
      } else {
        bgArr = palette.DarkMuted._rgb,
        textArr = palette.Muted._rgb
      }
    }
    else if (palette.LightMuted) {
      bgArr = palette.LightMuted._rgb,
      textArr = palette.Muted._rgb
    }
    else if (palette.DarkMuted) {
      bgArr = palette.DarkMuted._rgb,
      textArr = palette.Muted._rgb
    }
    else {
      bgArr = [255, 255, 255]
      textArr = [0, 0, 0]
    }
  } else {
    bgArr = [255, 255, 255]
    textArr = [0, 0, 0]
  }

  return { bgArr, textArr }
}

export default getColors