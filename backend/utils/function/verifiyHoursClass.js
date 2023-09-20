const verify = (startHours = String , durationMinuts = String , currentHours = Number) => {
    const startMinut = parseInt(startHours) * 60 ;
    const currentMinutInDay = parseInt(currentHours) * 60
    const endClassMinut = startMinut + parseInt(durationMinuts)
    if(startMinut <= currentMinutInDay <= endClassMinut) return true
    else return false
}

module.exports = verify