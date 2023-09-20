import { Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ViewComponent = ({text , Icon , onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding : 10 , paddingHorizontal :30 , flexDirection:"row" , gap : 15 , alignItems :"center"}}>
      {Icon}
      <Text style={{color :"#808080" , fontSize : 18}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ViewComponent