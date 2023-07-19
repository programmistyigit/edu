import { CPopover } from '@coreui/react'
import React from 'react'
import { FcSettings } from "react-icons/fc"
import {IoMdNotificationsOutline} from "react-icons/io"
import { useSelector } from 'react-redux'
import ComponentsSentings from './Settings/ComponentsSentings'
function Navbar() {
    const thema = useSelector(e=>e.thema)
    const notification = useSelector(e=>e.notification)
  return (
    <div className='w-100 p-2 d-flex align-items-center' >
        <div className='px-5' style={{flex:1}}>
            
        </div>
        
        <div className='px-5 d-flex align-items-center'>
            {/* icon */}
            <div className='d-flex' style={{gap:15}}>
                <CPopover content={<ComponentsSentings />} placement='bottom' className={`bg-${thema.bg}`}>
                <div  className='p-2 rounded-circle  bg-opacity-10 d-flex align-items-center justify-content-center insertShadow' style={{width:40 , height:40 }}>
                    <FcSettings size={25} />
                </div>
            </CPopover>

                <div  className='p-2 rounded-circle  bg-opacity-10 d-flex align-items-center justify-content-center insertShadow' style={{width:40 , height:40 }}>
                    <div style={{width:40 , height:40 }} className='d-flex align-items-center justify-content-center'>
                        <IoMdNotificationsOutline size={25} color={thema.text === "dark"?"black":"white"}/>
                    </div>
                    <div style={{position:"absolute" , zIndex:100 , width:45 , height:45 , marginTop:"-10px"}} className='d-flex align-items-start justify-content-end'>
                        {notification && <span className='rounded-circle bg-danger w-50 h-50 d-flex align-items-center justify-content-center'>
                            {notification.length}
                        </span>}
                    </div>
                </div>
            </div>
            <div className='px-5 d-flex' style={{gap:10}}>
                <img src="/jonuik.jpg" width={40} height={40} className='rounded-circle insertShadow' alt="" />
                <div className='d-flex flex-column' style={{gap:6}}>
                    <span style={{color:thema.text==="light"?"#fff":"#555" , fontWeight:700 , fontSize:14}}>Anna Miranova</span>
                    <span style={{color:thema.text==="light"?"#fff":"#555" , fontSize:10}}>Admin</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar