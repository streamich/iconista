const fs = require('fs');
const path = require('path');
const icons = require('../sets/atlaskit_34');

const processIcon = (name) => {
  const filename = path.join(__dirname, '..', 'sets', 'atlaskit_34', name + '.svg')
  const svg = fs.readFileSync(filename, 'utf8');
  const newSvg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');

  fs.writeFileSync(filename, newSvg);
};

for (const name of icons)
  processIcon(name);
