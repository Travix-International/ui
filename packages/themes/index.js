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

/**
 * Get all available sets of brand and affiliate
 * @return {[{ brand, affiliate }]}
 */
function getAvailableSets() {
  const themesPath = path.join(__dirname, '/themes');

  return fs.readdirSync(themesPath)
    .reduce((result, brand) => {
      const brandPath = path.join(themesPath, brand);

      if (!fs.statSync(brandPath).isDirectory()) {
        return result;
      }

      result.push({ brand, affiliate: 'default' });

      fs.readdirSync(brandPath)
        .filter(affiliate => fs.statSync(path.join(brandPath, affiliate)).isDirectory())
        .forEach(affiliate => {
          result.push({ brand, affiliate });
        });

      return result;
    }, []);
}

module.exports = {
  getThemeFiles,
  getAvailableSets,
};
