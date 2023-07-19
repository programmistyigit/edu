const { v4 } = require("uuid")


const studentsExompleName = [
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Axmat", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "alisher", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Adiba", gender: "female" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Baxtigul", gender: "fmale" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Asal", gender: "female" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Xotam", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "xikmat", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Guli", gender: "female" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "kimyo", gender: "female" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Aziz", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "shuxrat", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Begzod", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Asad", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Rustam", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Siroj", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Dilshod", gender: "male" },
    { firstName: "aliyev", country: { tuman: "dostlik", mahalla: "qaxramon", viloyat: "Jizzax" }, name: "Axmat", gender: "male" },
]



const Students = Array(1000).fill(0).map(() => studentsExompleName[Math.floor(Math.random() * studentsExompleName.length)]).map(e => ({ ...e, id: v4(), status: ["online", "ofline"][Math.floor(Math.random() * 2)], avatar: "https://unsplash.it/100/100/?random=" + Math.floor(Math.random() * 800), email: "exomple@mail.com", phoneNumber: "998999505609", birthDay: [2000 + Math.floor(Math.random() * 10), 1 + Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 30)].join("."), rank: Array(Math.floor(Math.random() * 200)).fill(0).map(() => ({ date: Math.floor(Math.random() * 100), data: Math.random() * 50 })).sort((a, b) => a.date - b.date) }))

const mother = Array(300).fill(0).map(
    () => ({
        ...studentsExompleName.map(e => ({ name: e.name, firstName: e.firstName, gender: e.gender }))[Math.floor(Math.random() * studentsExompleName.length)],
        childrensId: Array(Math.floor(Math.random() * 5)).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)]),
        id: v4(),
        avatar: "https://unsplash.it/100/100/?random=" + Math.floor(Math.random() * 800)
    })

)


const Techars = Array(10).fill(0).map(() => studentsExompleName[Math.floor(Math.random() * studentsExompleName.length)]).map(e => ({ ...e, status: ["online", "ofline"][Math.floor(Math.random() * 2)], complaints: Array(Math.floor(Math.random() * 10)).fill(0).map(() => ({ fatherId: mother[Math.floor(Math.random() * mother.length)].id, studentId: Students[Math.floor(Math.random() * Students.length)].id, status: ["warning", "info", "danger", "info", "secondary"][Math.floor(Math.random() * 5)], message: "qayta oqiting mavzuni", id: v4(), courseId: "", courseTema: "", givenAnswer: Math.floor(Math.random() * 10) })), id: v4(), avatar: "https://unsplash.it/100/100/?random=" + Math.floor(Math.random() * 800) }))
console.log(Techars);
const BusinesMenData = {
    name: "Alfraganus",
    dataRegister: "2023.04.2",
    classes: [
        {
            groupSpase: "algebra",
            name: "qaldirgoch",
            durationDays: "180",
            theDayAfterTheStart: Math.floor(Math.random() * 180).toString(),
            MoneyValue: "100ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(2).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(200).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "kimyo",
            name: "domboloqlar",
            durationDays: "200",
            theDayAfterTheStart: Math.floor(Math.random() * 200).toString(),
            id: v4(),
            MoneyValue: "100ming",
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(3).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(130).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "shamol",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "shamollar",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "shamolla1r",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "sham1ollar",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "shamoll2ar",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "shamolla3r",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "shamollar4",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        },
        {
            groupSpase: "ingliztili",
            name: "shamollar5",
            durationDays: "250",
            theDayAfterTheStart: Math.floor(Math.random() * 250),
            MoneyValue: "150ming",
            id: v4(),
            BigTeacherId: Techars[Math.floor(Math.random() * Techars.length)].id,
            assistantTeachersId: Array(4).fill(0).map(() => Techars[Math.floor(Math.random() * Techars.length)].id),
            studentsId: Array(150).fill(0).map(() => Students[Math.floor(Math.random() * Students.length)].id)
        }
    ].map(e => ({ ...e, status: [{ status: "success", text: "started" }, { status: "danger", text: "initializing" }][Math.floor(Math.random() * 2)] }))
}

module.exports = { BusinesMenData, Students, Techars, mother }