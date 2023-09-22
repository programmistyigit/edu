import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Student from '../../../../UsersViewComponents/Student'
import { useSelector } from 'react-redux'
import Businesmen from '../../../../UsersViewComponents/Businesmen'
import Teacher from '../../../../UsersViewComponents/Teacher'
import { useMemo } from 'react'

const ResultComponent = ({ data, filter }) => {
    const whoami = useSelector(e => e.whoami)
    const StudentComponent = useMemo(()=> <Student key={1} filter={filter} myId={whoami._id} indicator={true} data={data.Students} /> ,[whoami , data , filter])
    const TeacherComponent = useMemo(() => <Teacher filter={filter} key={3} data={data.Teachers} indicator={true} /> ,[filter , data])
    const BusinesmenComponent = useMemo(() => <Businesmen key={2} filter={filter} data={data.BusinessMen} indicator={true} /> , [filter , data])
    let component = null
    if (filter) {
        switch (filter) {
            case "student": component = StudentComponent ; break;
            case "teacher": component = TeacherComponent ; break;
            case "businessmen": component = BusinesmenComponent ; break;
            case "library": null; break
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView horizontal={false}  >
                {
                    filter
                        ? component
                        : [StudentComponent , TeacherComponent , BusinesmenComponent]
                }
            </ScrollView>
        </View>
    )
}
export default ResultComponent