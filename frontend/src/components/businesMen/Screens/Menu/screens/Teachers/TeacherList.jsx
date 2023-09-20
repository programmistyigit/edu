import React, { useMemo } from 'react'
import List from './Utils/List'
import "./css/teacherList.css"
import {GoDiffAdded} from "react-icons/go"
import { useSelector } from 'react-redux'

function TeacherList() {
    const thema = useSelector(e=>e.thema)
    const TeacherData = useSelector(e=>e.teacher)


    const teacherListComponents = useMemo(()=> TeacherData.map(e=> <List key={e.id} {...e} />) , [TeacherData])
  return (
    <div className='w-100 px-2 p-2 d-flex flex-column' style={{gap:5 , overflow:"auto"}}>
        <span style={{ color: "#d9d9d9", fontSize: 16 }}>TICHERS</span>
        <div className='w-100 px-1' id='teacherList' style={{overflow:"auto" , height:"400px"}}>
            {teacherListComponents}
        </div>
        <div className='w-100 p-2 px-3 d-flex align-items-center linkLink' style={{gap:12}}>
            <GoDiffAdded size={20} color='#6f42c1' />
            <span style={{color:thema.text === "light"?"#fff":"#555"}}>Add a member</span>
        </div>
    </div>
  )
}

export default TeacherList