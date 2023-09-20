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

const FourthScreen = () => {
  const { recoverDate, data, errorMessage } = useContext(TeacherContex)
  const {setIsLogin} = useContext(Context)
  const tost = useToast()

  const handleClick = () => {
    const validate = yup.object().shape({
      password:yup.string().required(),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
    })

    validate.validate(_.pick(data , 'password' , "confirmPassword"))
    .catch(e=> errorMessage(e.toString().split(":")[1]))
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
      setIsLogin(true)
      }
    })
  }


  return (
    <View style={style.container}>
      <View style={style.loginContainer}>
        <View style={style.loginInputView}>
          <TextInput
            style={style.loginInput}
            placeholder="Password"
            placeholderTextColor="#5d9490"
            secureTextEntry={true}
            onChangeText={(text) => recoverDate(text, "password")}
          />
        </View>
        <View style={style.loginInputView}>
          <TextInput
            style={style.loginInput}
            placeholder="Confirm password"
            placeholderTextColor="#5d9490"
            secureTextEntry={true}
            onChangeText={(text) => recoverDate(text, "confirmPassword")}
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
    }

  }
)
export default FourthScreen