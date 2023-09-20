import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import * as yup from "yup"
import _ from "lodash"
import MotherContext from '../../../../../../../contexts/MotherContext'


const FourthComponent = () => {
    const { recoverDate , formData , sendDataToServer , errorMessage} = useContext(MotherContext)
    const handleClick = () => {
        const schema = yup.object().shape({
            login:yup.string().min(5 ,"login kamida 5 harfdan iborat bolsin!").required("login kiritilmadi!"),
            confirmPassword:yup.string().oneOf([yup.ref('password'), null], 'Takroriy parol mos kelmadi').required("tasdiqlovchi parolni kiriting !"),
            password: yup.string()
                .min(5, 'Password must be at least 5 characters')
                .max(12, 'Password must not exceed 8 characters')
                .required('Password is required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    'Parolda kamida bitta ishora , raqam va bosh harf bolishi shart'
                ),
        })

        schema.validate(_.pick(formData , ["password" , "confirmPassword" , "login"]))
        .then(() => sendDataToServer())
        .catch((e)=> errorMessage(e.toString().split(":")[1]))
    }
    return (
        <View style={style.container}>
            <View style={style.loginContainer}>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="Login"
                        placeholderTextColor="#5d9490"
                        onChangeText={(text) => recoverDate(text.trim(), "login")}
                    />
                </View>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="Parol"
                        placeholderTextColor="#5d9490"
                        onChangeText={(text) => recoverDate(text.trim(), "password")}
                    />
                </View>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="Parolni takrorlang"
                        placeholderTextColor="#5d9490"
                        onChangeText={(text) => recoverDate(text.trim(), "confirmPassword")}
                    />
                </View>
                <TouchableOpacity style={{ ...style.loginInputView, justifyContent: "center", alignItems: "center", marginTop: 20 }} onPress={handleClick}>
                    <Text style={{ color: "cyan" }}>Ro'yhatdan O'tish</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const style = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        loginContainer: {
            padding: 5,
            gap: 4,
        },
        loginInputView: {
            padding: 10,
            width: 250,
            height: 50,
            backgroundColor: "#282929",
        },
        loginInput: {
            color: "cyan",
        }

    }
)
export default FourthComponent