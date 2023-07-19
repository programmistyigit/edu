import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {IoClose} from "react-icons/io5"
import ClassesInfo from './UserInfo/ClassesInfo';
import ValidateStudent from '../../../../../../validation/studentInfo';
import Context from '../../../../../../contexts/context';
import { replace } from '../../../../../../stores/studentInfo';
function UserInfo() {
    const {yoshi} = useContext(Context)
    const distpatch = useDispatch()
    const thema = useSelector(e => e.thema)
    const studentInfo = useSelector(e=>e.studentInfo)
    const {error} = ValidateStudent.validate(studentInfo)
    console.log(error);

    if(error) return 
    const currentRank = ()=>{
        const Allrank = studentInfo.rank.reduce((e, f)=> e + parseInt(f.data) , 0)
        const currentDayRank = studentInfo.rank[studentInfo.rank.length -1].data
        return {Allrank , currentRank:currentDayRank> 0 ? `+${currentDayRank}`:currentDayRank}
    }
    const classDataComponent = studentInfo.classData.map(e=> <ClassesInfo {...e} key={e.id} /> )

    const handleClose = ()=> distpatch(replace({}))

    return (
        <div className='h-100 d-flex flex-column' style={{ width: 250 }}>
            <div className='h-25 w-100'>
                <div className='w-100 h-50 d-flex justify-content-end' style={{ background: "linear-gradient(60deg ,#F2E8EC , #E5EEFD)" }}>
                    <div className='p-2 '>
                        <IoClose size={25} className='boxShadow cursor-pointer' onClick={handleClose} color='red'/>
                    </div>
                </div>
                <div className='w-100 h-50 d-flex flex-column align-items-center'>
                    <img src={studentInfo.avatar} className='rounded-circle border border-2 boxShadow' style={{ marginTop: "-50px" }} width={100} height={100} alt="" />
                    <div className='d-flex flex-column align-items-center pt-3'>
                        <span className={`text-${thema.text}`}>{studentInfo.name} {studentInfo.firstName}</span>
                    </div>
                </div>
            </div>

            {/* Basic information */}

            <div className="h-auto w-100 p-3 d-flex flex-column gap-4">
                <div>
                    <h6 className={`text-${thema.text}`}>Basic information</h6>
                    <div className='d-flex flex-column gap-2 pt-3'>
                        <div className="d-flex justify-content-between">
                            <span className={`text-${thema.text} text-opacity-50`}>Tug'ulgan sanasi</span>
                            <span className={`text-${thema.text}`}>{studentInfo.birthDay}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className={`text-${thema.text} text-opacity-50`}>Yoshi</span>
                            <span className={`text-${thema.text}`}>{yoshi(studentInfo.birthDay)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className={`text-${thema.text} text-opacity-50`}>Bugungi o'sish</span>
                            <span className={`text-${thema.text}`}>{Math.floor(currentRank().currentRank)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className={`text-${thema.text} text-opacity-50`}>Umumiy o'sish</span>
                            <span className={`text-${thema.text}`}>{currentRank().Allrank}</span>
                        </div>
                    </div>
                </div>
                {/* loop  */}
                <div>
                    <h6 className={`text-${thema.text}`}>Contact</h6>
                    <div className='d-flex flex-column gap-2 pt-3'>
                        <div className="d-flex justify-content-between">
                            <span className={`text-${thema.text} text-opacity-50`}>Phone number</span>
                            <span className={`text-${thema.text}`}>{studentInfo.phoneNumber}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className={`text-${thema.text} text-opacity-50`}>Email</span>
                            <span className={`text-${thema.text}`} style={{fontSize:studentInfo.email.length > 14 ? 12 : 18}}>{studentInfo.email}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className={`text-${thema.text} text-opacity-50`}>Joylashuv</span>
                            <span className={`text-${thema.text}`}>{studentInfo.country.tuman} {studentInfo.country.mahalla}</span>
                        </div>
                    </div>
                </div>

                {/* class include users */}
                
            <div className='' style={{ flex: 1 , height:300}}>
                <div className="overflow-auto d-flex flex-column gap-3  w-100 scroll p-2 " style={{height:250}}>
                    {classDataComponent}
                </div>
            </div>
                

            </div>

            
        </div>
    )
}

export default UserInfo