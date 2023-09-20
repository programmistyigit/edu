import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import List from './PopAvatarComponents/List';

function PopOverContent({data}) {
    const mothers= useSelector(e=>e.mother)
    const students = useSelector(e=>e.students)
    const allCours = useSelector(e=>e.classes)
    const OverLIstComponent = useMemo(()=> data.map(e=> <List course={allCours.find(ee=>ee.id === "178a1bf9-b5b9-4020-87c1-304704578f18").name} key={e.id}  givenAnswer={e.givenAnswer} mother={mothers.find(dd=> dd.id === e.fatherId)} bg={e.status} children={students.find(ee=> ee.id === e.studentId)} />) , [allCours , students , mothers , data])

  return (
    <div className='scroll d-flex flex-column p-1 gap-2' style={{ maxHeight:300 , overflow:"auto"}}>
        {OverLIstComponent}
    </div>
  )
}

export default PopOverContent