import React from 'react'
import Menu from './Screens/Menu/Menu'
import Window from './Screens/window/Window'
import { useSelector } from 'react-redux'

function Admin() {
  const thema = useSelector((e)=>e.thema)
  return (
    <div className={`d-flex bg-${thema.bg} bg-opacity-90`}>
      <Menu />
      <Window />
    </div>
  )
}

export default Admin