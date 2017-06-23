const fs = require('fs');
const path = require('path');

/**
 * Get theme files in YAML format
 * @param  {Object} options
 * @param  {string} options.brand - cheaptickets
 * @param  {string} options.affiliate - NL
 * @return {String}
 */
function getThemeFiles({ brand, affiliate }) {
  return [
    path.join(__dirname, '/themes/_default.yaml'),
    path.join(__dirname, `/themes/${brand}/_default.yaml`),
    path.join(__dirname, `/themes/${brand}/${affiliate.toUpperCase()}/_default.yaml`)
  ].filter(fs.existsSync);
}

module.exports = getThemeFiles;
