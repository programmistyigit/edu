import React from 'react'
import { useSelector } from 'react-redux'

function Card({name , result}) {
    const diagramValue = 360/100 * result 
    const thema = useSelector(e=>e.thema)
    console.log(diagramValue);
  return (
    <div className={`boxShadow w-100 bg-${thema.bg} p-1`}>
        <footer className={`text-${thema.text} p-2 px-3`} style={{fontSize:14 , opacity:0.5}}>{name}</footer>
        <div className='d-flex p-2 px-3'>
            <div style={{flex:1}}>
                <h4 className={`text-${thema.text}`}>{result}%</h4>
                {result < 60 
                    ? <span className='text-danger' style={{fontSize:12}}>natija qoniqarli emas</span>
                    : result < 80 
                    ? <span className='text-info' style={{fontSize:12}}>natija qoniqarli</span>
                    : <span className='text-success' style={{fontSize:12}}>a'lo darajada</span>
                }
            </div>
            <div>
                <div className='p-4 rounded-circle' style={{background:`conic-gradient(green ${diagramValue}deg , black 0deg)`}}>
                    <footer className='p-2'></footer>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card