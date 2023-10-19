// This is the main entry point of the Factory Management backend
// Author: Tomer Meidan
// 1st version date: 19.10.2023 13:39

// TODO Improve the actions to database logic (right now it updates when user logs out)

// NPM Library Imports
require("./utils/logger");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const isAuth = require("./utils/auth");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const db = require("./configs/db");
const loginRouter = require("./routers/loginRouter");
const employeesRouter = require("./routers/employeesRouter");
const shiftsRouter = require("./routers/shiftsRouter");
const departmentsRouter = require("./routers/departmentsRouter");
const usersRouter = require("./routers/usersRouter");
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
const dirname = __dirname.replace("server-side", "views");
app.set("views", dirname);

// Global server variables
const PORT = process.env.PORT || 3000;

// Get Current Time
const midnightTime = () => {
  const midnightTime = new Date();
  midnightTime.setHours(24);
  midnightTime.setMinutes(0);
  midnightTime.setSeconds(0);

  return midnightTime.getTime() - new Date().getTime();
};

// Database Connection
db.connectDB(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/factory-users"
);

// Session collection storage on mongoDB
const sessionStorage = new MongoDBSession({
  uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/factory-users",
  collection: "mySessions",
});


// Middlewares Section
// Sessions Middleware
app.use(
  session({
    secret: "chocolate rain",
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: {
      maxAge: midnightTime(), // Set the cookie expiration to midnight
    },
  })
);
// Default Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.render("login.html");
});

// Routers Section
// Login router page related requests
app.use("/login", loginRouter);

app.use(isAuth);

app.get("/welcome", (req, res) => {
  res.render("welcome.html");
});

// Employees router page related requests
app.use("/employees", employeesRouter);

// Departments router page related requests
app.use("/departments", departmentsRouter);

// Shifts router page related requests
app.use("/shifts", shiftsRouter);

// Users router page related requests
app.use("/users", usersRouter);


// Server Connection
app.listen(PORT, () => {
  console.log(
    `Factory Management Server is listening on http://localhost:${PORT}`
  );
});
