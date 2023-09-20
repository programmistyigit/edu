import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import TeacherContex from '../../../../../../../contexts/TeacherContext';
import * as yup from "yup"
import SubmitButton from './SubmitBtn';

const TherdScreen = ({navigation}) => {
  const { recoverDate , data , errorMessage} = useContext(TeacherContex)


  const [open , setOpen] = useState(false)
  const [openR , setOpenR] = useState(false)
  const [selectedDate , setSelectData] = useState("")
  const [selectedRedirec , setSelectRedirec] = useState("")
  const [succesedirec , setRedirects] = useState([])

  const cityList = useSelector(e=>e.cityList)
  const itemList = cityList.map(e=> ({label:e.viloyat , value:e.viloyat}))

  useEffect(() => {
    setSelectRedirec("")
  } , [succesedirec])

  useEffect(() => {
    if(!selectedDate || selectedDate?.length == 0) return setRedirects([])
    const tumanlar = cityList.find(e=>e.viloyat == selectedDate).tumanlar.map(e=>({label:e , value:e}))
    setRedirects(tumanlar)
  } , [selectedDate])

  useEffect(() => {
    recoverDate(selectedDate , "location" , "viloyat")
  } ,[selectedDate])

  useEffect(() => {
    recoverDate(selectedRedirec , "location" , "tuman")
  } , [selectedRedirec])

  const handleClick = () => {
    const validate = yup.object().shape({
      tuman:yup.string().required(),
      viloyat:yup.string().required()
    })

    validate.validate(data.location)
    .then(() => navigation.navigate("fourth"))
    .catch((e) => errorMessage(e.toString().split(":")[1]))
  }


  return (
    <View style={style.container}>
      <View style={{ width: 250 }}>
        <DropDownPicker
          style={{ backgroundColor: "#282929", borderRadius: 0, borderWidth: 0 }}
          placeholderStyle={{ color: "#5d9490" }}
          dropDownContainerStyle={{ backgroundColor: "#282929" }}
          items={itemList}
          open={open}
          value={selectedDate}
          setOpen={() => setOpen(!open)}
          setValue={(data) => setSelectData(data)}
          placeholder='Viloyatingizni tanlang!'
          showTickIcon={true}
          showArrowIcon={true}
          theme='DARK'
          zIndex={6000}
          mode={"BADGE"}
          badgeStyle={{ backgroundColor: "cyan" }}
        />
      </View>

      <View style={{ width: 250 }}>
        <DropDownPicker
          style={{ backgroundColor: "#282929", borderRadius: 0, borderWidth: 0 }}
          placeholderStyle={{ color: "#5d9490" }}
          dropDownContainerStyle={{ backgroundColor: "#282929" }}
          items={succesedirec}
          open={openR}
          value={selectedRedirec}
          setOpen={() => setOpenR(!openR)}
          setValue={(data) => setSelectRedirec(data)}
          
          placeholder='Tumaningizni tanlang!'
          showTickIcon={true}
          showArrowIcon={true}
          theme='DARK'
          mode={"BADGE"}
          badgeStyle={{ backgroundColor: "cyan" }}
        />
      </View>
      <SubmitButton onClick={handleClick} />
    </View>
  )
}

export default TherdScreen




const style = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap:4
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