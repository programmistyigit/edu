import React from 'react'
import BadgeAvatars from '../AvatarFotherChildren'
import { useSelector } from 'react-redux'
function List({mother , children , bg, givenAnswer , course}) {
    console.log(course);
    const thema = useSelector(e=>e.thema)
    const motherFullName = mother.name + " "+ mother.firstName

  return (
    <div className={`d-flex rounded-3 align-items-center gap-2 bg-${bg} bg-opacity-50`}>
            <div className='d-flex align-items-center gap-3 p-2'>
                <BadgeAvatars mother={mother.avatar} children={children.avatar} />
                <div className='d-flex flex-column ' style={{flex:1}}>
                    <span className={`text-${thema.text}`} style={{fontSize:14}}>{motherFullName.length > 15 ?motherFullName.slice(0 , 15) + "..." : motherFullName }</span>
                    <span className={`text-${thema.text}`} style={{fontSize:12}}>{children.name} {children.firstName}</span>
                </div>
            </div>
            <div className='d-flex flex-column align-items-end'>
                <span className='p-1'>{givenAnswer}/10</span>
                <span className='px-2' style={{fontSize:12}}>{course}</span>
            </div>
        </div>
  )
}

export default List