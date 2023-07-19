const { Router } = require("express");
const StudentSchema = require("../MongoDB/Schema/StudentSchema");
const classRouter = require("./Student/class")
const routes = Router();

/*
    * -----     route         =>   student/data_me                -------
    * -----     method        =>   GET                            -------
    * -----     description   =>   get data student               -------
    * -----     whoami        =>   student                        -------
*/
routes.get("/data_me" , async ( req , res ) => {
    const student = await StudentSchema.findById(req.id);
        await student.populate({path : "student_classesID" , strictPopulate:false})
        await student.populate({path : "student_notification" , strictPopulate:false})
        await student.populate({path : "student_message" , strictPopulate:false})

        res
            .status(200)
            .json(
                {
                    data:{
                        student
                    }
                }
            )
})


/*
    * -----     route         =>   student/class/*                -------
    * -----     method        =>   *                              -------
    * -----     description   =>   controls class                 -------
    * -----     whoami        =>   student                        -------
*/
routes.use("/class" , classRouter)



module.exports = routes;
