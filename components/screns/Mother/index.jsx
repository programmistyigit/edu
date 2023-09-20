import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Context from '../../../contexts/Contex'

const MotherMainComponent = () => {
  const {logOut} = useContext(Context)
  return (
    <View style={{flex:1, justifyContent:"center"}}>
      <Text onPress={logOut}>MotherMainComponent</Text>

    </View>
  )
}

export default MotherMainComponent