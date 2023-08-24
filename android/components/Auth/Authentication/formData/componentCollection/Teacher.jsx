import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import server from '../../../../../helpers/connection/server';
import { useToast } from 'native-base';
import { useContext } from 'react';
import Context from '../../../../../contexts/Contex';
import { createStackNavigator } from '@react-navigation/stack';
import TeacherContex from '../../../../../contexts/TeacherContext';
import TeacherScreen from './teacherComponent/firstSCreen';
import { StyleSheet } from 'react-native';
import SecondScreen from './teacherComponent/secondScreen';
import TherdScreen from './teacherComponent/therdScreen';
import FourthScreen from './teacherComponent/fourthScreen';

const NativeStack = createStackNavigator()

const Teacher = () => {
    const { setIsLogin } = useContext(Context)
    const [date, setDate] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [selectCity, setSelectCity] = useState(null)
    const [selectSpace, setSelectSpace] = useState(null)

    const { status } = useSelector(e => e.role)
    const spaceList = useSelector(e => e.spaceList)
    const cityList = useSelector(e => e.cityList)

    const tost = useToast()
    const [data, setData] = useState(
        status === "login"
            ? { login: null, password: null, birthDay: null }
            : { name: null, firstName: null, phoneNumber: null, birthDay: null, password: null, confirmPassword: null, spase: null, location: { viloyat: null, tuman: null, mahalla: null } }
    )

    const recoverDate = (value, ...properties) => setData(prevState => ({ ...prevState, [properties[0]]: properties.length == 1 ? value : { ...prevState[properties[0]], [properties[1]]: value } }))


    const handleDateChange = (event, selectedDate) => {
        if (event.type === "set") {
            const d = new Date(selectedDate)
            const currentDate = selectedDate || date;
            setShowDateTimePicker(false);
            setDate(currentDate);
            recoverDate(`${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`, "birthDay")
        }
        setShowDateTimePicker(false);
    };
    const errorMessage = (message) => tost.show({
        description: message,
        placement: 'top',
        status: "error",
        duration: 3000,
        isClosable: false,
        style: style["error"]
    })


    const postDataToServer = async () => {
        const respons = await server["login"].teacher({ method: "POST", body: JSON.stringify(data), headers: { "Content-type": "application/json" } })
        console.log(respons);
        tost.show({
            description: respons.message,
            placement: 'top',
            status: respons.status,
            duration: 3000,
            isClosable: false,
            style: style[respons.status]
        })
        if (respons.status == "success") setIsLogin(true)
    }


    return (
        <TeacherContex.Provider value={{ status, recoverDate, setShowDateTimePicker, showDateTimePicker, date, handleDateChange, postDataToServer , data , errorMessage}}>
            <NativeStack.Navigator>
                <NativeStack.Screen options={{headerShown:false}} name='first' component={TeacherScreen} />
                {status == "singUp" 
                    &&
                        [ 
                            <NativeStack.Screen key={"second"} options={{headerShown:false}} name='second' component={SecondScreen} />
                            ,<NativeStack.Screen key={"thred"} options={{headerShown:false}} name='therd'  component={TherdScreen} />
                            ,<NativeStack.Screen key={"fourth"} options={{headerShown:false}} name='fourth' component={FourthScreen} />
                        ]
                }
            </NativeStack.Navigator>
        </TeacherContex.Provider>

    );
};

const style = StyleSheet.create(
    {

        success: {
            backgroundColor: "green"
        },
        error: {
            backgroundColor: "red"
        },
        warning: {
            backgroundColor: "orange"
        }
    }
)


export default Teacher;