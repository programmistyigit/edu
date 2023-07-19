import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TbInfoOctagon } from "react-icons/tb"
import { FcOk } from "react-icons/fc"
import { CPopover } from '@coreui/react'
import PopOverContent from './TeachersComponent/PopOverContent'
import WeeklyTable from './TeachersComponent/WeeklyTableComponents/WeeklyTable'


function Tichers() {
  const { id } = useParams()
  const thema = useSelector(e => e.thema)
  const teachers = useSelector(e => e.teacher)
  const currentTeacher = teachers.find(t => t.id === id)
  const allClass = useSelector(e => e.classes)
  const teacherClasses = allClass.filter(gr => gr.BigTeacherId === id)

  console.log(currentTeacher, teacherClasses);
  return (
    <div className='p-2 overflow-auto'>
      <div className='d-flex'>
        <div style={{ flex: 1 }}>
          <div className='p-3 d-flex gap-3 align-items-center w-25 boxShadow' >
            <Avatar src={currentTeacher.avatar} className={`border border-secondary border-opacity-50`} style={{ width: 70, height: 70 }} />
            <span className={`fs-4 text-${thema.text}`} style={{ fontFamily: "sans-serif" }}>{currentTeacher.name} {currentTeacher.firstName}</span>
            <div className='d-flex justify-content-center' style={{ flex: 1 }}>
              {
                currentTeacher.complaints.length > 0
                  ? (
                      <CPopover
                      visible={false}
                      trigger={"focus"}
                        content={<PopOverContent data={currentTeacher.complaints} />}
                        placement="bottom"
                      >
                        <button style={{ border: "none", outline: "none", background: "transparent" }}><TbInfoOctagon size={25} color='orange' /></button>
                      </CPopover>
                    )
                  : <FcOk size={25} />
                }
            </div>
          </div>
        </div>
        <div >
        </div>
      </div>
      <WeeklyTable />
    </div>
  )
}

export default Tichers