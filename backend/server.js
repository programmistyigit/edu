const express = require("express");
require("dotenv").config()
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require('path');
const cookieParser = require("cookie-parser");
const { connectDB } = require("./MongoDB/connect");

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(cookieParser("salom"));
app.use(fileUpload());


app.use('/images', express.static('uploads'));

// Routers
const adminRouter = require("./admin/admin");
const auth = require("./Routers/auth");
const businesmenRouter = require("./Routers/RouterBusinesmen");
const teacherRouter = require("./Routers/RouterTeachers");
const studentRouter = require("./Routers/RouterStudent");
const motherRouter = require("./Routers/RouterMother");
const middlewareBusinesmen = require("./Middleware/MidlewareBusinesmen");
const middlewareTeacher = require("./Middleware/MiddlewareTeacher");
const middlewareStudent = require("./Middleware/MidlewareStudent");
const middlewareMother = require("./Middleware/MidlewareMother");
const isLoginRouter = require("./Routers/isLogin/verify");
const cityListRouter = require("./Routers/cityList");
const updateRouter = require("./Routers/update/update");
const fileUpdateRouter = require("./Routers/update/image.update");
const spaceList = require("./Routers/spaceList");
const OverSearchFilterRouter = require("./Routers/search/index")

// Routes
app.use("/admin", adminRouter);
app.use("/auth", auth);
app.use("/businesmen", middlewareBusinesmen, businesmenRouter);
app.use("/teacher", middlewareTeacher, teacherRouter);
app.use("/student", middlewareStudent, studentRouter);
app.use("/mother", middlewareMother, motherRouter);
app.use("/islogin", isLoginRouter);
app.use("/cityList", cityListRouter);
app.use("/spaceList", spaceList);

// Update profile for all users
app.use("/update", updateRouter);
app.use("/file", fileUpdateRouter);
app.use("/filter", OverSearchFilterRouter);



// Logout
app.get("/logOut", (req, res) => {
    res.clearCookie("auth", { maxAge: 60 * 60 * 24 * 100 }).status(200).json({ status: "success" });
});



// Default route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Error middleware
 app.use((err, req, res, next) => {
    console.error(err);
    if (err) {
        res.status(500).json({ status: "error", message: "Server error", error: err.toString() });
    } else {
        next();
    }
});

app.get("/host" , (req, res) => {
    res.send(req.get("host"))
})

// Server listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
