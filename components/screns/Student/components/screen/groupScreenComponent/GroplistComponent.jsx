import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const GroplistComponent = ({ class_name, class_avatar, class_BusinesmenID , class_groupSpase , onClick}) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ height: 70, backgroundColor: "#303030", flexDirection: "row", alignItems: "center", paddingHorizontal: 20 , gap : 20 }}>
      <View style={{ width: 50, height: 50, borderRadius: 25, overflow: "hidden" }}>
        <Image source={{ uri: class_avatar }} style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{}}>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontFamily: "sans-serif" }}>{class_name.split("").map((e , i) => i == 0 ? e.toUpperCase() : e.toLowerCase()).join("")}</Text>
          <View style={{alignItems:"flex-end"}}>
            <Text style={{ color: "#FFFFFF" }}>powered by {class_BusinesmenID.businesmen_companyName}</Text>
          </View>
        </View>
        <View>
          <Text style={{ color: "#FFFFFF" }}>{class_groupSpase.cours_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroplistComponent;