import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import TeacherContex from '../../../../../../../contexts/TeacherContext'
import { TextInput } from 'react-native'
import { Pressable } from 'react-native'

const SingUp = () => {
    const { recoverDate, setShowDateTimePicker, date } = useContext(TeacherContex)

    return (
        <View style={style.loginContainer}>
            <View style={style.loginInputView}>
                <TextInput
                    style={style.loginInput}
                    placeholder="ism"
                    placeholderTextColor="#5d9490"
                    onChangeText={(text) => recoverDate(text.trim(), "name")}
                />
            </View>
            <View style={style.loginInputView}>
                <TextInput
                    style={style.loginInput}
                    placeholder="familya"
                    placeholderTextColor="#5d9490"
                    onChangeText={(text) => recoverDate(text.trim(), "firstName")}
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


export default SingUp