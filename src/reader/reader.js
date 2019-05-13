const {OLD_DB,NEW_DB} = require('../config/db.config')
const dbNames = require('../config/db.name').dbNames
const storeTP = require('../store/storage')
const writer = require('../writer/writer')
const {ExcelExport} = require('../export/excel')
require('dotenv').config()

async function start(loader){
    const readingTable = Object.keys(dbNames)
    loader.start();
    loader.setSpinnerTitle('Old DB Reading Start')
    for(let tableName of readingTable){
        loader.setSpinnerTitle(`${tableName} db read ....`)
        const table = await readTable(tableName)
        const data = await findData(table)
        //ExcelExport({body:data,name:"Myancare User mm",filePath:"src/data"})
        //await storeData(tableName,data)
        await writer.Store(tableName,data,loader)
        //await writer.updateData(tableName,data)
    }
    loader.stop()
}
async function readTable(tableName){
    let db =await OLD_DB()
    //let db =await NEW_DB()
    db = db.db(process.env.OLD_DB_NAME)
    return db.collection(tableName)
}

function findData(table){

    //const query = {"remarks" : "Wallet Recharge"}
    const query = {}
    return new Promise((resolve,reject)=>{
        table.find(query).toArray((err, res)=>{
            if (err) return reject(err);
            return resolve(res)
        })
    })
}
async function storeData(tableName,data,loader){
    const storage = new storeTP(tableName).start
    //await storage.removeAll()
    await storage.Store(data)
    //loader.setSpinnerTitle('Old DB Reading Sucess')
}

module.exports = {start}




