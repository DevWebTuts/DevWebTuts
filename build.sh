#!/bin/bash
npm run build
cd dist
git init
git remote add origin https://github.com/DevWebTuts/devwebtuts.github.io.git
git add -A
git commit -m $1
git push origin master --force
