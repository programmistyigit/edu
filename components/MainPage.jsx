import React from 'react'
import MotherMainComponent from './screns/Mother'
import StudentMainComponent from './screns/Student'
import TeacherMainComponent from './screns/Teacher'
import { useSelector } from 'react-redux'
const components = { mother : <MotherMainComponent /> , student : <StudentMainComponent /> , teacher : <TeacherMainComponent />}
const MainPage = () => {
    const {role} = useSelector(e=>e.whoami)
    console.log(role);
    return components[role]
}

export default MainPage