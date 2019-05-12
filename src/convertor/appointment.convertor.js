const {slug} = require('./convertor')
const {ObjectId} = require('mongodb');


const exportModule = ((object)=>{
    return {
        "_id" : ObjectId(object._id),
        "status" : 1,
        "reschedule" : object.reschedule,
        "ispassed" : object.isPassed,
        "booking_status" : object.status,
        "doctor" : ObjectId(object.doctor),
        "patient" : ObjectId(object.patient),
        "type" : object.type,
        "date_of_issue" :new Date(object.date_of_issue),
        "amount" : object.amount,
        "service_fees" : object.amount/Math.round(object.amount/object.service_fees),
        "total_appointment_fees" : object.total_appointment_fees,
        "slotStartTime" : object.slotStartTime,
        "slotEndTime" : object.slotEndTime,
        "date_of_issue_utc" : new Date(object.date_of_issue_utc),
        "slot" : object.slot?ObjectId(object.slot):null,
        "reason" : object.remarks,
        "createdAt" : new Date(object.createdAt),
        "updatedAt" :  new Date(object.updatedAt)
    }
})


module.exports = {exportModule}