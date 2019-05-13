const reader = require('./reader/reader')
const jsonReader = require('./reader/jsonReader')
var Spinner = require('cli-spinner').Spinner;
var colors = require('colors')
const loader = new Spinner(colors.rainbow('processing..')+' %s ');
loader.setSpinnerString('/|\\');

async function start(){
    await reader.start(loader)
}

async function jsonStart(){
    await jsonReader.start(loader)
}

module.exports = {start,jsonStart}
