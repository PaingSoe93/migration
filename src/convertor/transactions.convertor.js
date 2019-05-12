const {slug} = require('./convertor')
const {ObjectId} = require('mongodb');


const exportModule = ((object)=>{
    return {
        "_id" : ObjectId(object._id),
        "coin" : object.coin,
        "patient" : ObjectId(object.user),
        "remarks" : object.remarks,
        "payment_gateway" : object.payment_gateway,
        "amount" : object.amount,
        "order_id":object.order_id,
        "manual_payment_status" : object.transaction_status,
        "createdAt" : new Date(object.createdAt),
        "updatedAt" :  new Date(object.updatedAt)
    }
})

module.exports = {exportModule}