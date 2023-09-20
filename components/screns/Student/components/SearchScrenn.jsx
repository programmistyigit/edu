import { View, Text, FlatList, TextInput } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import StudentSearchContext from '../../../../contexts/search/student'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import server from '../../../../helpers/connection/server'
const filterListData = [
  {label : "All" , value : false},
  {label : "Teachers" , value : "teacher"},
  {label : "Users" , value : "student"},
  {label : "training center" , value : "businesmen"},
  {label : "library" , value : "library"}
]
const SearchScrenn = () => {
  const [searchText , setSearchText] = useState("")
  const [searchResult , setSearchResult] = useState([])
  const [state , setState] = useState([])
  const navigator = useNavigation()
  const {BottomSheetRef} = useContext(StudentSearchContext)
  const snapPoints = useMemo(() => ['25%', '50%' , "75%"], []);
  const toogleSearchParams = (value) => value ? (setState(prevState => prevState.includes(value) ? prevState.filter(e=>e != value) : [...prevState , value])) : setState([])
  console.log(searchResult);
  useEffect(() => {
    if(searchText == "") return ;
    const goSearch = async () => {
      const data = await server.overSearch(searchText)
      return data
    }
    goSearch()
      .then((data) => setSearchResult(data))
      .catch((error) => {console.log(error);}) 
  } , [searchText])

  const onChangeText = (data) => setSearchText(data)

  return (
    <View style={{flex : 1, paddingVertical: 20}}>
      <View style={{flexDirection : "row" , paddingHorizontal: 20 , height:70 , gap: 10 , alignItems: "center"}}>
        <View onTouchEnd={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={30} color="red" />
        </View>
        <View style={{flex: 1}}>
          <TextInput placeholder='Search...' style={{ color : "white" , borderBottomColor:"red" , borderWidth: 1 , flex: 0.5 ,}} onChangeText={onChangeText} />
        </View>
        <View>
          <Ionicons name="search-outline" size={24} color="red" />
        </View>
      </View>
      <FlatList
        data={filterListData}
        contentContainerStyle={{ gap : 10 }}
        keyExtractor={({label}) => label}
        horizontal={true}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={ { paddingHorizontal : 10 , paddingVertical : 5 , backgroundColor : item.label == "All" ? (state.length == 0 ? "#808080" : "#40403f") : (state.includes(item.value) ? "#808080" : "#40403f") , borderRadius : 10 } } onPress={() => toogleSearchParams(item.value)} >
              <Text style={{ color : "white" }}>{item.label}</Text>
            </TouchableOpacity>
          )
        }}
      />
      <BottomSheetModal
        index={1}
        snapPoints={snapPoints}
        ref={BottomSheetRef}
      />
    </View>
  )
}

export default SearchScrenn