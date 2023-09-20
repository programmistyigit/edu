import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import StudentContext from '../../../../../../contexts/StudentContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as yup from "yup"
const Login = () => {

    const { recoverDate, sendDataToServer, formData, errorMessage } = useContext(StudentContext);
    const handleClick = () => {
        const schema = yup.object().shape({
            login: yup.string().required(),
            password: yup.string().required(),
            // Add more properties and validation rules as needed
        });
        schema.validate(formData)
            .then(() => sendDataToServer())
            .catch((error) => errorMessage(error.toString()))
    }
    return (
        <View style={{flex:1 , justifyContent:"center" , alignItems:"center"}}>

            <View style={styles.loginContainer}>
                <View style={styles.loginInputView}>
                    <TextInput
                        style={styles.loginInput}
                        placeholder="Login"
                        placeholderTextColor="#5d9490"
                        onChangeText={text => recoverDate(text.trim(), "login")}
                    />
                </View>


                <View style={styles.loginInputView}>
                    <TextInput
                        style={styles.loginInput}
                        placeholder="Password"
                        placeholderTextColor="#5d9490"
                        secureTextEntry={true}
                        onChangeText={text => recoverDate(text.trim(), "password")}
                    />
                </View>

                <TouchableOpacity style={{ ...styles.loginInputView, justifyContent: "center", alignItems: "center", marginTop: 20 }} onPress={handleClick}>
                    <Text style={{ color: "cyan" }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },


});

export default Login;