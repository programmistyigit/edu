import React, { useContext, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Context from '../../../../../../../../contexts/context';
import { FcClearFilters } from 'react-icons/fc';

function Filter({ filter, filterOptions }) {
  const { yoshi } = useContext(Context)
  const thema = useSelector(e => e.thema)
  const classesData = useSelector(e => e.classes)
  const arrClassesName = classesData.map(r => r.name)
  const allStudent = classesData.reduce((arr, currenClasses) => ([...arr, ...currenClasses.students]), [])

  const allStudentBirtYears = allStudent.map(r => yoshi(r.birthDay)).reduce((r, h) => { return r.includes(h) ? r : [...r, h] }, []).sort(function (a, b) { return a - b })

  const allClassComponents = useMemo(() => arrClassesName.map(item => <option className={`text-${thema.text}`} key={item} value={item}>{item}</option>), [arrClassesName, thema.text])
  const allBirthDayComponents = useMemo(() => allStudentBirtYears.map(item => <option className={`text-${thema.text}`} key={item} value={item}>{item}</option>), [allStudentBirtYears, thema.text])







  return (
    <div className='w-100'>
      <div className="w-75 d-flex gap-3">
        <div>
          <select value={filterOptions.classes ? filterOptions.classes : "d1"} onChange={({ target }) => filter(target.value, "classes")} className={`border-0 p-1 bg-${thema.bg} text-${thema.text} px-3 rounded-2 boxShadow filterSelect`}>
            <option className={`text-${thema.text}`} value={"d1"} disabled>classes</option>
            {allClassComponents}
          </select>
        </div>
        <div>
          <select value={!filterOptions.age ? "d1" : filterOptions.age} onChange={({ target }) => filter(target.value, "age")} className={`border-0 p-1 bg-${thema.bg} text-${thema.text} px-3 rounded-2 boxShadow filterSelect`}>
            <option className={`text-${thema.text}`} value={"d1"} disabled>age</option>
            {allBirthDayComponents}
          </select>
        </div>
        <div>
          <select value={!filterOptions.gender ? "d1" : filterOptions.gender} onChange={({ target }) => filter(target.value, "gender")} className={`border-0 p-1 bg-${thema.bg} text-${thema.text} px-3 rounded-2 boxShadow filterSelect`}>
            <option className={`text-${thema.text}`} value={"d1"} disabled>gender</option>
            <option className={`text-${thema.text}`} value={"male"}>male</option>
            <option className={`text-${thema.text}`} value={"female"}>female</option>
          </select>
        </div>
        <div>
          <div onClick={() => filter("", "clear")} className={`border-0 p-1 bg-${thema.bg} text-${thema.text} px-3 rounded-2 boxShadow filterSelect d-flex justify-content-center align-items-center gap-3`}>
            <FcClearFilters size={18} />
            <span>clear filter</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter