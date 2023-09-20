import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import StudentContext from '../../../../../../contexts/StudentContext';
import Login from './Login';
import SingUp from './SingUp';

const Authentication = () => {
    const { status } = useSelector(state => state.role);
    const { date , showDateTimePicker , handleDateChange} = useContext(StudentContext);


    return (
        <>
            {status === "login" ? <Login /> : <SingUp />}
            {showDateTimePicker && (
                <DateTimePicker mode={"date"} display={"spinner"} value={date} onChange={handleDateChange} />
            )}
        </>
    );
};


export default Authentication;