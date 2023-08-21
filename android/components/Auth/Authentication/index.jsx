import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import { setRole } from '../../../stories/role'
import SelectRole from './SelectRole/Select'

const StackNavigate = createStackNavigator()



const Authentication = ({ route }) => {
  const role = route?.params?.which
  const distpatch = useDispatch()
  useEffect(() => { distpatch(setRole({ role })) }, [])

  return (
    <StackNavigate.Navigator>
      <StackNavigate.Screen name='select' component={SelectRole} />
      <StackNavigate.Screen name='getData' component={SelectRole} />
    </StackNavigate.Navigator>
  )

}


export default Authentication