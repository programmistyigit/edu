import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Change = ({ navigation }) => {
  const setRouter = (role) => {
    navigation.navigate("authentication" , {which : role})
    console.log(role);
  }
  return (
    <View style={style.container}>
      <View style={style.bar}>
        <Text style={style.barText} >Tizimga Kirish</Text>
      </View>
      <View style={style.avftorization}>
        <View style={style.avftorizationView} onTouchEnd={()=> setRouter("login")}><Text style={style.avftorizationViewText}>Login</Text></View>
        <View style={style.avftorizationView} onTouchEnd={()=> setRouter("singUp")}><Text style={style.avftorizationViewText}>SingUp</Text></View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bar: {
    marginVertical: 10
  },
  barText: {
    fontSize: 25,
    color: "cyan"
  },
  avftorization: {
    padding: 10,
    flexDirection: "row",
    gap: 10
  },
  avftorizationView: {
    width: 100,
    paddingVertical: 10,
    backgroundColor: "tarnsparent",
    alignItems: "center",
    borderRadius: 10,
    borderWidth:2,
    borderBlockColor:"cyan"
  },
  avftorizationViewText:{
    color:"cyan"
  }

})

export default Change

