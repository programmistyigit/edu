import { StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import MotherContext from '../../../../../contexts/MotherContext'
import Authentication from './MotherComponent'
import { useToast } from 'native-base'
import server from '../../../../../helpers/connection/server'
import Context from '../../../../../contexts/Contex'

const Mother = () => {
  const { status } = useSelector(e => e.role)
  const tost = useToast()
  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const {setIsLogin} =useContext(Context)
  
  const [formData, setFormData] = useState(
    status == "login"
      ? { login: null, password: null }
      : { name: null, firstName: null, password: null, login : null , confirmPassword: null, birthDay: null }
  )
  const recoverDate = (value, ...properties) => {
    setFormData(prevState => ({
      ...prevState,
      [properties[0]]: properties.length === 1 ? value : { ...prevState[properties[0]], [properties[1]]: value },
    }));
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDateTimePicker(false);
    if (event.type === "set") {
      const d = new Date(selectedDate);
      const currentDate = selectedDate || date;
      setDate(currentDate);
      recoverDate(`${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`, "birthDay");
    }
  };

  const errorMessage = (message) => tost.show({
    description: message,
    placement: 'top',
    status: "error",
    duration: 3000,
    isClosable: false,
    style: style["error"]
  })

  const sendDataToServer = async () => {
    const respons = await server[status].mother(formData)
    tost.show({
      description: respons.message,
      placement: 'top',
      status: respons.status,
      duration: 3000,
      isClosable: false,
      style: { backgroundColor: respons.status == "success" ? "green" : "orange" , alignItems:"center"}
    })
    if (respons.status == "success") setIsLogin(true)
  }


  return (
    <MotherContext.Provider value={{ formData , setFormData , errorMessage , sendDataToServer , date , recoverDate , handleDateChange , showDateTimePicker , setShowDateTimePicker }}>
      <Authentication />
    </MotherContext.Provider>
  )
}
const style = StyleSheet.create(
  {
    success: {
      backgroundColor: "green", alignItems:"center"
    },
    error: {
      backgroundColor: "red", alignItems:"center"
    },
    warning: {
      backgroundColor: "orange", alignItems:"center"
    }
  }
)
export default Mother