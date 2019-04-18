[![Build Status](https://travis-ci.com/Alheimsins/luftstatus-api.svg?branch=master)](https://travis-ci.com/Alheimsins/luftstatus-api)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# luftstatus-api

API for luftstatus services

[luftkvalitet.api.alheimsins.net](https://luftkvalitet.api.alheimsins.net)

# API

## ```GET /original```

Returns original data from Nilu

## ```GET /data```

Returns transformed data

## ```GET /stations```

Returns data grouped by station

## ```GET /areas```

Returns data grouped by area

## ```GET /warnings```

Returns warning message for high and very high pollution

# Update

Run the script

```
$ npm run update-data
```

# Deploy

Deploys to ZEIT/Now

```
$ npm run deploy
```

# License

[MIT](LICENSE)