import React from 'react'
import {Routes , Route} from "react-router-dom"
import Home from './Content/Screens/Home'
import Classes from './Content/Screens/Classes'
import Students from './Content/Screens/Students'
import TashqiKorinish from './Content/Screens/TashqiKorinish'
import Tichers from './Content/Screens/Tichers'
import Component404 from '../../../../error/Component404'
import { useSelector } from 'react-redux'
import UserInfo from './Content/UserInfo'

function Content() {
  const thema = useSelector(e=>e.thema)
  return (
    <div className={`w-100 d-flex bg-${thema.bg === "light"?"light":"dark"}`} style={{flex:1}}>
        <div style={{flex:1 , height:"100%"}} className='overflow-auto diagramm '>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/classes' element={<Classes/>} />
                <Route path='/students' element={<Students/>} />
                <Route path='/appearance' element={<TashqiKorinish/>} />
                <Route path='/teacher/:id' element={<Tichers/>} />
                <Route path='*' element={<Component404 />} />
            </Routes>
        </div>
       <UserInfo />
    </div>
  )
}

export default Content