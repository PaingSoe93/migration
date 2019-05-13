const {NEW_DB,OLD_DB} = require('./src/config/db.config')
var log = require('noogger')
var colors = require('colors')
const main = require('./src/main')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

async function serverStartLog(){
    const logo =`
     _   _   _   _   _   _   _   _   _ 
    / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ 
   ( M | i | g | r | a | t | i | o | n ) 
    \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ 
    `
    console.log(colors.rainbow(logo))
    log.info("Status      : " + colors.green("Start"))
    log.info("Name        : " + colors.green("Migration"))
    log.info(`Version     : ${colors.green(process.env.VERSION||"1.0.0.1")}`)
    try {
        await OLD_DB()
        log.info("DB Status   : " + colors.green("Old Db Connect") )    
        await NEW_DB()
        log.info("DB Status   : " + colors.green("NEW Db Connect") )
    } catch (error) {
        log.error(error)
    }
        
    
}

async function Start(){
    await serverStartLog()
    readline.question(`Migrate File eg.(db,json)`, async (name) => {
        if(name== "db"){
            await main.start()
        }else{
            console.log("Json start")
            await main.jsonStart()
        }
        readline.close()
      })

}
   
Start()