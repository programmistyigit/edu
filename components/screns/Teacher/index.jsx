import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Context from '../../../contexts/Contex'

const TeacherMainComponent = () => {
  const {logOut} = useContext(Context)
  return (
    <View style={{flex:1 , justifyContent:"center"}}>
      <Text onPress={logOut}>TeacherMainComponent</Text>
    </View>
  )
}

export default TeacherMainComponent