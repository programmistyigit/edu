import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const Teacher = ({ myId, data, indicator , filter}) => {
    console.log(data);
    if (!data || data?.length == 0) {
        return (
            <>
                {
                    filter
                        ? (
                            <View style={{ paddingVertical: 30, alignItems: "center" }}>
                                <Text style={{ color: "white" }}>Teacher not found </Text>
                            </View>
                        )
                        : null
                }
            </>
        )
    };
    const component = useMemo(() => {
        return (
            <View style={{ paddingVertical: 10, gap: 5 }}>
                {
                    data.map((item) => {
                        console.log(item.teacher_follow_businesmen , "gkjghjkfghjkfghjkjhfjkhfgvh");
                        return (
                            <TouchableOpacity key={item._id} style={{ paddingHorizontal: 10, flexDirection: "row", height: 70, alignItems: "center", gap: 10, backgroundColor: "#333", color: "white" }}>
                                <View style={{ width: 60, height: 60, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                    <Image source={{ uri: item.teacher_avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                    <View style={{ width: 13, aspectRatio: 1, backgroundColor: item.teacher_status == "online" ? "#00db0b" : "#505050", borderRadius: 10, position: "absolute" }}></View>
                                </View>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    {indicator && <FontAwesome5 name="chalkboard-teacher" size={18} color="white" />}
                                    <Text style={{ color: "white" }}>{item.teacher_name.charAt(0).toUpperCase()}{item.teacher_name.slice(1).toLowerCase()} {item.teacher_firstName.charAt(0).toUpperCase()}{item.teacher_firstName.slice(1).toLowerCase()} </Text>
                                    {
                                        item.gender && (
                                            item.gender == "female" 
                                                ? <Ionicons name="md-female-outline" size={18} color="pink" /> 
                                                : <Ionicons name="md-male" size={18} color="#00c5db" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }, [data])
    return (
        <View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: "white" }}>Teachers</Text>
            </View>

            {component}
        </View>
    )
}

export default Teacher