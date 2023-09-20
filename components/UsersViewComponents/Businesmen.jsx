import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useMemo } from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Businesmen = ({ data, indicator }) => {
    if (!data) return null;
    const component = useMemo(() => {
        return (
            <>
                {data.map((item) => {
                    return (
                        <View style={styles.container}>
                            <View>
                                <Image
                                    source={item.businesmen_avatar ? { uri: item.businesmen_avatar } : require("../../assets/graduantion.jpg")}
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                {indicator && <FontAwesome name="graduation-cap" size={18} color="white" />}
                                <Text style={styles.companyName}>
                                    {item.businesmen_companyName}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </>
        )
    }, [data])
    return (
        <View style={{ paddingVertical: 10 , gap: 5 }}>
            {component}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      height: 70,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal:10,
      backgroundColor: "#303030", // Set the background color to black for the dark theme
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    infoContainer: {
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 15,
    },
    companyName: {
      color: "white", // Set the text color to white for the dark theme
    },
  });

export default Businesmen