var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
var log = require('noogger')
var colors = require('colors')

const OLD_DB = function oldDb(){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(process.env.OLD_DB,{useNewUrlParser: true}, function(err, db) {
            if(err) {
                log.error(err)
                return reject(err)}
            return resolve(db)
        })
    }) 
}

const NEW_DB = function newDB(){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(process.env.NEW_DB,{useNewUrlParser: true}, function(err, db) {
            if(err) {
                log.error(err)
                return reject(err)}
            return resolve(db)
        })
    }) 
}

module.exports = {OLD_DB,NEW_DB}