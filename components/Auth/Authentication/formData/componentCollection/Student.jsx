import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StudentContext from '../../../../../contexts/StudentContext';
import Authentication from './StudentComponent';
import server from '../../../../../helpers/connection/server';
import { useContext } from 'react';
import Context from '../../../../../contexts/Contex';
import { useToast } from 'native-base';
import { StyleSheet } from 'react-native';

const Student = () => {
  const tost = useToast()
  const { status } = useSelector(state => state.role);
  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const { setIsLogin } = useContext(Context)

  const [formData, setFormData] = useState(
    status === "login"
      ? { login: null, password: null }
      : { name: null, firstName: null, phoneNumber: null, birthDay: null, login : null , password: null, confirmPassword: null, email: null, location: { viloyat: null, tuman: null, mahalla: null } }
  );

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
  const sendDataToServer = async () => {
    const respons = await server[status].student(formData)
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


  const errorMessage = (message) => tost.show({
    description: message,
    placement: 'top',
    status: "error",
    duration: 3000,
    isClosable: false,
    style: style["error"]
  })

  return (
    <StudentContext.Provider value={{ formData, setFormData, recoverDate, date, setDate, handleDateChange, showDateTimePicker, setShowDateTimePicker, sendDataToServer, errorMessage }}>
      <Authentication />
    </StudentContext.Provider>
  );
};


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

export default Student;