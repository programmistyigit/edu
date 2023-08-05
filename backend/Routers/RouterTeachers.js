const { Router }        = require("express");
const _                 = require("lodash");
const yoqlamaRouter     = require("./Teacher/yoqlaman");
const routes            = Router();
const businesmenRouter  = require("./Teacher/businesmen/businesmen");
const TeacherSchema     = require("../MongoDB/Schema/TeacherSchema");
const Baho              = require("./Teacher/baho")

/*
    * -----     route         =>   techer/data_me                                  -------
    * -----     method        =>   GET                                             -------
    * -----     description   =>   ustoz malumotlarini olsih                       -------
    * -----     whoami        =>   teacher                                         -------
*/

routes.get("/data_me", async (req, res) => {
    const teacher = await TeacherSchema.findById(req.id)
        await teacher.populate({path:"teacher_coursesID" , strictPopulate:false})
        // await teacher.populate({path:"teacher_complaints" , strictPopulate:false})
        await teacher.populate({path:"teacher_notification" , strictPopulate:false})
        await teacher.populate({path:"teacher_follow_businesmen" , strictPopulate:false})
        const sendData = teacher.teacher_follow_businesmen.map(bsm=> ({..._.pick(bsm , ["_id" , "businesmen_companyName" , "businesmen_starTJobHours" , "businesmen_endJobHours" , "businesmen_teachersID" , "businesmen_wsConnectionIDS" , "businesmen_course_space"])}))
        res.status(200).json({data:{..._.pick(teacher , [  "_id" ,"teacher_name" , "teacher_firstName" , "teacher_phoneNumber" , "teacher_avatar" , "teacher_birthDay" , "teacher_rank" , "teacher_coursesID" , "teacher_spase" , "teacher_complaints" , "teacher_location" , "teacher_notification" , ""]) , teacher_follow_businesmen:sendData}})
})

/*
    * -----     route         =>   techer/businesmen/*                                        -------
    * -----     method        =>   *                                                          -------
    * -----     description   =>   oquv markaz talim boyicha mutahasislari bilan ishlash      -------
    * -----     whoami        =>   teacher                                                    -------
*/

routes.use("/businesmen", businesmenRouter)


/*
    * -----     route         =>   techer/yoqlaman/*                                        -------
    * -----     method        =>   *                                                        -------
    * -----     description   =>   oquvchilarni yoqlama qilish                              -------
    * -----     whoami        =>   teacher                                                  -------
*/

routes.use("/yoqlama", yoqlamaRouter)

/*
    * -----     route         =>   techer/baho/*                                           -------
    * -----     method        =>   *                                                       -------
    * -----     description   =>   oquvchilarga baho qoyish                                -------
    * -----     whoami        =>   teacher                                                 -------
*/

routes.use("/baho" , Baho)




module.exports = routes;
