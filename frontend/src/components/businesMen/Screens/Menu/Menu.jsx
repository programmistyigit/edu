import React, { useMemo, useState } from 'react'
import MainBar from './bar/MainBar'
import { FcHome, FcReadingEbook, FcGraduationCap , FcEditImage  } from "react-icons/fc"
import MainMenu from './screens/MainMenu'
import TeacherList from './screens/Teachers/TeacherList'

function Menu() {
  const [menudata] = useState([
    {
        name:"MAIN MENU",
        data:[
            { name: "Home", Icon: FcHome , link:"/"},
            { name: "Students", Icon: FcReadingEbook , link:"/students" },
            { name: "Classes", Icon: FcGraduationCap , link:"/classes"},
        ]
    },
    {
        name:"ADMINISTRATION",
        data:[
            {name:"Tashqi korinish" , Icon:FcEditImage , link:"/appearance"},
        ]
    }
])

const menuComponents = useMemo(()=> menudata.map(e=> <MainMenu key={e.name} {...e} />) , [menudata])

  return (
    <div className='vh-100'>
        <MainBar />
        <div style={{height:"90%" , overflow:"auto"}} className=''>
            <div className="w-100 px-2 p-2">
                    {menuComponents}
            </div>
            <TeacherList />
        </div>
    </div>
  )
}

export default Menu