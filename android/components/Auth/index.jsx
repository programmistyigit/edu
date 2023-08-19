import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import Auth from './Auth'
import Singin from './singin'
import SingUp from './singUp'
import { StatusBar } from 'expo-status-bar'
const StackNavigate = createStackNavigator()
export default function() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StackNavigate.Navigator>
        <StackNavigate.Screen name='auth' component={Auth} />
        <StackNavigate.Screen name='singin' component={Singin}/>
        <StackNavigate.Screen name='singup' component={SingUp} />
      </StackNavigate.Navigator>
      <StatusBar style='light'/>
    </NavigationContainer>
  )
}
