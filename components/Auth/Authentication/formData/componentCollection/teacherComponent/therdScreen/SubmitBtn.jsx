import { Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'

const SubmitButton = ({ onClick }) => {
    return (
        <TouchableOpacity onPress={onClick} style={{ ...style.loginInputView, alignItems: "center", marginTop: 20 }}  >
            <Text style={{ fontSize: 14 }}>keyingisi</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create(
    {
        loginInputView: {
            padding: 10,
            width: 250,
            height: "auto",
            backgroundColor: "cyan",
        },
   
    }
)


export default SubmitButton