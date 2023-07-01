import React, { useMemo, useState } from 'react'
import Card from './cards/Card'

function RowCards() {
    const [cardArr] = useState([
        {id:"1" , name:"O'quchilar soni" , result:60}, 
        {id:"2" , name:"ustozlar vazifasi" , result:90}, 
        {id:"3" , name:"Oquvchilar vazifasi" , result:55}
    ])
    const cardComponent = useMemo(() => cardArr.map(e => {
        return (
            <div key={e.id} className='col-4 p-3 d-flex justify-content-center align-items-center'>
                <Card {...e} />
            </div>
        )
    }), [cardArr])
    return (
        <div className="row">
            {cardComponent}
        </div>
    )
}

export default RowCards