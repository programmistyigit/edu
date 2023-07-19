const reverse_obj = (role , value) => {
    const obj = {}
    for(key in value){
        obj[`${role}_${key}`]=value[key]
    }
    return obj 
}

module.exports = reverse_obj