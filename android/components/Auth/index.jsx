import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Change from './Change'
import Authentication from './Authentication'
const StackNavigate = createStackNavigator()
export default function () {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StackNavigate.Navigator>
        <StackNavigate.Screen options={{ headerShown: false }} name='change' component={Change} />
        <StackNavigate.Screen options={{ headerShown: false }} name='authentication' component={Authentication} />
      </StackNavigate.Navigator>
      <StatusBar style='light' />
    </NavigationContainer>
  )
}
