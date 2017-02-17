#!/bin/bash
#sed -i '' 's/return op1 - op2/return op1 + op2/g' src/js/reducers/index.js

for i in {1..1000}
do
  if [ $((i%2)) -eq 0 ]
  then
    sed -i '' 's/return op1 + op2/return op1 - op2/g' ../src/js/reducers/index.js
  else
    sed -i '' 's/return op1 - op2/return op1 + op2/g' ../src/js/reducers/index.js
  fi
  sleep 1.5s  # sleeps 900ms 
  echo "$i th iteration"
done