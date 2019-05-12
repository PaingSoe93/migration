const {slug} = require('./convertor')
const {ObjectId} = require('mongodb');


const exportModule = ((object)=>{
    object._id = ObjectId(object._id)
    object.slug = slug(object.name)
    object.createdAt = new Date(object.createdAt) 
    object.updatedAt = new Date(object.updatedAt)
    object.image = "specialization/"+object.image
    return object
})


module.exports = {exportModule}