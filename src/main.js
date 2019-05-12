const reader = require('./reader/reader')

var Spinner = require('cli-spinner').Spinner;
var colors = require('colors')
const loader = new Spinner(colors.rainbow('processing..')+' %s ');
loader.setSpinnerString('◭ ◮');

async function start(){
    await reader.start(loader)
}

module.exports = {start}
