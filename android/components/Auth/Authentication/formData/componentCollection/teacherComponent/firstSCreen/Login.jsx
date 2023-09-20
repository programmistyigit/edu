import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import { TextInput } from 'react-native'
import { Pressable } from 'react-native'
import TeacherContex from '../../../../../../../contexts/TeacherContext'

const Login = () => {
    const { recoverDate, setShowDateTimePicker, date } = useContext(TeacherContex)
    return (

        <View style={style.loginContainer}>
            <View style={style.loginInputView}>
                <TextInput
                    style={style.loginInput}
                    placeholder="Ism"
                    placeholderTextColor="#5d9490"
                    onChangeText={(text) => recoverDate(text, "login")}
                />
            </View>

            <Pressable style={style.loginInputView} onPress={() => setShowDateTimePicker(true)}>
                <TextInput
                    placeholder={"date you birthday"}
                    value={date.toDateString()}
                    placeholderTextColor={"#5d9490"}
                    editable={false}
                    style={style.loginInput}
                />
            </Pressable>
            <View style={style.loginInputView}>
                <TextInput
                    style={style.loginInput}
                    placeholder="Password"
                    placeholderTextColor="#5d9490"
                    secureTextEntry={true}
                    onChangeText={(text) => recoverDate(text, "password")}
                />
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
            color: "blue"
        },
        loginContainer: {
            padding: 5,
            gap: 4
        },
        loginInputView: {
            padding: 10,
            width: 250,
            height: "auto",
            backgroundColor: "#282929",
        },
        loginInput: {
            color: "cyan",
        }

    }
)

export default Login