#!/bin/sh -
set -eu

cd /
npm ci
node tweet-warnings.js $*