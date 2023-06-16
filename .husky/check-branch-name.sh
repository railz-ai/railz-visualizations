#!/usr/bin/env bash

branch_name="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch_name" = "master" ]; then
  echo "You can't commit directly to master branch"
  exit 1
fi

valid_regex='^((bugfix|feature|hotfix|chore)\/[a-zA-Z0-9\-]+)$'

message="Your branch name does not conform to: $valid_regex."

if [[ ! $branch_name =~ $valid_regex ]]; then
    echo "$message"
    exit 1
fi

exit 0