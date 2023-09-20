import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DefaultScreen from './screen/DefaultScreen'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Chatscreen from './screen/Chatscreen';
import GroupScreen from './screen/GroupScreen';
import QuizListScreen from './screen/QuizListScreen';
import LibraryScreen from './screen/LibraryScreen';

const TopNavigator = createMaterialTopTabNavigator()

const Main = () => {
  return (
    <TopNavigator.Navigator screenOptions={ { tabBarIndicatorStyle: { backgroundColor: "red" } , tabBarActiveTintColor : "red" , tabBarInactiveTintColor :"#a8a7a7" } } >
      <TopNavigator.Screen 
        name='main' 
        options={
            { 
              tabBarIcon(props) { return <AntDesign name="dashboard" size={20} {...props} /> }, 
              tabBarShowLabel: false 
            }
          } 
        component={DefaultScreen} 
      />

      <TopNavigator.Screen 
        name='second'
        options={
            { 
              tabBarIcon(props) { return <Ionicons name="chatbubbles" size={20} {...props} /> }, 
              tabBarShowLabel: false 
            }
          } 
        component={Chatscreen} 
      />

      <TopNavigator.Screen
        name='first' 
        options={
            { 
              tabBarIcon(props) { return <Entypo name="list" size={20} {...props} /> }, 
              tabBarShowLabel: false 
            }
          } 
        component={GroupScreen} 
      />

      <TopNavigator.Screen 
        name='thred' 
        options={
            { 
              tabBarIcon(props) { return <MaterialCommunityIcons name="list-status" size={20} {...props} /> }, 
              tabBarShowLabel: false 
            }
          } 
        component={QuizListScreen} 
      />

      <TopNavigator.Screen 
        name='fifth' 
        options={
            { 
              tabBarIcon(props) { return <MaterialIcons name="local-library" size={24} {...props} /> }, 
              tabBarShowLabel: false 
            }
          } 
        component={LibraryScreen} 
      />
      
    </TopNavigator.Navigator>
  )
}

export default Main