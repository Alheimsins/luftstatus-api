(async () => {
  const { writeFile } = require('fs').promises
  const getData = require('./lib/get-data')
  const transformData = require('./lib/transform-data')
  const generateWarnings = require('./lib/generate-warnings')
  const logger = require('./lib/logger')
  const url = 'https://api.nilu.no/aq/utd'
  logger('info', ['looking up', url])
  const original = await getData(url)
  logger('info', ['got original data', original.length])
  await writeFile('data/original.json', JSON.stringify(original, null, 2), 'utf-8')
  logger('info', ['original data saved'])
  const transformed = transformData(original)
  logger('info', ['data transformed'])
  const areas = { updated: transformed.updated, areas: transformed.repackedAreas }
  const warnings = generateWarnings(areas)
  await Promise.all([
    writeFile('data/data.json', JSON.stringify(transformed, null, 2), 'utf-8'),
    writeFile('data/stations.json', JSON.stringify({ updated: transformed.updated, stations: transformed.stations }, null, 2), 'utf-8'),
    writeFile('data/areas.json', JSON.stringify(areas, null, 2), 'utf-8'),
    writeFile('data/warnings.json', JSON.stringify(warnings, null, 2), 'utf-8')
  ])
  logger('info', ['transformed data saved'])
})()
