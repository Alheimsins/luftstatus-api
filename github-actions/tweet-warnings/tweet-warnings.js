(async () => {
  const axios = require('axios')
  const warningsUrl = 'https://api.luftstatus.no/warnings'
  const tweetMessage = require('./lib/tweet-message')
  const createMessage = require('./lib/create-message')
  let jobs = []

  const { data } = await axios.get(warningsUrl)
  console.log(`Got data - ${data.length}`)
  if (data.length > 0) {
    if (data.high.length > 0) {
      const msg = createMessage('høy', data.high)
      jobs.push(tweetMessage(msg))
    }
    if (data.veryHigh.length > 0) {
      const msg = createMessage('svært høy', data.veryHigh)
      jobs.push(tweetMessage(msg))
    }
    const tweets = await Promise.all(jobs)
    console.log(JSON.stringify(tweets, null, 2))
  }
  console.log(`Finished`)
})()
