const {EventEmitter} = require("../../Emmiters/eventEmitter");
const Teacherevents = new EventEmitter()

Teacherevents
    .on("add" , ({_id})=>{
        console.log(_id);
    })
    .on("delete" , ({_id})=>{
        console.log(_id);
    })


module.exports = Teacherevents