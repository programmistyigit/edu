const { Router }        = require("express");
const StudentSchema     = require("../MongoDB/Schema/StudentSchema");
const classRouter       = require("./Student/class")
const routes            = Router();

/*
    * -----     route         =>   student/data_me                -------
    * -----     method        =>   GET                            -------
    * -----     description   =>   get data student               -------
    * -----     whoami        =>   student                        -------
*/
routes.get("/data_me", async (req, res) => {
    try {
      const student = await StudentSchema.findById(req.id)
        .populate([
          {
            path: "student_classesID",
            populate: [
              { path: "class_BusinesmenID" , select : "-businesmen_password -businesmen_login -businesmen_not_success_message_default_text"},
              { path: "class_groupSpase" },
            ],
          },
          { path: "student_notification", strictPopulate: false },
          { path: "student_message", strictPopulate: false },
        ]);
  
      res.status(200).json({
        data: {
          student,
        },
      });
      console.log(student.student_classesID[0]);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching student data.",
      });
    }
  });

/*
    * -----     route         =>   student/class/*                -------
    * -----     method        =>   *                              -------
    * -----     description   =>   controls class                 -------
    * -----     whoami        =>   student                        -------
*/
routes.use("/class" , classRouter)



module.exports = routes;
