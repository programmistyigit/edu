import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from 'react';
import MotherContext from '../../../../../../contexts/MotherContext';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Login from './Login';
import SingUp from './SingUp';

const Authentication = () => {
    const { status } = useSelector(state => state.role);
    const { date , showDateTimePicker , handleDateChange} = useContext(MotherContext);


    return (
        <>
            {status === "login" ? <Login /> : <SingUp />}
            {showDateTimePicker && (
                <DateTimePicker mode={"date"} display={"spinner"} value={date} onChange={handleDateChange} />
            )}
        </>
    );
}

export default Authentication