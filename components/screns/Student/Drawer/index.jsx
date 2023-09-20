import { ImageBackground, Text, View } from "react-native"
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { useContext } from "react";
import Context from "../../../../contexts/Contex";
import ViewComponent from "./components/ViewComponent";
import { Octicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useToast } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import StudentSearchContext from "../../../../contexts/search/student";

const user_control_Panel_list = [
    { text: "Notification" , Icon : <Ionicons name="notifications" size={24} color="#828088" />},
    { text: "Events" , Icon : <MaterialIcons name="event" size={24} color="#828088" />},
    { text: "Subscriptions" , Icon : <MaterialIcons name="subscriptions" size={24} color="#828088" />},
    { text: "Payment" , Icon : <MaterialIcons name="payment" size={24} color="#828088" />},
    { text: "Settings" , Icon : <AntDesign name="setting" size={24} color="#828088" />},
    { text: "Target" , Icon : <MaterialCommunityIcons name="target" size={24} color="#828088" />},
    { text: "Share" , Icon :<AntDesign name="sharealt" size={24} color="#828088" />}
]
export default function () {
    const user_data = useSelector(e => e.user_data)
    const { logOut } = useContext(Context)
    const tost = useToast()

    const setIdToClipboard = async () => {
        try {
            await Clipboard.setStringAsync(user_data.student._id);
            tost.show({
                description: "id copy to clipboard",
                placement: 'top',
                status: "success",
                duration: 2000,
                isClosable: false,
                style: { backgroundColor: "black" }
            })
        } catch (error) {
            console.log('Error copying text to clipboard:', error);
        }
    };
    const { bottomShetRef } = useContext(StudentSearchContext)
    const handleClickViewComponent = () => {
        bottomShetRef.current.present()
    }

    return (
        <View style={{ flex: 1 , backgroundColor:"#1c1d1b"}}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: user_data?.student?.student_avatar }} style={{ width: "100%", height: 200 }}>
                    <View style={{ flex:1 }}></View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-end" , paddingHorizontal:10 , gap:10 , paddingVertical:5}}>
                        <Text style={{color : "red"}}>id: {user_data?.student?._id}</Text>
                        <Octicons name="copy" size={24} color="#808080" onPress={setIdToClipboard} />
                    </View>
                </ImageBackground>

                    <FlatList
                        data={user_control_Panel_list}
                        keyExtractor={(e)=>e.text}
                        contentContainerStyle={{ gap : 10 , paddingVertical :10}}
                        renderItem={({item , index}) => {
                            return <ViewComponent {...item} onPress={handleClickViewComponent} />
                        }}
                    />
            </View>
            <View style={{ paddingVertical: 10 }}>
                <TouchableOpacity onPress={logOut} style={{ alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 20, flexDirection: "row", gap: 20 }}>
                    <MaterialCommunityIcons name="logout" size={24} color="#808080" />
                    <Text style={{ color: "#808080" }}>LogOut</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}