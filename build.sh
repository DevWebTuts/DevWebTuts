#!/bin/bash
cd dist
git init
git remote add origin https://github.com/DevWebTuts/devwebtuts.github.io.git
git add -A
git commit -m "Fix"
git push origin master --force
