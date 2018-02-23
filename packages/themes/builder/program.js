#!/usr/bin/env node

const builder = require('./builder');
const pkg = require('../package.json');
const program = require('commander');
const util = require('util');

program
  .version(pkg.version)
  .option('-w, --watch', 'Enables file-watcher functionality', false);

program.parse(process.argv);

builder(program)
  .then(() => console.log('Done!'))
  .catch(e => console.error(util.inspect(e, true, undefined, true)));
