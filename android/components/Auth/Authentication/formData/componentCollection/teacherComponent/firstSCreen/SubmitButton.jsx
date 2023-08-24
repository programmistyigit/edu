import { Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useContext } from 'react'
import TeacherContex from '../../../../../../../contexts/TeacherContext'
import { StyleSheet } from 'react-native'

const SubmitButton = ({ onClick }) => {
    const { status } = useContext(TeacherContex)


    return (
        <TouchableOpacity onPress={onClick} style={{ ...style.loginInputView, alignItems: "center", marginTop: 20 }}  >
            <Text style={{ color: "cyan", fontSize: 14 }}>{status == "singUp" ? "keyingisi" : status}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create(
    {
        loginInputView: {
            padding: 10,
            width: 250,
            height: "auto",
            backgroundColor: "cayn",
        },
   
    }
)


export default SubmitButton