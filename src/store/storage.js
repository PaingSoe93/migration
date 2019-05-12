const fs = require('fs')
const DataStore  = require('nedb')

module.exports = class STORAGE{   

    constructor(dbName){
        this.dbName = "src/db/"+dbName+".db"
        this.db = {}
    }

    get start(){
        this.db.temp = new DataStore(this.dbName)
        this.db.temp.loadDatabase()
        return this
    }

    async removeAll(){
        await fs.unlinkSync(this.dbName)
    }
    async  Store(data){
        try {
            await this.db.temp.insert(data)   
        } catch (error) {
            console.log("Insert Fail",error)
            Promise.reject(error.message)
        }
    }

    async  Search(query,sort){
        return new Promise((resolve,reject)=>{
            this.db.temp.find(query,((err,data)=>{
                if(err) return reject(err)
                return resolve(data)
            }))
        })
    }

    async  SearchOne(query){
        return new Promise((resolve,reject)=>{
            this.db.temp.findOne(query,((err,data)=>{
                if(err) return reject(err)
                return resolve(data)
            }))
        })
        
    }


    async  Update(query,data){
        try {
            await this.db.temp.update(query,data)   
        } catch (error) {
            console.log("Updating Fail",error)
            Promise.reject(error.message)
        }
    }

    async  Delete(query){
        try {
            await this.db.temp.remove(query)   
        } catch (error) {
            console.log("Delete Fail",error)
            Promise.reject(error.message)
        }
    }
}
