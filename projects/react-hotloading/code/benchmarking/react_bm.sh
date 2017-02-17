#!/bin/bash
#sed -i '' 's/return op1 - op2/return op1 + op2/g' src/js/reducers/index.js

# for i in {1..1000}
# do
#   if [ $((i%2)) -eq 0 ]
#   then
#     sed -i '' '30d' ../src/js/container/operator.jsx
#   else
#     sed -i '' '30i<div className="button" onClick={() => onClick('+')}><div className="content">+</div></div>' ../src/js/container/operator.jsx
#   fi
#   sleep 0.9s  # sleeps 900ms 
#   echo "$i th iteration"
# done

for i in {1..1000}
do
  if [ $((i%2)) -eq 0 ]
  then
    sed -i '' 's/>7</>77</g' ../src/js/container/keypad.jsx
  else
    sed -i '' 's/>77</>7</g' ../src/js/container/keypad.jsx
  fi
  sleep 1.2s  # sleeps 900ms 
  echo "$i th iteration"
done