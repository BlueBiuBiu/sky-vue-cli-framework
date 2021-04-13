#!/usr/bin/env node
const program = require('commander');

const { helpOptions } = require("./lib/help")
const { createCommands } = require("./lib/create")

//版本信息
program.version(require('./package.json').version);

//帮助和可选信息
helpOptions()

createCommands()

program.parse(process.argv);

