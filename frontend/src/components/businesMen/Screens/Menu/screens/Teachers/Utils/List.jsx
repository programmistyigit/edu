import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function List({avatar , status, name , firstName , id}) {
    const fulName = name + " " + firstName
    const thema = useSelector(e=>e.thema)
    return (
        <Link to={`/teacher/${id}`} style={{textDecoration:"none"}}>
            <div className='d-flex align-items-center px-2 p-1 mt-2 linkLink' id="buttonMenu" style={{gap:12}}>
                <div style={{background:`url(${avatar})` , backgroundSize:"cover", width:40 , height:40 , borderRadius:"50%"}} className='d-flex justify-content-end align-items-end insertShadow'>
                    <span className={`p-1 ${status === "online" ? "bg-success":"bg-secondary"} border border-light  rounded-circle`}></span>
                </div>
                <span style={{color:thema.text === "light"?"#fff":"#555"}}>{fulName.length > 14 ? fulName.slice(0 , 14)+"..." : fulName }</span>
            </div>
        </Link>
    )
}

export default List