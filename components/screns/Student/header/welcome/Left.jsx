import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation , DrawerActions} from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

const HeaderLeft = () => {
    const navigation = useNavigation()
    const handleClick = () => navigation.dispatch(DrawerActions.openDrawer)
  return (
    <View style={{paddingHorizontal:15, paddingTop:5}} onTouchEnd={handleClick}>
        <Octicons name="three-bars" size={18} color="#a8a7a7" />
    </View>
  )
}

export default HeaderLeft