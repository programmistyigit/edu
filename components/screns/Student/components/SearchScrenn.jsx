import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import server from '../../../../helpers/connection/server';
import { BlurView } from 'expo-blur';
import NotFound from './searchComponents/NotFound';
import GoSearch from './searchComponents/GoSearch';
import ResultComponent from './searchComponents/ResultComponent';

const filterListData = [
  { label: "All", value: false },
  { label: "Teachers", value: "teacher" },
  { label: "Users", value: "student" },
  { label: "Training center", value: "businessmen" },
  { label: "Library", value: "library" }
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [state, setState] = useState(false);
  const [totalLength, setTotalLength] = useState(0)

  const navigator = useNavigation();
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const BottomSheetRef = useRef(null);
  console.log(searchResult);
  console.log(totalLength);
  const toogleSearchParams = useCallback((value) => {
    if (value) {
      setState(value);
    } else {
      setState(false);
    }
  }, []);



  const goSearch = useCallback(async () => {
    try {
      const data = await server.overSearch(searchText);
      let allLength = 0
      for (const key in data) {
        if (Array.isArray(data[key])) {
          allLength += data[key].length
        }
      }
      setTotalLength(allLength)
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText === '' || searchText.length < 3){ setSearchResult({}) ; setTotalLength(0) ; return ;}
    goSearch();
  }, [searchText, goSearch]);

  const onChangeText = (data) => setSearchText(data);
  const openBottomModal = () => {
    BottomSheetRef.current?.present();
  };


  const resultSearchViewComponent = useMemo(() => {
    return (
      <View style={{ flex: 1 , paddingVertical:5 }}>
        {
          totalLength == 0
            ? (
              Object.keys(searchResult).length == 0
                ? <GoSearch data={searchText} />
                : <NotFound />
            )
            : <ResultComponent filter={state} data={searchResult} />
        }
      </View>
    )
  }, [searchText, totalLength, searchResult])


  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <View style={{ flexDirection: "row", paddingHorizontal: 20, height: 70, gap: 10, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={30} color="red" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TextInput placeholder='Search...' style={{ color: "white", borderBottomColor: "red", borderWidth: 1, flex: 0.5 }}  onChangeText={onChangeText} />
        </View>
        <TouchableOpacity onPress={openBottomModal}>
          <Ionicons name="filter" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* simple filter elements */}
      <View>

        <FlatList
          data={filterListData}
          contentContainerStyle={{ gap: 10 , paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ label }) => label}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                backgroundColor: item.value == state ? "#808080" : "#40403f",
                borderRadius: 10
              }}
              onPress={() => toogleSearchParams(item.value)}
            >
              <Text style={{ color: "white" }}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* simple filter elements */}

      {/* result search */}
      {resultSearchViewComponent}
      {/* result search */}


      <BottomSheetModal
        index={1}
        snapPoints={snapPoints}
        ref={BottomSheetRef}
        backgroundComponent={() => (
          <BlurView
            intensity={80} // Adjust the intensity as desired
            tint={"default"} // Use "default" for a standard blur effect
            style={StyleSheet.absoluteFill}
          />
        )}
      ></BottomSheetModal>
    </View>
  );
};

export default SearchScreen;