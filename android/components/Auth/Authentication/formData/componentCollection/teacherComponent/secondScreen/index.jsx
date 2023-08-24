import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import TeacherContex from '../../../../../../../contexts/TeacherContext'
import { TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux'
const SecondScreen = () => {
    const { recoverDate } = useContext(TeacherContex)
    const [selectedDate, setSelectData] = useState([])
    const [open, setOpen] = useState(false);
    const spaceList = useSelector(e=>e.spaceList)
    const itemList = spaceList.map(e=> ({label : e.cours_name , value : e.cours_name}))
    return (
        <View style={style.container}>

            <View style={style.loginContainer}>
                <View style={style.loginInputView}>
                    <TextInput
                        style={style.loginInput}
                        placeholder="tel number"
                        placeholderTextColor="#5d9490"
                        onChangeText={(text) => recoverDate(text, "phoneNumber")}
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
                        placeholder='fanlaringizni tanlang'
                        showTickIcon={true}
                        showArrowIcon={true}
                        theme='DARK'
                        mode={"BADGE"}
                        badgeStyle={{ backgroundColor: "cyan" }}
                    />
                </View>
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