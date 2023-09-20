import React from 'react'
import Navbar from './Screens/Navbar'
import Content from './Screens/Content'

function Window() {
  return (
    <div style={{flex:1}} className='d-flex flex-column'>
       <Navbar />
       <Content />
    </div>
  )
}

export default Window