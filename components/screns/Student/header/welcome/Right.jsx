import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
 const HeaderRight = () => {
    const navigation = useNavigation()
    const handleClick = () => navigation.navigate("Search")
  return (
    <TouchableOpacity style={{paddingHorizontal:15}}>
        <Ionicons name="search" size={24} color="#a8a7a7" onPress={handleClick} />
    </TouchableOpacity>
  )
}
export default HeaderRight

