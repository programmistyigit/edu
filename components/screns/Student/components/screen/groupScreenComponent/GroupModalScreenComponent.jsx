import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useMemo } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const GroupModalScreenComponent = ({ onPress, data, BottomSheetRef, setHideBottomSheet , hideBottomSheet}) => {
    const snapPoints = useMemo(() => ["70%"], [])
    const openBottomModal = () => {
        if(!hideBottomSheet) return ; 
        BottomSheetRef.current.present(); 
        setHideBottomSheet(false) 
    }
    const closeBottomModal = () => {
        if(hideBottomSheet) return ;
        BottomSheetRef.current.close() ; 
        setHideBottomSheet(true)
    }
    console.log(BottomSheetRef);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 70, alignItems: "center", flexDirection: "row" }}>
                <BlurView
                    intensity={80} // Adjust the intensity as desired
                    tint={"dark"} // Use "default" for a standard blur effect
                    style={StyleSheet.absoluteFill}
                />
                <View style={{ paddingHorizontal: 20 }}>
                    <Ionicons name="arrow-back" size={30} color="white" onPress={onPress} />
                </View>
                <View style={{ flexDirection: "row", gap: 20, flex: 1 }} onTouchEnd={openBottomModal}>
                    <Image source={{ uri: data.class_avatar }} borderRadius={25} width={50} height={50} />
                    <View style={{ gap : 5}}>
                        <Text style={{ color: "white", fontSize: 18 }}>{data.class_name.split("").map((e, i) => i == 0 ? e.toUpperCase() : e.toLowerCase()).join("")}</Text>
                        <Text style={{ color: "white"}}>a'zo {data.class_studentsId.length} {data.class_status.text == "initializing" ? `kutmoqda ${data.class_follow_studentsId.length}` : null}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
                </View>
            </View>

            <View style={{flex : 1 }} onTouchEnd={closeBottomModal}>

            </View>
            <BottomSheetModal
                handleIndicatorStyle={{ display: "none" }}
                index={0}
                snapPoints={snapPoints}
                ref={BottomSheetRef}
                backgroundComponent={({ style }) => (
                    <BlurView
                    intensity={80} // Adjust the intensity as desired
                    tint={"dark"} // Use "default" for a standard blur effect
                    style={StyleSheet.absoluteFill}
                />
                )}
            >
                
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center", paddingHorizontal: 20 }}>
                    <Image source={{ uri: data.class_avatar }} borderRadius={25} width={50} height={50} />
                    <View>
                        <Text style={{ color: "#fff", fontSize: 18 }}>{data.class_name.split("").map((e, i) => i == 0 ? e.toUpperCase() : e.toLowerCase()).join("")}</Text>
                        <Text style={{ color: "#fff" }}>a'zo {data.class_studentsId.length} {data.class_status.text == "initializing" ? `kutmoqda ${data.class_follow_studentsId.length}` : null}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
            </BottomSheetModal>
        </View>
    )
}

export default GroupModalScreenComponent