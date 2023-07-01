import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { FiMoreVertical } from "react-icons/fi"
import { Avatar, AvatarGroup, LinearProgress, Popover } from '@mui/material'
import {AiFillDislike  , AiFillStar} from "react-icons/ai"
import { Rating } from "primereact/rating";
function RowContent({ BigTeacherId, durationDays, status, name, students, theDayAfterTheStart, groupSpase }) {
    const AllTeacher = useSelector(e => e.teacher)
    const thema = useSelector(e => e.thema)
    const groupUsersComponent = useMemo(() => students.map(e => ({ ...e, fullName() { return this.name + " " + this.firtsName } })).map(e => <Avatar className='border border-secondary border-opacity-50' key={e.id} alt={e.fullName()} src={e.avatar} />), [students])
    const classProgress = parseInt(theDayAfterTheStart) / parseInt(durationDays) * 100
    const ticher = AllTeacher.find(e => e.id === BigTeacherId)

    function BasicPopover() {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const [value, setValue] = useState(null);
        return (
            <div>
                <button aria-describedby={id} className='btn' style={{ outline: "none", width: "auto", height: "auto", border: "none" }} onClick={handleClick}>
                    <FiMoreVertical size={20} className='cursor-pointer' color={thema.text === "light" ? "#fff" : "#555"} />
                </button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                >
                    <div className={` ${status.status !== "success" ? "btn disabled":""} border-0 flex justify-content-center p-2`}>
                        <Rating value={value} onChange={(e) => setValue(e.value)}
                            cancelIcon={<AiFillDislike size={20} />}
                            onIcon={<AiFillStar size={20} color='orange' />}
                            offIcon={<AiFillStar size={20} />}
                        />
                    </div>
                    {status.status !== "success" 
                        ?( 
                            <div className='p-2'>
                                <div className='p-1 bg-info rounded-3 text-center cursor-pointer boxShadow'> Start classes</div>
                            </div>
                        )
                        :""
                    }
                </Popover>
            </div>
        );
    }

    return (
        <div className='col-3 p-3 '>

            <div className={`bg-${thema.bg} p-2 rounded-2 boxShadow border border-light border-opcity-50`}>
                <div className='d-flex justify-content-between'>
                    <div className={`text-${thema.text} p-1`}>{name} </div>
                    <div className={`text-${thema.text} p-1 d-flex gap-3`}>
                        {groupSpase}
                        <BasicPopover />
                    </div>
                </div>

                <div className={`p-1`}>
                    <AvatarGroup max={6} total={students.length} spacing={"small"}  >
                        {groupUsersComponent}
                    </AvatarGroup>
                </div>
                {/* progrees class */}

                <div className='p-2'>
                    <div className='d-flex justify-content-between'>
                        <span className={`text-${thema.text}`}>progress classa</span>
                        <span className={`text-${thema.text}`}>{Math.floor(classProgress)}%</span>
                    </div>
                    <div className='w-100'>
                        <LinearProgress variant={"determinate"} value={classProgress} color='success' />
                    </div>
                </div>
                {/* classes Ticher */}
                <div className='d-flex p-2 justify-content-between align-items-center'>
                    <div className=' d-flex gap-3'>
                        <Avatar alt={ticher.name} src={ticher.avatar} />
                        <div className='d-flex flex-column'>
                            <span className={`text-${thema.text}`} style={{ fontSize: 12 }}>Guruh oqituvchisi</span>
                            <span className={`text-${thema.text}`}>{ticher.name} {ticher.firstName}</span>
                        </div>
                    </div>
                    <div className={`bg-${status.status} bg-opacity-50 p-1 px-3 rounded-5 d-flex justify-content-center align-items-center h-25 text-${thema.text}`} style={{ fontSize: 12 }}>{status.text}</div>
                </div>
            </div>
        </div>

    )
}

export default RowContent