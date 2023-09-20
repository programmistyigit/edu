import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import TeacherContex from '../../../../../../../contexts/TeacherContext'
import { TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux'
import * as yup from "yup"
import _ from "lodash"
import SubmitButton from './SubmitBtn'




const SecondScreen = ({navigation}) => {
    const { recoverDate , data , errorMessage} = useContext(TeacherContex)
    const [selectedDate, setSelectData] = useState([])
    const [open, setOpen] = useState(false);
    const spaceList = useSelector(e=>e.spaceList)
    const itemList = spaceList.map(e=> ({label : e.cours_name , value : e.cours_name}))

    useEffect(() => {
        recoverDate(selectedDate , "spase")
    } , [selectedDate])

    const handleClick = () => {
        const UzbekPhoneNumberPattern = /^(93|94|91|95|97|98|88|77|55|99)\d{7}$/;

        const validate = yup.object().shape({
            phoneNumber:yup.string().matches(UzbekPhoneNumberPattern , "Invalid phone number format").required(),
            spase:yup.array().required()
        })
        validate.validate(_.pick(data , ["phoneNumber" , "spase"]))
        .then(() => navigation.navigate("therd"))
        .catch((e) => errorMessage(e.toString().split(":")[1]))
    }
    return (
        <View style={style.container}>

            <View style={style.loginContainer}>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        keyboardType={"phone-pad"}
                        placeholder="tel number"
                        placeholderTextColor="#5d9490"
                        onChangeText={(text) => recoverDate(text.trim(), "phoneNumber")}
                    />
                </View>
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
                        multiple={true}
                        min={0}
                        max={10}
                        placeholder='faoliyatingizni blgilang!'
                        showTickIcon={true}
                        showArrowIcon={true}
                        theme='DARK'
                        mode={"BADGE"}
                        badgeStyle={{ backgroundColor: "cyan" }}
                    />
                </View>
                <SubmitButton onClick={handleClick}/>
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
export default SecondScreen