const yaml = require('yaml-ast-parser');
const merge = require('lodash.merge');
const fs = require('fs');
const rootNames = ['common', 'brand', 'locale'];

function buildJsonTree(ast) {
    function getValue(obj, curr) {
      if (obj.mappings && obj.mappings.length) {
        obj.mappings.forEach(({key, value}) => {
          if (!value.mappings || !value.mappings.length) {
            if (value.referencesAnchor) {
              curr[key.value] = `*${value.referencesAnchor}`;
              return;
            }
            if (value.anchorId) {
              curr[key.value] = `&${value.anchorId} ${value.rawValue || value.value}`;
              return;
            }
            curr[key.value] = value.rawValue || value.value;
          } else {
            curr[key.value] = getValue(value, {});
          }
        });
      }

      return curr;
    }

    return getValue(ast, {});
}

function getPathes(brand, lang, country) {
  return [
    './themes/_default.yaml',
    `./themes/${brand}/_default.yaml`,
    `./themes/${brand}/${lang}_${country}.yaml`
  ];
}


function getFilesContent(fileNames) {
    return fileNames.map(fileName => {
      let content;
      try {
        content = fs.readFileSync(fileName, 'utf8');
      } catch (e) {
        //no file
        return false;
      }
      if (~content.indexOf("'")) {
        throw new Error("Please, don't use single quotes in file " + fileName)
      }
      return content;
    });
}

function concatYamlData(files) {
  return files.reduce((result, file, ind) => {
    const fileUpd = file.split('\n').map((line) => '  ' + line);
    fileUpd.unshift(`${rootNames[ind]}:`);
    result += fileUpd.join('\n') + '\n';
    return result;
  }, '');
}

function mergeRoots(tree) {
  const roots = [tree[rootNames[0]], tree[rootNames[1]], tree[rootNames[2]]].filter(Boolean);
  return merge.apply(null, roots);
}

function getThemeFile(brand, lang, country) {
  return yaml.dump(
    mergeRoots(
      buildJsonTree(
        yaml.safeLoad(
          concatYamlData(
            getFilesContent(
              getPathes(brand, lang, country)
            ).filter(Boolean)
          )
        )
      )
    )
  ).replace(/'/g, '');
}

module.exports = getThemeFile;
