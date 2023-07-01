const {EventEmitter} = require("../../Emmiters/eventEmitter");
const events = new EventEmitter()

events.on("message" , ({_id , msg})=>{
    console.log(_id , msg);
})


events.on("delete" , ({_id , classesID})=>{
    console.log(_id , classesID);
})

module.exports = events