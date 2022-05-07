#!/bin/bash

## Usage: ./.docker-sync.sh
## Dry run: docker="echo docker" ./.docker-sync.sh
## Verbose: docker_args=" " ./.docker-sync.sh

set -e

docker="${docker:-docker}"
docker_args="${docker_args:--q}"

project="oneplatform-us-247012"

declare -A ver
eval $(jq -r 'to_entries|.[]|"ver[\(.key)]=\(.value)"' old_ver.json)

declare -A images
images=(
  ["curlimages/curl:${ver[curl]}"]=curl
  ["gcr.io/kaniko-project/executor:v${ver[kaniko]}-debug"]=kaniko-executor
  ["node:${ver[node]}"]=node
)

pattern=$1

for source in "${!images[@]}"; do
  case "$source" in
    *$pattern*)
      echo -n "<- "
      $docker pull $docker_args "$source"
      tag=${images[$source]#*:}
      test "$tag" = "${images[$source]}" && tag=${source#*:}
      test "$tag" = "$source" && tag=${ver[${images[$source]}]}
      target="gcr.io/$project/${images[$source]%:*}:$tag"
      $docker tag "$source" "$target"
      echo -n "-> "
      $docker push $docker_args "$target"
    ;;
  esac
done
