const fs = require('fs')
const writer = require('../writer/writer')
const jsonPath = require('../config/json.name').jsonName

async function start(loader){

    console.log("Start")
    loader.start();
    loader.setSpinnerTitle('Json File Reading Start')
    await jsonName(loader)
    //loader.stop()
}

async function main(path,name,loader){
    const data = await readJson(path)
    await writer.Store(name,data,loader)
}

async function jsonName(loader){
    const  workJson = Object.keys(jsonPath)
    
    for(let index = 0;workJson.length - 1 >= index ;index ++){
        loader.setSpinnerTitle(`${workJson[index]} json read ....`)
        await main(Object.values(jsonPath)[index],workJson[index],loader)
    }
    loader.setSpinnerTitle(`Json Writting success`)
    //loader.stop()
}

async function readJson(path){
    const data = await fs.readFileSync(path)
    return JSON.parse(data)
}
 
module.exports = {start}