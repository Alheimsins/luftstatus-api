const returnHighestColor = list => {
  let color = 'ffffff'
  if (list.includes('990099')) {
    color = '990099'
  } else if (list.includes('ff0000')) {
    color = 'ff0000'
  } else if (list.includes('ff9900')) {
    color = 'ff9900'
  } else if (list.includes('6ee86e')) {
    color = '6ee86e'
  }
  return color
}

const replaceLetters = data => {
  data = data.replace(' ', '')
  data = data.replace('/', '-')
  data = data.replace('æ', 'oe')
  data = data.replace('å', 'aa')
  data = data.replace('ø', 'oe')
  return data
}

function municipalitySort (a, b) {
  let num = 0
  if (a.municipality < b.municipality) {
    num = -1
  }
  if (a.municipality > b.municipality) {
    num = 1
  }
  return num
}

const generateIdFromFields = (...args) => args.map(data => data.toString().toLowerCase()).map(replaceLetters).join('-')

const byStation = data => {
  return data.reduce((prev, current) => {
    const eoi = current.eoi || generateIdFromFields(current.area, current.zone, current.municipality)
    if (!Object.prototype.hasOwnProperty.call(prev, eoi)) {
      prev[eoi] = Object.assign(current, { data: [] })
    }
    prev[eoi].data.push({
      component: current.component,
      fromTime: current.fromTime,
      toTime: current.toTime,
      value: current.value,
      unit: current.unit,
      color: current.color,
      station: current.station
    })
    return prev
  }, {})
}

const byStationAggregatedColor = data => {
  return Object.values(data).map(station =>
    Object.assign(station, { color: returnHighestColor(station.data.map(data => data.color)) })
  )
}

const byMunicipality = data => {
  return Object.values(data).reduce((prev, current) => {
    const municipality = current.municipality !== 'N/A' ? current.municipality : generateIdFromFields(current.area, current.zone, current.municipality)
    if (!Object.prototype.hasOwnProperty.call(prev, municipality)) {
      prev[municipality] = {
        zone: current.zone,
        municipality: current.municipality !== 'N/A' ? current.municipality : current.area,
        area: current.area,
        stations: []
      }
    }
    prev[municipality].stations.push(current)

    return prev
  }, {})
}

const byMunicipalityAggregatedColor = data => {
  return Object.values(data).map(municipality =>
    Object.assign(municipality, { color: returnHighestColor(municipality.stations.map(item => item.color)) })
  )
}

const dataByAreas = data => {
  const station = byStation(data)
  const stationAggregatedColor = byStationAggregatedColor(station)
  const municipality = byMunicipality(stationAggregatedColor)
  const municipalityAggregatedColor = byMunicipalityAggregatedColor(municipality)
  const areas = Object.values(municipalityAggregatedColor)
  areas.sort(municipalitySort)
  return areas
}

const dataByStations = data => {
  const station = byStation(data)
  const stationAggregatedColor = byStationAggregatedColor(station)
  return Object.values(stationAggregatedColor)
}

module.exports = data => {
  const areas = dataByAreas(data)
  const repackedAreas = areas.map(area => Object.assign({
    zone: area.zone,
    municipality: area.municipality,
    area: area.area,
    color: area.color
  }))
  return {
    updated: new Date(),
    areas: areas,
    repackedAreas: repackedAreas,
    stations: dataByStations(data)
  }
}
