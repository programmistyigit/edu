import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Teacher = () => {
    const { status } = useSelector(e => e.role)
    const [data , setData] = useState(
        status==="login" 
            ? { login : null , password : null , birthDay : null}
            : { name : null , firstName : null , phoneNumber : null , birthDay : null , password : null , confirmPassword : null , spase : null , location : { viloyat : null , tuman : null , mahalla : null } }
    )
    const recoverDate = (value , ...properties) => setData(prevState => ({...prevState , [properties[0]]: properties.length == 1 ? value : {...prevState[properties[0]] , [properties[1]] : value} }))

    return (
        <View>
            
        </View>
    )
}

export default Teacher