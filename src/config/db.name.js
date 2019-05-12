const serviceFess = require('../static/serviceFees.static')
const dbNames = {
    user:'users',
    article:'articles',
    pages:'pages',
    specialization:'specializations',
    operatinghours:'operatinghours',
    category:'category',
    appointments:'appointments',
    transaction:'transactions',
    admin:'admin',
    user_role:'user_role',
    servicefees:'servicefees',
    exchangerates:"exchangerates",
    favorite:"favorite"
}

const static ={
   servicefees :  serviceFess.data
}

module.exports = {dbNames,static}