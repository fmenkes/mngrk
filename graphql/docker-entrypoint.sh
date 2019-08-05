#!/usr/bin/env sh
set -e

if [ "${NODE_ENV}" == "development" ]
then
  npm run dev
else
  npm run start
fi