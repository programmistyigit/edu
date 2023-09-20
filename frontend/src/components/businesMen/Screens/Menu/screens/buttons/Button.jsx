import React from 'react'
import "./button.css"
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"

function Button({Icon , name , link}) {
  const thema = useSelector(e=>e.thema)
  return (
    <Link to={link}  preventScrollReset={true} className='linkLink '>
      <div className='w-100 p-1 px-2 d-flex align-items-center' id="buttonMenu" style={{borderRadius:7 , gap:12}}>
          {/* icon */}
          <Icon  size={20} />
          <span style={{color:thema.text === "light"?"#fff":"#555"}}>{name}</span>
      </div>
    </Link>
  )
}

export default Button