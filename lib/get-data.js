const https = require('https')

module.exports = url => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let body = ''
      res.on('data', d => {
        body += d
      })

      res.on('end', () => {
        const json = JSON.parse(body)
        return resolve(json)
      })
    }).on('error', (error) => {
      return reject(error)
    })
  })
}
