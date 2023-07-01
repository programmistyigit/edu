import React from "react";
import { InputSwitch } from "primereact/inputswitch";
import {BsFillSunFill , BsFillMoonFill} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { replase } from "../../../../../../stores/themaStore";

export default function ToggleBtnThema() {
    const thema = useSelector(e=>e.thema)
    const checked = thema.bg === "dark"
    const distpatch = useDispatch()
    const handleChange = ()=>{
        distpatch(replase())
    }
    return (
        <div>
            <div className="p-2 d-flex gap-3 align-items-center">
                <BsFillSunFill size={25} color="orange"/>
                <InputSwitch  checked={checked} onChange={handleChange} />
                <BsFillMoonFill size={25} color={thema.text === "light"?"#fff":"black"}/>
            </div>
        </div>
    );
}