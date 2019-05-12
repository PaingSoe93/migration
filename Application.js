const {NEW_DB,OLD_DB} = require('./src/config/db.config')
var log = require('noogger')
var colors = require('colors')
const main = require('./src/main')

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
    await main.start()
}
   
Start()