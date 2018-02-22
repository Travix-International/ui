const { getThemeFiles, getAvailableSets } = require('../');

console.log(getThemeFiles({brand: 'cheaptickets', affiliate: 'NL'}));

console.log(getAvailableSets());