#!/usr/bin/env sh

set -e

yarn run build

cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:DarkC0der11/particles-demo.git main:gh-pages

cd -