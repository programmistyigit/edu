import React from 'react'

function AvatarStudent({avatar , status}) {
    return (
        <div style={{ background: `url(${avatar})`, backgroundSize: "cover", width: 40, height: 40, borderRadius: "50%" }} className='d-flex justify-content-end align-items-end insertShadow'>
            <span className={`p-1 ${status === "online" ? "bg-success" : "bg-secondary"} border border-light  rounded-circle`}></span>
        </div>
    )
}

export default AvatarStudent