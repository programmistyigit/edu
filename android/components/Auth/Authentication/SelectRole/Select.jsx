import { StyleSheet, Text, View } from "react-native"

const SelectRole = ({ navigation }) => {

    const handleClick = (role) => navigation.navigate({
        name: "getData",
        params: { role }
    })

    return (
        <View style={style.container}>
            <View>
                <Text style={{ color: "cyan", fontSize: 25 }}>Ro'lingizni tanlang</Text>
            </View>
            <View style={style.box}>
                <View style={style.btn} onTouchEnd={() => handleClick("student")}><Text style={style.text}>O'quvchi</Text></View>
                <View style={style.btn} onTouchEnd={() => handleClick("teacher")}><Text style={style.text}>Murabbiy</Text></View>
                <View style={style.btn} onTouchEnd={() => handleClick("mother")}><Text style={style.text}>Ota-ona</Text></View>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        padding: 20,
        gap: 10
    },
    btn: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderBlockColor: "cyan"
    },
    text: {
        color: "cyan",
    }
})

export default SelectRole