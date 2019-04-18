const isVeryHigh = area => area.color === '990099'
const isHigh = area => area.color === 'ff0000'

module.exports = data => {
  const warnings = {
    veryHigh: data.areas.filter(isVeryHigh),
    high: data.areas.filter(isHigh)
  }
  let results = []
  if (warnings.veryHigh.length > 0 || warnings.high.length > 0) {
    results = warnings
  }
  return results
}
