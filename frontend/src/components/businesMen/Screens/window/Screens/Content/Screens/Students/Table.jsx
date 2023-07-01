import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash"
import { HiSelector } from "react-icons/hi"
import TableList from './Table/TableList'
import { replace } from '../../../../../../../../stores/studentInfo'
function Table({ data }) {
    const thema = useSelector(e => e.thema)
    const AllStudent = useSelector(e => e.students)
    const AllTeacher = useSelector(e => e.teacher)
    const allStudentLengthToStringLenght = AllStudent.length.toString().length
    const dispatch = useDispatch()
    const allClasses = useSelector(e => e.classes)
    const setInfoStudent = useCallback((e) => {
        const student = _.pick(AllStudent.find((x) => x.id === e.id) , ["name" , "id" , "gender", "firstName" , "email" , "birthDay" , "phoneNumber" , "avatar" , "country" , "rank" , "classesData"]);
        const classData = allClasses
            .filter((d) => d.studentsId
                .includes(e.id))
                .map(cl => ({
                    ...cl,
                    ticher: _.pick(AllTeacher.find((ttt)=>{
                        return ttt.id === cl.BigTeacherId
                    }) , ["name" , "firstName" , "avatar"]),
                    classProgress: parseInt(parseInt(cl.theDayAfterTheStart) / parseInt(cl.durationDays) * 100),
                    students: cl.students.map(vv => _.pick(vv, ["id", "firstName", "name", "avatar"]))
                }))

        dispatch(
            replace(
                {
                    ...student,
                    classData: classData.map(cc => _.pick(cc, ["classProgress", "name", "groupSpase", "id", "students", "ticher"]))
                }
            )
        );
    }, [AllStudent, allClasses, dispatch, AllTeacher]);

    const listComponents = useMemo(() => data.map(e => ({ ...e, fullname() { return this.name + " " + this.firstName } })).map((e, i) => <TableList key={e.id} onClick={() => setInfoStudent(e)} allClass={allClasses.filter(ee=>ee.studentsId.includes(e.id)).map(ee=>ee.name)} AllReyting={e.rank.reduce((rr , currentR)=> rr+ parseInt(currentR.data) , 0)}  allStudentLengthToStringLenght={allStudentLengthToStringLenght} current={i} student={e} />), [ data ,allStudentLengthToStringLenght, setInfoStudent , allClasses])
    return (
        <div className={`rounded-3 d-flex flex-column border border-secondary border-opacity-50 overflow-hidden  `} style={{ flex: 1 }}>
            <div className="w-100 overflow-hidden d-flex border border-secondary border-opacity-50 ">
                <div className={`d-flex align-items-center justify-content-statr p-2`} > <span className={`text-${thema.text}`}> id </span>  <HiSelector size={15} color={thema.text === "light" ? "#fff" : "#555"} />  </div>
                <header className='row  p-2  px-3 ' style={{ flex: 1 }}>
                    <div className={`col-2 d-flex align-items-center justify-content-statr`} > <span className={`text-${thema.text}`}> STUDENT        </span>  <HiSelector size={15} color={thema.text === "light" ? "#fff" : "#555"} />  </div>
                    <div className={`col-2 d-flex align-items-center justify-content-statr`} > <span className={`text-${thema.text}`}> JINSI          </span>  <HiSelector size={15} color={thema.text === "light" ? "#fff" : "#555"} />  </div>
                    <div className={`col-2 d-flex align-items-center justify-content-statr`} > <span className={`text-${thema.text}`}> YOSHI          </span>  <HiSelector size={15} color={thema.text === "light" ? "#fff" : "#555"} />  </div>
                    <div className={`col-2 d-flex align-items-center justify-content-statr`} > <span className={`text-${thema.text}`}> GURUX          </span>  <HiSelector size={15} color={thema.text === "light" ? "#fff" : "#555"} />  </div>
                    <div className={`col-2 d-flex align-items-center justify-content-statr`} > <span className={`text-${thema.text}`}> UMUMIY REYTING </span>  <HiSelector size={15} color={thema.text === "light" ? "#fff" : "#555"} />  </div>
                    <div className={`col-2 d-flex align-items-center justify-content-statr`} > <span className={`text-${thema.text}`}> QO'SHIMCHA     </span>  <HiSelector size={15} color={thema.text === "light" ? "#fff" : "#555"} />  </div>
                </header>
            </div>
            <div style={{ flex: 1 }} className=' overflow-x-hidden scroll'>
                {listComponents}
            </div>
        </div>
    )
}

export default Table
