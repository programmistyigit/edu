import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useMemo } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AnimatedTextColor from '../Utils/AnimatedText';

const Student = ({ data, indicator , myId}) => {
    if(!data) return null

    const component = useMemo(() => (
        <View style={{ paddingVertical : 10 , gap: 5}}>
            {
            data.map((item) =>{
                return(
                    <View key={item._id} style={{ height: 70, backgroundColor: "#303030", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                        <View style={{ borderRadius: 30, height: 60, width: 60, justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Image source={{ uri: item.student_avatar }} style={styles.avatar} />
                            <View style={[styles.statusIndicator, { backgroundColor: item.student_status === "online" ? "#00db0b" : "#505050", position: "absolute" }]}></View>
                        </View>
                        <View style={styles.studentInfoContainer}>
                            {indicator && (
                                <FontAwesome5 name="user-graduate" size={18} color="white" />
                            )}
                            <Text style={[styles.studentName, { color: "white" }]}>{`${item.student_name.charAt(0).toUpperCase()}${item.student_name.slice(1).toLowerCase()} ${item.student_firstName.charAt(0).toUpperCase()}${item.student_firstName.slice(1).toLowerCase()}`}</Text>                            
                            {
                                item.gender && (
                                    item.gender == "female"
                                        ? <Ionicons name="md-female-outline" size={18} color="pink" />
                                        : <Ionicons name="md-male" size={18} color="#00c5db" />
                                )
                            }
                            {
                                item._id == myId && <AnimatedTextColor text={"you"} />
                            }
                        </View>
                    </View>
                )
            })}
        </View>
    ), [data , indicator])

    return (
        <View>
            {component}
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        width: "100%",
        height: 2,
        backgroundColor: "black",
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    statusIndicator: {
        width: 15,
        aspectRatio: 1,
        borderRadius: 10,
    },
    studentInfoContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap:10
    },
    studentName: {
        // Add dark theme styles here
    },
});

export default Student;