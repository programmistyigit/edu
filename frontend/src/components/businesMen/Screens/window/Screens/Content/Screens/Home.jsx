import React from 'react'
import { useSelector } from 'react-redux'
import RowCards from './HomeComponents/RowCards'
import LineDiagramma from './HomeComponents/Diagram/LineDiagramma'
import Rowcards from './HomeComponents/RowCards2/Rowcards'

function Home() {
  const thema = useSelector(e=>e.thema)
  return (
    <div className='p-4 d-flex flex-column overflow-auto scroll vh-100'>
      <h2 className={`text-${thema.text}`} style={{fontFamily:"sans-serif" , fontWeight:700}}>Reja</h2>
      <RowCards />
      <div className='p-1'>
        <LineDiagramma />
      </div>
      <Rowcards />
    </div>
  )
}

export default Home