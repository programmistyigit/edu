import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useContext } from 'react'
import StudentContext from '../../../../../../../contexts/StudentContext'
import * as yup from "yup"
import _ from "lodash"


const SecondComponent = ({ navigation }) => {
    const { recoverDate , formData , errorMessage} = useContext(StudentContext)
    const handleClick = () => { 
        const UzbekPhoneNumberPattern = /^(93|94|91|95|97|98|88|77|55|99)\d{7}$/;
        const emailValidation = yup.string().email("Notog'ri email format").test(
            "is-real-email",
            "Invalid email domain",
            async (value) => {
                if (!value) return true; // Allow empty values
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
                if (!emailRegex.test(value)) return false;
        
                // Additional check to validate the email domain using an external service or API
                // Implement your own logic to check if the email domain exists and is valid
                return true
            }
        );
        const schema = yup.object().shape({
            phoneNumber:yup.string().matches(UzbekPhoneNumberPattern , "Invalid phone number format").required("Telefon raqam yozish majburiy"),
            email:emailValidation.required("Email yozish majburiy")
        })

        schema.validate(_.pick(formData , ["phoneNumber" , "email"]))
        .then(() => navigation.navigate("thred"))
        .catch((e) => errorMessage(e.toString().split(":")[1]))
    }
    return (
        <View style={style.container}>
            <View style={style.loginContainer}>

                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="tel.raqam"
                        placeholderTextColor="#5d9490"
                        inputMode={"tel"}
                        onChangeText={text => recoverDate(text.trim(), "phoneNumber")}
                    />
                </View>

                <View style={style.loginInputView}>
                    <TextInput
                        inputMode={"email"}
                        style={style.loginInput}
                        placeholder="email"
                        placeholderTextColor="#5d9490"
                        onChangeText={text => recoverDate(text.trim(), "email")}
                    />
                </View>

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
export default SecondComponent