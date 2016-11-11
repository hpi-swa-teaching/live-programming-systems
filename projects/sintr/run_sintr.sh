#!/bin/bash

project_path="demo"
if [ "$#" -eq 1 ]; then
  project_path=$1
fi

echo "Building or updating Docker container..."
docker build -t "sintr" .
echo "Starting Sintr..."
echo "Point your browser to http://localhost:8080/ in a few seconds."
docker run -i -p 8080:8080 -p 8990:8990 -t "sintr" $project_path
