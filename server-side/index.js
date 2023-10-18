// This is the main entry point of the Factory Management backend

// NPM Library Imports
require("./utils/logger");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./configs/db");
const app = express();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const ejs = require('ejs')

// Routers imports
const loginRouter = require("./routers/loginRouter");
const employeesRouter = require("./routers/employeesRouter");
const shiftsRouter = require("./routers/shiftsRouter");
const departmentsRouter = require("./routers/departmentsRouter");

// Global server variables
const PORT = process.env.PORT || 3000;

// TODO Fix the date object
const hours = 3600000 * 3

// Get Current Time
const midnightTime = () => {
  const futureTime = new Date()
  futureTime.setHours(24)
  futureTime.setMinutes(0)
  futureTime.setSeconds(0)

  return futureTime.getTime() - new Date().getTime()
}
// Configure EJS renderer 
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile);

// Database Connection
db.connectDB(process.env.MONGO_URI);

// Start of Session Logic --------------------------------------------
// Session collection storage on mongoDB
const sessionStorage = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

// Middleware for the sessions
app.use(
  session({
    secret: "chocolate rain",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: midnightTime(), // TODO Set the cookie expiration to midnight (Set for 10 minutes)
    },
  })
);

// Middleware : isAuth middleware is going to verify only logged in users
const isAuth = (req, res, next) => {
  if (req.session.isAuth) next();
  else res.render("login.html");
};

// End of Session Logic --------------------------------------------

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
  res.render("login.html")
});

// Routers
// TODO Login router page related requests
app.use("/login", loginRouter);

app.use(isAuth)

app.get("/welcome", (req,res) => {
  res.render("welcome.html");
})

// Employees router page related requests
app.use("/employees", employeesRouter);

// Departments router page related requests
app.use("/departments", departmentsRouter);

// TODO Shifts router page related requests
app.use("/shifts", shiftsRouter);

// TODO Users router page related requests

// Server Connection
app.listen(PORT, () => {
  console.log(
    `Factory Management Server is listening on http://localhost:${PORT}`
  );
});
