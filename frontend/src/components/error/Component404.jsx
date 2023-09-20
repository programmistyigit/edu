import React from 'react'
import { useSelector } from 'react-redux'

function Component404() {

    const thema = useSelector(e=>e.thema)

    return (
    <div className='w-100 h-100 d-flex flex-column'>
        <div className='w-100 text-center p-5'>
            <h1 style={{color:thema.text === "light"?"#fff":"#555"}}>404 Page Not Found</h1>
        </div>
        <img width={"100%"} height={900}  src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' alt=''/>
    </div>
  )
}

export default Component404