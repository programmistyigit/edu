import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Student from '../../../../UsersViewComponents/Student'
import { useSelector } from 'react-redux'
import Businesmen from '../../../../UsersViewComponents/Businesmen'

const ResultComponent = ({ data }) => {
    const whoami = useSelector(e=>e.whoami)
    
    return (
    <View style={{ flex: 1 }}>
        <ScrollView se horizontal={false}  >
            <Student myId={whoami._id} key={1} indicator={true} data={data.Students} />
            <Businesmen data={data.BusinessMen} indicator={true} />
        </ScrollView>
    </View>
  )
}

export default ResultComponent