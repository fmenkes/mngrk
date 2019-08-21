#!/bin/bash -e

if [[ "${DRONE_PULL_REQUEST}" ]]; then 
    echo "$(git --no-pager diff --name-only FETCH_HEAD FETCH_HEAD~1 | sort -u | awk 'BEGIN {FS="/"} {print $1}' | uniq)" > changed_folders;
else 
    echo "$(git --no-pager diff --name-only HEAD~1 | sort -u | awk 'BEGIN {FS="/"} {print $1}' | uniq)" > changed_folders; 
fi

echo ${DRONE_COMMIT_MESSAGE} | grep -o 'api\|graphql\|client' | sort -u >> changed_folders
sort changed_folders -u -o changed_folders
