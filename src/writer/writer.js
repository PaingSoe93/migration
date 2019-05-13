const {NEW_DB} = require('../config/db.config')
const dbNames = require('../config/db.name')
const storeTP = require('../store/storage')
const {unicodeConvertor} = require('../convertor/convertor')
var colors = require('colors')
var userConvertor = require('../convertor/UserConvertor')
var articleConvertor = require('../convertor/article.convertor')
var deafultConvertor = require('../convertor/deafult.convertor')
var operatinghoursConvertor = require('../convertor/operatinghours.convertor')
var specializationConvertor = require('../convertor/specialization.convert')
var appointmentConvertor = require('../convertor/appointment.convertor')
var transactionsConvertor = require('../convertor/transactions.convertor')

require('dotenv').config()

async function Store(tableName,data,loader){
    try {
        if(new Date().getMonth() != 4 && new Date().getMonth() != 13){
            return
        }
        loader.setSpinnerTitle(`${tableName} table writing start `)
       const table =await readTable(tableName)
       await storeData(table,data,tableName,loader)   
    } catch (error) {
        console.error("Saving Fails",error)
    }
}

async function readTable(tableName){
    let db =await NEW_DB()
    db = db.db(process.env.NEW_DB_NAME)
    return db.collection(tableName)
}

function convertorModule(collection){

    const obj = {
        user:userConvertor.exportModule,
        article:articleConvertor.exportModule,
        operatinghours:operatinghoursConvertor.exportModule ,
        specialization:specializationConvertor.exportModule,
        appointments:appointmentConvertor.exportModule,
        transaction:deafultConvertor.exportModule,
        user_role:transactionsConvertor.exportModule
    }
    if(obj[collection]){
        return obj[collection]
    }
    return deafultConvertor.exportModule
    
}
function convertor(row,collection){
    const format = convertorModule(collection)
    return format(row)
}

async function storeData(collection,data,tableName,loader){
    loader.setSpinnerTitle(`${tableName} unicode change.. `)
    data = unicodeConvertor(data)
    let RealData = []
    let index = 1
    for(let row of data){
        const convertData = convertor(row,tableName)
        loader.setSpinnerTitle(`${tableName} convert ${data.length} / ${index} `)
        RealData.push(convertData)
        index++
    }

  
    return new Promise((resolve,reject)=>{
        collection.insertMany(RealData, function(err, res) {
            if (err) return reject(err);
            loader.setSpinnerTitle(`${tableName} table writing Success `)
            return resolve(res)           
          });
    })
}

async function updateData(collectionName,data){
    let collection = await readTable(collectionName+"s")

    for(let row of data){
        const query = {_id:row._id}
        const update =  { $set: {avatar:row.avatar} }

        return new Promise((resolve,reject)=>{
            collection.updateMany(query,update,function(err,res){
                if (err) return reject(err);
                return resolve(res)   
            })
        })
        
    }
}

async function staticDB(){
    for(let dbName of Object.keys(dbNames.static)){
        let collection = readTable(dbName)
        let data = dbNames.static[dbName]
        collection.remove({}, ()=>{
            collection.insertMany(data, function(err, res) {
                if (err) return reject(err);
                return resolve(res)           
              });
        })
    }
}

module.exports = {Store,staticDB,updateData}




