import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useContext } from 'react'
import StudentContext from '../../../../../../../contexts/StudentContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as yup from "yup"
import _ from "lodash"

const FirstComponent = ({ navigation }) => {
    const { recoverDate , setShowDateTimePicker , date , formData , errorMessage} = useContext(StudentContext)
    const handleClick = () =>{
        const schema = yup.object().shape({
            name:yup.string().required(),
            firstName:yup.string().required(),
            birthDay:yup.string().required()
        })
        schema.validate(_.pick(formData , "name" , "firstName" , "birthDay"))
        .then(() => navigation.navigate("second"))
        .catch((e) => errorMessage(e.toString().split(":")[1]))
    }

    return (
        <View style={style.container}>
            <View style={style.loginContainer}>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="Ism"
                        placeholderTextColor="#5d9490"
                        onChangeText={text => recoverDate(text.trim(), "name")}
                    />
                </View>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="Familya"
                        placeholderTextColor="#5d9490"
                        onChangeText={text => recoverDate(text.trim(), "firstName")}
                    />
                </View>
                <Pressable style={style.loginInputView} onPress={() => setShowDateTimePicker(true)}>
                    <TextInput
                        placeholder={"Date of your birthday"}
                        value={new Date(date).toDateString() == new Date().toDateString() ? "" : new Date(date).toDateString()}
                        placeholderTextColor={"#5d9490"}
                        editable={false}
                        style={style.loginInput}
                    />
                </Pressable>

                <TouchableOpacity style={{ ...style.loginInputView, justifyContent: "center", alignItems: "center", marginTop: 20 }} onPress={handleClick}>
                    <Text style={{ color: "cyan" }}>Keyingi</Text>
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
        },
    }
)
export default FirstComponent