import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext } from 'react'
import StudentContext from '../../../../../../../contexts/StudentContext'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as yup from "yup"


const TheredComponent = ({ navigation }) => {
    const { recoverDate ,  formData , errorMessage } = useContext(StudentContext)
    const [open, setOpen] = useState(false)
    const [openR, setOpenR] = useState(false)
    const [selectedDate, setSelectData] = useState("")
    const [selectedRedirec, setSelectRedirec] = useState("")
    const [succesedirec, setRedirects] = useState([])

    const cityList = useSelector(e => e.cityList)
    const itemList = cityList.map(e => ({ label: e.viloyat, value: e.viloyat }))



    useEffect(() => {
        setSelectRedirec("")
    }, [succesedirec])

    useEffect(() => {
        if (!selectedDate || selectedDate?.length == 0) return setRedirects([])
        const tumanlar = cityList.find(e => e.viloyat == selectedDate).tumanlar.map(e => ({ label: e, value: e }))
        setRedirects(tumanlar)
    }, [selectedDate])

    useEffect(() => {
        recoverDate(selectedDate, "location", "viloyat")
    }, [selectedDate])

    useEffect(() => {
        recoverDate(selectedRedirec, "location", "tuman")
    }, [selectedRedirec])
    const handleClick = () => {
        const schema = yup.object().shape({
            tuman:yup.string().required("Tumaningizni tanlang!"),
            viloyat:yup.string().required("Viloyatingizni tanlang!"),
            mahalla:yup.string().required("Mahallangiz nomini yozing!")
        })

        schema.validate(formData.location)
        .then(() => navigation.navigate("fouth"))
        .catch((e) => errorMessage(e.toString().split(":")[1]))
    }

    return (
        <View style={style.container}>
            <View style={style.loginContainer}>
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
                        theme='DARK'
                        mode={"BADGE"}
                        badgeStyle={{ backgroundColor: "cyan" }}
                    />
                </View>

                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="Mahala"
                        placeholderTextColor="#5d9490"
                        onChangeText={text => recoverDate(text.trim(), "location" , "mahalla")}
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
export default TheredComponent