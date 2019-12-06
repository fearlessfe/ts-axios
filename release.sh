#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION
read -p "Release $VERSION - are you sure? (y/n)" -n 1 -r
echo # (optiobal) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Release $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish
  npm publish
fi
