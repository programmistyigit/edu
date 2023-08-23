import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import server from '../../../../../helpers/connection/server';
import { useToast } from 'native-base';
import { useContext } from 'react';
import Context from '../../../../../contexts/Contex';

const Teacher = () => {
    const { setIsLogin } = useContext(Context)
    const [date, setDate] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const { status } = useSelector(e => e.role)
    const tost = useToast()
    const [data, setData] = useState(
        status === "login"
            ? { login: null, password: null, birthDay: null }
            : { name: null, firstName: null, phoneNumber: null, birthDay: null, password: null, confirmPassword: null, spase: null, location: { viloyat: null, tuman: null, mahalla: null } }
    )

    const recoverDate = (value, ...properties) => setData(prevState => ({ ...prevState, [properties[0]]: properties.length == 1 ? value : { ...prevState[properties[0]], [properties[1]]: value } }))


    const handleDateChange = (event, selectedDate) => {
        if (event.type === "set") {
            const d = new Date(selectedDate)
            console.log(event, selectedDate);
            const currentDate = selectedDate || date;
            setShowDateTimePicker(false);
            setDate(currentDate);
            recoverDate(`${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`, "birthDay")
        }
        setShowDateTimePicker(false);
    };


    const postDataToServer = async () => {
        const respons = await server["login"].teacher({ method: "POST", body: JSON.stringify(data), headers: { "Content-type": "application/json" } })
        console.log(respons);
        tost.show({
            description: respons.message,
            placement: 'top',
            status: respons.status,
            duration: 3000,
            isClosable: false,
            style: style[respons.status]
        })
        if (respons.status == "success") setIsLogin(true)
    }


    return (
        <View style={style.container}>
            <View style={style.loginContainer}>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="Ism"
                        placeholderTextColor="#5d9490"
                        onChangeText={(text) => recoverDate(text, "login")}
                    />
                </View>
                
                {status == "singUp" && (
                    <>
                        <View style={style.loginInputView}>
                            <TextInput
                                style={style.loginInput}
                                placeholder="Familya"
                                placeholderTextColor="#5d9490"
                                onChangeText={(text) => recoverDate(text, "firstName")}
                            />
                        </View>
                        <View style={style.loginInputView}>
                            <TextInput
                                style={style.loginInput}
                                placeholder="telefon raqam"
                                placeholderTextColor="#5d9490"
                                onChangeText={(text) => recoverDate(text, "phoneNumber")}
                            />
                        </View>
                    </>
                )}
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
                {status == "singUp" && (
                    <View style={style.loginInputView}>
                        <TextInput
                            style={style.loginInput}
                            placeholder="confirm password"
                            placeholderTextColor="#5d9490"
                            secureTextEntry={true}
                            onChangeText={(text) => recoverDate(text, "password")}

                        />
                    </View>
                )}
               
                {/* {status == "singUp" && (

                )} */}
            </View>

            {
                showDateTimePicker && (
                    <DateTimePicker mode={"date"} display={"spinner"} value={date} onChange={handleDateChange} />
                )
            }

            <TouchableOpacity onPress={postDataToServer} style={{ ...style.loginInputView, alignItems: "center", marginTop: 20 }}  >
                <Text style={{ color: "cyan", fontSize: 20 }}>{status}</Text>
            </TouchableOpacity>
        </View >
    );
};
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
        success: {
            backgroundColor: "green"
        },
        error: {
            backgroundColor: "red"
        },
        warning: {
            backgroundColor: "orange"
        }
    }
)

export default Teacher;