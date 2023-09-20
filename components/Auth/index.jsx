import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Change from './Change'
import Authentication from './Authentication'
const StackNavigate = createStackNavigator()
export default function () {
  return (
      <StackNavigate.Navigator>
        <StackNavigate.Screen options={{ headerShown: false }} name='change' component={Change} />
        <StackNavigate.Screen options={{ headerShown: false }} name='authentication' component={Authentication} />
      </StackNavigate.Navigator>
  )
}
