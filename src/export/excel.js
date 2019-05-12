const Excel = require('exceljs');
const fs = require('fs');
const _ = require('lodash')
function headerCreator(body){
    try {
        const key = Object.keys(body)
        const header = []
        key.map((row)=>{
            header.push({header:row,key:row, width: 32})
        })
        return header
    } catch (error) {
        throw new Error(error.message)
    }
}

function singleSheetCreate({header,body}){

    try {
        if(_.isEmpty(header)) header = headerCreator(body[0])
        console.log("Header",header)
        let workbook = new Excel.Workbook();
        let sheet = workbook.addWorksheet('sheet');
        sheet.columns = header
        sheet.addRows(body)
        return workbook   
    } catch (error) {
        throw new Error(error.message)
    }
}

function fileNameCreator({name,filePath}){
    const millsecond = new Date().getTime()
    console.log(name,filePath)
    return './'+filePath+'/'+name
}

async function ExcelExport({header,body,name,filePath}){
    try {
        const workbook = singleSheetCreate({header,body})
        await workbook.xlsx.writeFile(`${fileNameCreator({name,filePath})}.xlsx`)    
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {ExcelExport}