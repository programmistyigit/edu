import { createContext } from "react";
export const yoshi = (target) => {
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
const Context = createContext()
export default Context