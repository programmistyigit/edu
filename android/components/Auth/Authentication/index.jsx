import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import { setRole } from '../../../stories/role'
import SelectRole from './SelectRole/Select'
import FormData from './formData'

const StackNavigate = createStackNavigator()



const Authentication = ({ route }) => {
  const which = route?.params?.which
  const distpatch = useDispatch()
  useEffect(() => { distpatch(setRole({ status:which })) }, [])

  return (
    <StackNavigate.Navigator>
      <StackNavigate.Screen options={{ headerShown: false }} name='select' component={SelectRole} />
      <StackNavigate.Screen options={{ headerShown: false }} name='getData' component={FormData} />
    </StackNavigate.Navigator>
  )
}


export default Authentication