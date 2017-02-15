sed -i '' '4 i\
window.hmrBM = [];' ../node_modules/webpack-hot-middleware/client.js
sed -i '' '133 i\
window.hmrBM.push(obj.time);' ../node_modules/webpack-hot-middleware/client.js