import React, { useMemo } from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

function ClassesInfo({ name, groupSpase, students, classProgress, ticher }) {
    

    const groupUsersComponent = useMemo(() =>students.map(e=> ({...e , fullName(){ return this.name + " " + this.firtsName}})).map(e => <Avatar className='border border-secondary border-opacity-50' key={e.id} alt={e.fullName()} src={e.avatar} />), [students])
    const thema = useSelector(e => e.thema)


    return (
        <div className={`bg-${thema.bg} p-2 rounded-2 boxShadow`}>
            <div className='d-flex justify-content-between'>
                <div className={`text-${thema.text} p-1`}>{name} </div>
                <div className={`text-${thema.text} p-1`}>{groupSpase} </div>
            </div>

            <div className={`p-1`}>
                <AvatarGroup total={students.length} spacing={"small"}  >
                    {groupUsersComponent}
                </AvatarGroup>
            </div>
            {/* progrees class */}

            <div className='p-2'>
                <div className='d-flex justify-content-between'>
                    <span className={`text-${thema.text}`}>progress classa</span>
                    <span className={`text-${thema.text}`}>{classProgress}%</span>
                </div>
                <div className='w-100'>
                    <LinearProgress variant={"determinate"} value={classProgress} color='success' />
                </div>
            </div>
            {/* classes Ticher */}
            <div className='p-2 d-flex gap-3'>
                <Avatar alt={ticher.name} src={ticher.avatar} />
                <div className='d-flex flex-column'>
                    <span className={`text-${thema.text}`} style={{ fontSize: 12 }}>Guruh oqituvchisi</span>
                    <span className={`text-${thema.text}`}>{ticher.name} {ticher.firstName}</span>
                </div>
            </div>
        </div>

    )
}

export default ClassesInfo