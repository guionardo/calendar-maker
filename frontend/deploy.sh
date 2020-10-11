#!/bin/bash
set -env
NODE_ENV="production"
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:guionardo/calendar-maker.git master:gh-pages

cd -