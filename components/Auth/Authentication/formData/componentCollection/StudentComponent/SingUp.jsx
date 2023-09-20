import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FirstComponent from './SingUpComponent/FirstComponent'
import SecondComponent from './SingUpComponent/SecondComponent'
import TheredComponent from './SingUpComponent/TheredComponent'
import FourthComponent from './SingUpComponent/FourthComponent'
const StackNavigator = createStackNavigator()

const SingUp = () => {
  console.log("singggg");
  return (
    <StackNavigator.Navigator >
      <StackNavigator.Screen options={{headerShown : false}} name='first' component={FirstComponent}/>
      <StackNavigator.Screen options={{headerShown : false}} name='second' component={SecondComponent}/>
      <StackNavigator.Screen options={{headerShown : false}} name='thred' component={TheredComponent}/>
      <StackNavigator.Screen options={{headerShown : false}} name='fouth' component={FourthComponent}/>
    </StackNavigator.Navigator>
  )
}

export default SingUp