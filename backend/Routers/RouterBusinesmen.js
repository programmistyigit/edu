const { Router } = require("express");
const BusinesMenSChema = require("../MongoDB/Schema/BusinesMenSChema");
const classes = require("./Businesmen/classes")
const teacherRouter = require("./Businesmen/teacher")
const students = require("./Businesmen/students");
const { default: mongoose } = require("mongoose");

const routes = Router();

/*
    * -----     route         =>   businesmen/alldata                   -------
    * -----     method        =>   GET                                  -------
    * -----     description   =>   oquv markaz malumotlarini olish      -------
    * -----     whoami        =>   businesmen                           -------
*/

routes.get("/alldata" , async (req, res)=>{
    const BusinesMenData = await BusinesMenSChema.findById(req.id)
    const allCouerse = BusinesMenData.populate({path:"classesID" , strictPopulate:false})
    // const Students = [].concat(...allCouerse.map(cl=> cl.populate({path:"studentsId" , strictPopulate:false}))).reduce((arr , currentArr)=> {} , [])
    res.send({BusinesMenData , allCouerse})
})

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

routes.use("/comparison" , async (req, res)=>{
    const id = req.body.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return(
            res
                .status(400)
                .json(
                    {
                        message:"validationError",
                        message:["oquv markaz tanlashda xatolik roy berdi" , "sahifani yangilab qayta urunib koring!"]
                    }
                )
        )
    }
})



module.exports = routes;
