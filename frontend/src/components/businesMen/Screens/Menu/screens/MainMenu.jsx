import React, { useMemo } from 'react'
import ButtonMenu from './buttons/Button'
import { useSelector } from 'react-redux'
function MainMenu({data , name }) {
 
  const thema = useSelector(e=>e.thema)

  const groupMenu = useMemo(() => data.map((e) => <ButtonMenu key={e.name} {...e} /> ), [data])
  return (
      <div className='d-flex flex-column mt-2' style={{gap:10}}>
        <span style={{ color: thema.text === "light"?"#fff":"#555", fontSize: 12 }}>{name}</span>
        <div className='d-flex flex-column' style={{gap:10}}>
          {groupMenu}
        </div>
      </div>
  )
}

export default MainMenu