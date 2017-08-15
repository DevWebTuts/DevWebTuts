#!/bin/bash
msg=$1
npm run build
cd dist
git init
git remote add origin https://github.com/DevWebTuts/devwebtuts.github.io.git
git add -A
git commit -m "$msg"
git push origin master --force
