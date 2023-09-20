import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Student from './componentCollection/Student'
import Mother from './componentCollection/Mother'
import Teacher from './componentCollection/Teacher'
const componentCollection = { student: <Student/> , mother: <Mother/> , teacher:<Teacher /> }

const FormData = () => {
    const { role } = useSelector(e => e.role)
    console.log(role);
    return componentCollection[role]
}

export default FormData