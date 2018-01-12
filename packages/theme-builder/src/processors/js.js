const template = require('lodash.template');
const helpers = require('../helpers');

function throwDescriptiveError({ err, key, value }) {
  if (err instanceof ReferenceError) {
    throw new Error(`Failed to parse value of ${key}: '${value}'. Use double quotes inside interpolated strings`);
  }

  throw err;
}

/**
 * Simple check if passed argument is object or array
 *
 * @param {any}
 */
function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Apply transform on primitive values (strings, numbers)
 *
 * @param {Object|Array} value
 * @param {Object} local variables to pass into transformation
 */
function applyTransforms(value, obj) {
  return template(value)(obj);
}

/**
 * This function will walk a object tree and apply transformations on it
 *
 * @param {Object} obj
 * @param {Object} the parent object
 */
function parseExpressions(obj, proto) {
  const parsedObj = Object.assign(Object.create(proto), obj);
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const fn = isObject(value) ? parseExpressions : applyTransforms;
    try {
      parsedObj[key] = fn(value, parsedObj);
    } catch (err) {
      throwDescriptiveError({ err, key, value });
    }
  });

  return parsedObj;
}

const JsProcessor = {
  compile(obj) {
    return parseExpressions(obj, helpers);
  },
};

module.exports = JsProcessor;
