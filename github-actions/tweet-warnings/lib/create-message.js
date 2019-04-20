const tz = require('timezone/loaded')

module.exports = (level, areas) => {
  const now = new Date()
  const utc = new Date(now.toUTCString())
  const local = tz(utc, '%H:%M', 'Europe/Oslo')
  const list = areas.map(area => area.area).map(name => `#${name}`)
  return `${local}: Det er målt ${level} luftforurensning i ${list.join(', ')}. https://luftstatus.no `
}
