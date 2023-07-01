import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FcReading } from "react-icons/fc"
import Filter from './Students/Filter'
import Table from './Students/Table'
import Context from '../../../../../../../contexts/context'
function Students() {
  const { yoshi } = useContext(Context)
  const thema = useSelector(e => e.thema)
  const AllClasses = useSelector(e => e.classes)
  const StudentS = useSelector(e => e.students)
  const [allStudent, SetStudents] = useState([])
  const [filterOptions, setFilterOptions] = useState({ classes: undefined, age: undefined, gender: undefined })
  const handleFilter = (value , name)=>{
    if(name === "clear") return setFilterOptions({ classes: undefined, age: undefined, gender: undefined })
    setFilterOptions(prevState=> ({...prevState , [name]:value}))
    console.log(value , name);
  }
  useEffect(() => {
     if(!filterOptions.age && !filterOptions.classes && !filterOptions.gender) return SetStudents(StudentS.filter(student=> AllClasses.map(e=>e.studentsId).reduce((r , c)=> [...r , ...c] , []).includes(student.id)));
    SetStudents(() => {
      return StudentS.map((ee) => (
          {
            ...ee,
            age: parseInt(yoshi(ee.birthDay)),
            classesName: AllClasses.filter(cc => cc.studentsId.includes(ee.id)).map(cc => cc.name)
          }
        )
      )
        .filter(
          student => (
            parseInt(student.age) === parseInt(filterOptions.age ? filterOptions.age : student.age)
            && student.classesName.includes(filterOptions.classes ? filterOptions.classes :student.classesName[0])
            && student.gender === (filterOptions.gender ? filterOptions.gender : student.gender)
          )
        )
    })
    
  }, [filterOptions, StudentS , yoshi , AllClasses])
  return (
    <div className=' p-4 d-flex flex-column vh-100 overflow-auto  pb-5'>
      <div className='pb-4 d-flex flex-column vh-100 overflow-auto'>
        <div className='p-3 d-flex flex-column gap-3'>
          <div>
            <h2 className={`text-${thema.text}`} >Students</h2>
            <div className={`d-flex gap-2 text-${thema.text}`}>
              <FcReading size={20} />
              Total , {allStudent.length}
            </div>
          </div>
          <Filter filter={handleFilter} filterOptions={filterOptions} />
        </div>
        {/* table */}
        <Table data={allStudent} />
        {/* Pagination */}

      </div>
    </div>
  )
}

export default Students