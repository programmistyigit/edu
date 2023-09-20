import { View, Text, FlatList, Modal, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import GroplistComponent from './groupScreenComponent/GroplistComponent'
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import {BlurView} from "expo-blur"
import GroupModalScreenComponent from './groupScreenComponent/GroupModalScreenComponent'
const GroupScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalViewData , setModalViewData] = useState({})
  const gropData = useSelector(({ user_data }) => user_data?.student?.student_classesID);
  const [hideBottomSheet , setHideBottomSheet]=useState(true)
  const BottomSheetRef = useRef(null)

  console.log(hideBottomSheet);
  const closeModal = () => {
    if(!hideBottomSheet){
      setHideBottomSheet(true)
      return BottomSheetRef.current?.close()
    }
    setShowModal(false)
  }

  const groupListOnPress = (data) => {setShowModal(true) ; setModalViewData(data)} 
  const groupComponentData = useMemo(() => !gropData ? null : (
    <FlatList
      data={gropData}
      horizontal={false}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <View style={{ width: "100%", height: 2, backgroundColor: "black" }}></View>}
      renderItem={({ item }) => <GroplistComponent {...item} onClick={() => groupListOnPress(item)} />}
    />
  ), [gropData])
  const GroplistModalData = useMemo(() => {
    return <GroupModalScreenComponent setHideBottomSheet={setHideBottomSheet} hideBottomSheet={hideBottomSheet} BottomSheetRef={BottomSheetRef} data={modalViewData} onPress={closeModal} />
  } , [modalViewData , BottomSheetRef , hideBottomSheet])
  return (
    <View>
      {groupComponentData}
      <Modal visible={showModal} transparent={true} onRequestClose={closeModal} style={{ flex: 1 }} animationType={"slide"} hardwareAccelerated={false}>
        <View style={{ flex: 1 }} >
          <BlurView
            intensity={50} // Adjust the intensity as desired
            tint="dark" // Use "default" for a standard blur effect
            style={StyleSheet.absoluteFill}
          />
          <BottomSheetModalProvider>
            {GroplistModalData}
          </BottomSheetModalProvider>
        </View>
      </Modal>
    </View>
  )
}

export default GroupScreen