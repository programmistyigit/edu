import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import TeacherContex from '../../../../../../../contexts/TeacherContext'
import { TextInput } from 'react-native-gesture-handler'
import * as yup from "yup"
import _ from "lodash"
import server from '../../../../../../../helpers/connection/server'
import Context from '../../../../../../../contexts/Contex'
import { useToast } from 'native-base';
import SubmitButton from './SubmitBtn'

const FourthScreen = ({ navigation }) => {
  const { recoverDate, data, errorMessage } = useContext(TeacherContex)
  const {setIsLogin} = useContext(Context)
  const tost = useToast()

  const handleClick = () => {
    const validate = yup.object().shape({
      login:yup.string().min(5 , "login kamida 5 harfdan iborat bolishi kerak!").required("login kiritilmadi !"),
      password: yup.string()
                .min(5, 'Password must be at least 5 characters')
                .max(12, 'Password must not exceed 8 characters')
                .required('Password is required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    'Parolda kamida bitta ishora , raqam va bosh harf bolishi shart'
                ),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Takroriy parol mos kelmadi').required("tasdiqlovchi parolni kiriting!")
    })

    validate.validate(_.pick(data , 'password' , "confirmPassword" , "login"))
    .then( async () => {
      const respons = await server.singUp.teacher({method : "POST" , body: JSON.stringify(data) , headers: {"Content-type":"application/json"}})
      if(respons.status == "success") {
        tost.show({
          description: respons.message,
          placement: 'top',
          status: respons.status,
          duration: 3000,
          isClosable: false,
          style: style[respons.status]
        })
       return setIsLogin(true)
      }
      console.log(respons.data.details);
      console.log(data);
      errorMessage(respons.message)
      return navigation.navigate("first")
    })
    .catch(e=> errorMessage(e.toString().split(":")[1]))
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
            placeholder="Password"
            placeholderTextColor="#5d9490"
            onChangeText={(text) => recoverDate(text.trim(), "password")}
          />
        </View>
        <View style={style.loginInputView}>
          <TextInput
            style={style.loginInput}
            placeholder="Confirm password"
            placeholderTextColor="#5d9490"
            onChangeText={(text) => recoverDate(text.trim(), "confirmPassword")}
          />
        </View>
      <SubmitButton onClick={handleClick} />
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
    },
    success:{backgroundColor:"green"},
    error:{backgroundColor:"red"},
    warning:{backgroundColor:"orange"}

  }
)
export default FourthScreen