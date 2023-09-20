import React from 'react'
import { useContext } from 'react'
import TeacherContex from '../../../../../../../contexts/TeacherContext'
import { StyleSheet } from 'react-native'
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Login from './Login';
import SingUp from './SingUp';
import SubmitButton from './SubmitButton';
import _ from "lodash"
import * as yup from 'yup';

const TeacherScreen = ({ navigation }) => {
    const { status, date, postDataToServer, handleDateChange, showDateTimePicker, data, errorMessage } = useContext(TeacherContex)
    const handleClick = () => {

        if (status == "singUp") {
            const schema = yup.object().shape({
                name: yup.string().required(),
                firstName: yup.string().required(),
                birthDay: yup.string().required(),
                // Add more properties and validation rules as needed
            });

            schema.validate(_.pick(data, ["name", "firstName", "birthDay"]))
                .then(() => {
                    navigation.navigate("second")
                })
                .catch((e) => { errorMessage("validatsiya hatoligi malumotlar kiritilmagan") ; console.log(e);})
        }
        else {
            const schema1 = yup.object().shape({
                password:yup.string().required("parol kiritmadingiz !"),
                login:yup.string().required("Ismingizni kiritmadingiz !")
            })

            schema1.validate(data)
                .then(() => postDataToServer())
                .catch((e) => errorMessage(e.toString().split(":")[1]))
        }
    }
    return (
        <View style={style.container}>
            {
                status == "login"
                    ? <Login />
                    : <SingUp />
            }

            {
                showDateTimePicker && (
                    <DateTimePicker mode={"date"} display={"spinner"} value={date} onChange={handleDateChange} />
                )
            }

            <SubmitButton onClick={handleClick} />

        </View >
    )
}

export default TeacherScreen

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