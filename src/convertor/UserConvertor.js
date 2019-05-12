const {calculateAge,changeDate,remove2000Wallet,checkMobile} = require('./convertor')
const {ObjectId} = require('mongodb');
var myanmarPhoneNumber = require('myanmar-phonenumber');
// console.log(myanmarPhoneNumber.getTelecomName('09978412345'));
const modelName = "Users"

const exportModule = ((object)=>{
    //if(object.mobile||myanmarPhoneNumber.getTelecomName(object.mobile)){  `
    // if(object.mobile){
    //     if(String(object.mobile).indexOf(0)==0){
    //         if(!myanmarPhoneNumber.getTelecomName(object.mobile)) {
    //             console.log("Null",myanmarPhoneNumber.getTelecomName(object.mobile));
    //             return
    //         }
    //     }else{
    //         if(!myanmarPhoneNumber.getTelecomName('0'+object.mobile)) {
    //             console.log("Null",myanmarPhoneNumber.getTelecomName('0'+object.mobile));
    //             return}
    //     }
    //     console.log("Data is",myanmarPhoneNumber.getTelecomName('0'+object.mobile));
    // }
    //}
    let form ={
        _id: ObjectId(object._id),
        role :object.role == 95?"Patient":"Doctor" , 
        device_tokens:  [],
        is_suspended:   object.issuspended?object.issuspended:false,
        is_deleted: object.isdeleted?object.isdeleted:false,
        mobile:     checkMobile(object.mobile),
        gender: object.gender?object.gender:'male',
        email:  object.email?object.email:'',
        age:    calculateAge(object.dob),
        username:   object.username,
        dob:    changeDate(object.dob),
        country_code:   object.country_code,
        facebook_id:    object.facebook_id,
        avatar: "user/"+object.avatar,
        device_os:  object.device_os,
        user_device_info:   object.user_device_info,
        name:  object.name,
        is_active:  object.isactive,
        is_verified:    object.isverified,
        updatedAt:  object.updatedAt?object.updatedAt:new Date(),
        wallet_balance:   remove2000Wallet(object.wallet_balance),
        createdAt : object.createdAt?object.createdAt:new Date(),
        "online_status" : false,
        
    }

    if(form.role == "Patient"){
        form.height= object.height?object.height.value:0
        form.weight= object.weight?object.weight.value:0
        form.blood_type= object.blood_type
    }
    if(form.role == "Doctor"){
        form.degrees = object.degrees
        form.experience = object.experience
        form.biography = object.biography
        form.specialization = ObjectId("5c3c480e4c2b9bb6dc293c6e")
        form.language =['en']
        form.rate =object.rate
    }

    return form
})


module.exports = {modelName,exportModule}