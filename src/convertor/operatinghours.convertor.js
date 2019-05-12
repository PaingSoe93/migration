const {slug} = require('./convertor')
const {ObjectId} = require('mongodb');


const exportModule = ((object)=>{
    let format = {}
    format._id = ObjectId(object._id)
    format.doctor = ObjectId(object.doctor)
    format.slot_start_time =  object.slot_start_time_long
    format.isConfirmed = object.isConfirmed == 1?false:true
    format.slot_end_time =  object.slot_start_time_long
    return format
})


module.exports = {exportModule}