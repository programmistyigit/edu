import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { HiViewGridAdd } from "react-icons/hi"
import { FcClearFilters } from "react-icons/fc"

function Filter({ data, status, handleFilter, filterOptions }) {
    console.log(status);
    const thema = useSelector(e => e.thema)
    const optionsComponent = useMemo(() => data.map(e => <option key={e} value={e}>{e}</option>), [data])
    const optionsComponentStatus = useMemo(() => status.map(e => <option key={e.text}  value={e.text}>{e.text}</option>), [status])
    return (
        <div className='w-100 d-flex justify-content-end p-2 mb-4'>
            <div className='d-flex w-50 justify-content-end gap-5'>
                <div>

                    <select value={filterOptions.space ? filterOptions.space : "disabled"} onChange={({ target }) => handleFilter("space", target.value)} className={`p-1 border-0 bg-${thema.bg} text-${thema.text} px-3 rounded-2 boxShadow filterSelect`}>
                        <option value="disabled" disabled>Fanlar</option> 
                        {optionsComponent}
                    </select>
                </div>
                <div>

                    <select value={filterOptions.status ? filterOptions.status : "disabled"} onChange={({ target }) => handleFilter("status", target.value)} className={`p-1 border-0 bg-${thema.bg} text-${thema.text} px-3 rounded-2 boxShadow filterSelect`}>
                        <option value="disabled" disabled>status</option>
                        {optionsComponentStatus}
                    </select>
                </div>
                <div>

                    <div onClick={() => handleFilter("", "clear")} className={`border-0 p-1 bg-${thema.bg} text-${thema.text} px-3 rounded-2 boxShadow filterSelect d-flex justify-content-center align-items-center gap-3`}>
                        <FcClearFilters size={18} />
                        <span>clear filter</span>
                    </div>
                </div>
                <div>

                    <div className={`border-0 p-1 bg-${thema.bg} px-3 rounded-2 text-${thema.text} boxShadow filterSelect d-flex justify-content-center align-items-center gap-3`}>
                        <HiViewGridAdd size={18} />
                        <span>Add class</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter