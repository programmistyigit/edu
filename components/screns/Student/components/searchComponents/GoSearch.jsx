import { View, Text } from 'react-native'
import React from 'react'

const GoSearch = ({ data }) => {
  return (
    <View style={{flex : 1 , justifyContent: "center" , alignItems: "center"}}>
      <Text style={{ color : "white" }}>{data.length == 0 ? "Search ..." : (data.length < 3 ? `more ${3-data.length}` : "initializing...")}</Text>
    </View>
  )
}

export default GoSearch