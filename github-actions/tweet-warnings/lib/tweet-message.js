const Twit = require('twit')
const twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || 'consumer_key',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'consumer_secret',
  access_token: process.env.TWITTER_ACCESS_TOKEN || 'access_token',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'access_token_secret'
})

module.exports = message => {
  return new Promise((resolve, reject) => {
    twitter.post('statuses/update', { status: message }, (error, data, response) => {
      if (error) {
        console.error(error)
        return reject(error)
      } else {
        return resolve(response)
      }
    })
  })
}
