import { useSelector } from 'react-redux'
import { FcSms, FcPhone, FcEmptyTrash } from "react-icons/fc"
import AvatarStudent from './AvatarStudent'

function TableList({ student , current ,allClass , allStudentLengthToStringLenght, AllReyting  , onClick}) {
    const yoshi = (target) => {
        const [yil, oy, kun] = target.split(".")
        if (!yil || !oy || !kun) return "hh.mm.yy"
        const date = new Date()
        const currentYears = date.getFullYear()
        const currentMonth = date.getMonth()
        const currentDay = date.getDate()
        console.log(currentYears, currentMonth, currentDay);

        let yosh = parseInt(currentYears) - parseInt(yil)

        if (currentMonth < parseInt(oy)) return --yosh
        if (currentMonth === parseInt(oy)) {
            if (currentDay >= parseInt(kun)) return ++yosh
            return yosh
        }
        return yosh
    }

 

    const thema = useSelector(e => e.thema)
    return (
        <div className="w-100 boxShadow d-flex  border border-secondary border-opacity-10" role='button'>
            <div className={`text-${thema.text} p-2 px-3`}>
                {Array(allStudentLengthToStringLenght - (current +1).toString().length).fill(0).join("") }{current +1}
            </div>
            <div className='row p-1 ' style={{flex:1}}>
                <div onClick={onClick} className="col-2 d-flex gap-2 p-05 align-items-center justify-content-start">
                    <AvatarStudent avatar={student.avatar} status={student.status}/>
                    <span className={`text-${thema.text}`}>{student.fullname()}</span>
                </div>
                <div onClick={onClick} className="col-2 d-flex align-items-center justify-content-start px-4">
                    <span className={`text-${thema.text}`}>{student.gender}</span>
                </div>
                <div onClick={onClick} className="col-2 d-flex align-items-center justify-content-start px-4">
                    <span className={`text-${thema.text}`}>{yoshi(student.birthDay)}</span>
                </div>
                <div onClick={onClick} className="col-2 d-flex align-items-center justify-content-start">
                    <span className={`text-${thema.text}`} style={{fontSize:12}}>{allClass.join(" ")}</span>
                </div>
                <div onClick={onClick} className="col-2 d-flex align-items-center justify-content-start">
                    <span className={`text-${thema.text}`}>{AllReyting}</span>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-start">
                    <div className='d-flex gap-4'>
                        <FcSms className='scaleBtn  ' size={22} />
                        <FcPhone className='scaleBtn ' size={22} />
                        <FcEmptyTrash className='scaleBtn ' size={22} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableList