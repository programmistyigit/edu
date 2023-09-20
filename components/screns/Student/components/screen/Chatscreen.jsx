import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Chatscreen = () => {
  const userData = useSelector(e=>e.user_data)
  const classes = userData?.student?.student_classesID
  const allSuccessClassList = !classes ? [] : classes.filter((e) => !e.class_follow_studentsId.includes(userData?.student?._id))
  
  const allStudent = allSuccessClassList.map(e=>e.class_studentsId).reduce((i , e) => [...i , ...e] , []).reduce((initialList , currentStudent) => !initialList.find(e=> e._id == currentStudent._id) ? [...initialList , currentStudent] : initialList , [])
  console.log(allStudent);
  console.log(allStudent);
  return (
    <View>
      <Text>Chatscreen</Text>
    </View>
  )
}

export default Chatscreen