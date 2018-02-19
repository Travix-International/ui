const getThemeFiles = require('./index.js');

const files = getThemeFiles({
    brand: 'vayama',
    affiliate: 'en'
});

console.log('Files:', files);
