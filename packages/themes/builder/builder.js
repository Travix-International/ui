const path = require('path');
const { outputFile } = require('fs-extra');
const themeBuilder = require('../../theme-builder/src/app');

const { getThemeFiles, getAvailableSets } = require('../');

const defaultThemeFiles = {
  input: path.join(__dirname, '..', 'themes', '_default.yaml'),
  output: path.join(__dirname, '..', 'dist', 'default.css'),
};

function buildTheme(builder, themeFiles) {
  return builder.build(themeFiles);
}

function buildThemeCSS(builder, themeFiles, output) {
  return buildTheme(builder, themeFiles)
    .then(result => outputFile(output, result));
}

/**
 * Triggers the build process.
 *
 * @module builder
 * @param {Boolean} watch      Flag to determine if it should run in 'watch' mode
 * @return {Promise}
 */
module.exports = (options) => {
  const {
    watch,
  } = options;

  const themeFiles = [defaultThemeFiles].concat(
    getAvailableSets().map((item) => {
      if (item.affiliate !== 'default') {
        return {
          input: path.join(__dirname, '..', 'themes', item.brand, item.affiliate, '_default.yaml'),
          output: path.join(__dirname, '..', 'dist', `${item.brand}_${item.affiliate}.css`),
        }
      }

      return {
        input: path.join(__dirname, '..', 'themes', item.brand, '_default.yaml'),
        output: path.join(__dirname, '..', 'dist', `${item.brand}.css`),
      }
    })
  ).filter(Boolean);

  const builder = themeBuilder({
    format: 'cssvars',
    prefix: 'tx',
  });

  if (watch) {
    builder.watch(themeFiles, (result) => {
      outputFile(output, result);
    });
  }

  return Promise.all(themeFiles.map(({ input, output }) => {
    return buildThemeCSS(builder, [input], output);
  }));
};
