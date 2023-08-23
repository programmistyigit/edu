require("express-async-errors")
require("dotenv").config()
const { connectDB } = require("./MongoDB/connect")
connectDB()


const express   = require("express")
const app       = express()
const cors      = require("cors")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const cookieParser = require("cookie-parser")


// cors police
app.use( cors( { origin : "*" } ) )
// cookie parser 
app.use(cookieParser("salom"))


// routing 
const adminRouter           = require("./admin/admin")
const auth                  = require("./Routers/auth")
const businesmenRouter      = require("./Routers/RouterBusinesmen")
const teacherRouter         = require("./Routers/RouterTeachers")
const studentRouter         = require("./Routers/RouterStudent")
const motherRouter          = require("./Routers/RouterMother")
const middlewareBusinesmen  = require("./Middleware/MidlewareBusinesmen")
const middlewareTeacher     = require("./Middleware/MiddlewareTeacher")
const middlewareStudent     = require("./Middleware/MidlewareStudent")
const middlewareMother      = require("./Middleware/MidlewareMother")
const isLoginRouter         = require("./Routers/isLogin/verify")
const cityListRouter        = require("./Routers/cityList")
const spaceList             = require("./Routers/spaceList")

app.use("/admin" , adminRouter)
app.use("/auth" , auth)
app.use("/businesmen" ,middlewareBusinesmen , businesmenRouter)
app.use("/teacher" , middlewareTeacher , teacherRouter)
app.use("/student" , middlewareStudent , studentRouter)
app.use("/mother" , middlewareMother , motherRouter)
app.use("/islogin" , isLoginRouter)
app.use("/cityList" , cityListRouter)
app.use("/spaceList" , spaceList)
app.get("/logOut" , (req ,res) => {
    res.clearCookie("auth" , { maxAge: 60 * 60 * 24 * 100 }).status(200).json({status:"success"})
})

// app.get("/businesmen", (req, res) => {
//     res
//         .status(200)
//         .json(BusinesMenData)
// })


// error middleware
app.use((err, req, res, next) => {
    console.log(err);
    if (err) return res.status(500).json({ status: "error", message: "serverda kutilmagan hatolik"  , error:err.toString()})
    else next()
})


// server listen
app.listen(5000, () => { console.log("server started on 5000 port"); })