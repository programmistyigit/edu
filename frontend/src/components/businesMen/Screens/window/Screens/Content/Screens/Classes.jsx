import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import RowContent from './ClassesComponents/RowContent'
import Filter from './ClassesComponents/Filter'
function Classes() {
  const thema = useSelector(e => e.thema)
  const AllClasses = useSelector(e => e.classes)
  const statusClass = useSelector(e=>e.statusClass)
  const AllClassSpace = AllClasses.reduce((spaceList , currentClass)=> (spaceList.includes(currentClass.groupSpase) ? spaceList : [...spaceList , currentClass.groupSpase]), [])
  
  const [filterOptions , setFilteroptions] = useState({})
  const [classesData , setClassesData] = useState([])
  
  useEffect(()=>{
      if(!filterOptions.status && !filterOptions.space) return setClassesData(AllClasses)

      setClassesData(AllClasses.filter(cl=> cl.status.text === (!filterOptions.status ? cl.status.text : filterOptions.status) && cl.groupSpase === (!filterOptions.space ? cl.groupSpase : filterOptions.space)))
  } , [filterOptions , AllClasses])
  
  const AllRowComponents = useMemo(()=> classesData.map(cl=> <RowContent key={cl.id} {...cl} />) , [classesData])

  const handleFilter = (name , value)=>{
    if (value === "clear") return setFilteroptions({})
    setFilteroptions(prevState => ({...prevState , [name]:value}))
  }

  return (
    <div className='vh-100 pb-5'>
      <div className='p-4 d-flex flex-column vh-100 pb-5 '>
        <div className='p-3 d-flex'>
          <div className=' d-flex flex-column gap-2' style={{flex:1}}>
            <h3 className={`text-${thema.text}`}>Classes</h3>
            <span className='px-3'>All class : {AllClasses.length}</span>
          </div>
        </div>
        
        {/* Filters */}
        <Filter data={AllClassSpace} filterOptions={filterOptions} handleFilter={handleFilter} status={statusClass}/>
        {/* card class */}
        <div className="row overflow-auto vh-50 scroll">
          {AllRowComponents}
        </div>
      </div>
    </div>
  )
}

export default Classes