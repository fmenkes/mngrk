#!/usr/bin/env sh
set -e

if [ "${NODE_ENV}" == "development" ]
then
  concurrently "npm run dev" "onchange -v package-lock.json -- npm i --no-shrinkwrap"
else
  npm run start
fi