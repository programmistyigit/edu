import { View, Text } from 'react-native'
import React from 'react'
import Example from './DefaultScreenComponents/Chart'
import Calendar from './DefaultScreenComponents/Calendar'
import { ScrollView } from 'react-native-gesture-handler'

const DefaultScreen = () => {
  return (
    <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>

      <Calendar />
      <View style={{paddingVertical: 10}}>
        <Example  />
      </View>

    </ScrollView>
  )
}

export default DefaultScreen