import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FirstComponent from './SingUpComponent/FirstComponent'
import SecondComponent from './SingUpComponent/SecondComponent'

const StackNavigate = createStackNavigator()

const SingUp = () => {
    return (
        <StackNavigate.Navigator>
            <StackNavigate.Screen options={{ headerShown: false }} name='first' component={FirstComponent} />
            <StackNavigate.Screen options={{ headerShown: false }} name='second' component={SecondComponent} />
        </StackNavigate.Navigator>
    )
}

export default SingUp