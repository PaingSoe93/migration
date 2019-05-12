const {slug} = require('./convertor')
const {ObjectId} = require('mongodb');


const exportModule = ((object)=>{
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
    object._id = ObjectId(object._id)
    object.createdAt = new Date(object.createdAt) 
    object.updatedAt = new Date(object.updatedAt)
    return object
})


module.exports = {exportModule}