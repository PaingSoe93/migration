const google_myanmar_tools = require("myanmar-tools");
const moment = require('moment')

let changeDate =function changeDate(dob){
    const data = new Date(dob)
    return moment(data).format("YYYY-MM-DD")
}
let calculateAge =function  calculateAge(dob){
    var now = moment(new Date()); //todays date
    var end = moment(new Date(dob));
    var duration = moment.duration(end.diff(now));
    return parseInt(duration.asYears() * -1)
}

let remove2000Wallet =function  remove2000Wallet(balance){

    if(balance == 2000 || balance == "2000"){
        return 0
    }
    if(balance > 0){
        return parseInt(balance)
   }
   
    return 0
}

function checkMobile(mobile){
    if(!mobile){
        return
    }
    if(String(mobile).startsWith('0')){
        mobile = String(mobile).replace('0','')
    }
    return mobile
}

function slug(text){
    if(!text) return 
    text = text.replace(new RegExp(' '),'-')
    text = String(text).toLowerCase()
    return text
}
function unicodeConvertor(json){
    let text = JSON.stringify(json)
    if(!text|| text ==null){
        return text
    }
    try {
        const detector = new google_myanmar_tools.ZawgyiDetector();
        const converter = new google_myanmar_tools.ZawgyiConverter();
        const score = detector.getZawgyiProbability(text);
        let percentage = parseInt(score * 100)
        if(percentage >50){
            text = converter.zawgyiToUnicode(text)
        }
        return JSON.parse(text)            
    } catch (error) {
        console.warn("Warm",error.message)
    }
}


module.exports= {unicodeConvertor,changeDate,remove2000Wallet,slug,calculateAge,checkMobile}