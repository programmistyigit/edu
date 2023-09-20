const { Router }            = require("express");
const BusinesMenSChema      = require("../MongoDB/Schema/BusinesMenSChema");
const classes               = require("./Businesmen/classes")
const teacherRouter         = require("./Businesmen/teacher")
const students              = require("./Businesmen/students");
const coursRouter           = require("./Businesmen/course")
const spaceRouter           = require("./Businesmen/space");
const planRouter            = require("./Businesmen/plan");
const libraryRouter            = require("./Businesmen/library");

const routes = Router();

/*
    * -----     route         =>   businesmen/alldata                   -------
    * -----     method        =>   GET                                  -------
    * -----     description   =>   oquv markaz malumotlarini olish      -------
    * -----     whoami        =>   businesmen                           -------
*/

routes.get("/alldata" , async (req, res)=>{
    const BusinesMenData = await BusinesMenSChema.findById(req.id)
    await BusinesMenData.populate({path:"businesmen_classesID" , strictPopulate:false})
    // const Students = [].concat(...allCouerse.map(cl=> cl.populate({path:"studentsId" , strictPopulate:false}))).reduce((arr , currentArr)=> {} , [])
    res.json({BusinesMenData})
})


/*
    * -----     route         =>   businesmen/cours/*               -------
    * -----     method        =>   *                                -------
    * -----     description   =>   cours controls                   -------
    * -----     whoami        =>   businesmen                       -------
*/

routes.use("/cours" , coursRouter)
// end


/*
    * -----     route         =>   businesmen/space/*          -------
    * -----     method        =>   *                             -------
    * -----     description   =>   controls space                     -------
    * -----     whoami        =>   businesmen                       -------
*/

routes.use("/space" , spaceRouter)

/*
    * -----     route         =>   businesmen/classes/*                  -------
    * -----     method        =>   *                                     -------
    * -----     description   =>   oquv markaz guruxlar bilan ishlash    -------
    * -----     whoami        =>   businesmen                            -------
*/


routes.use("/classes" , classes)



/*
    * -----     route         =>   businesmen/teacher/*                                       -------
    * -----     method        =>   *                                                          -------
    * -----     description   =>   oquv markaz talim boyicha mutahasislari bilan ishlash      -------
    * -----     whoami        =>   businesmen                                                 -------
*/


routes.use("/teacher" ,  teacherRouter)


/*
    * -----     route         =>   businesmen/students                                       -------
    * -----     method        =>   *                                                         -------
    * -----     description   =>   oquv markaz oquvchilari bilan ishlash aloqa ornatish      -------
    * -----     whoami        =>   businesmen                                                -------
*/

routes.use("/students" , students)

/*
    * -----     route         =>   businesmen/plan/*                                          -------
    * -----     method        =>   *                                                          -------
    * -----     description   =>   oquv markaz oquvchilari va ustozlari uchun kunlik rejalar  -------
    * -----     whoami        =>   businesmen                                                 -------
*/

routes.use("/plan" , planRouter)





routes.use("/library" , libraryRouter)



// routes.use("/comparison" , async (req, res)=>{
//     const id = req.body.id
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return(
//             res
//                 .status(400)
//                 .json(
//                     {
//                         message:"validationError",
//                         message:["oquv markaz tanlashda xatolik roy berdi" , "sahifani yangilab qayta urunib koring!"]
//                     }
//                 )
//         )
//     }
// })



module.exports = routes;
