// Imports
const express = require("express")
const loginRouter = require('./Routers/loginRouter')

// Global Variables
const app = express()
const PORT = 3000

// Database Connection

// Middlewares
app.use(express.json())
app.use(cors())

// Routers
// TODO Create Login Page Router
app.use('/login', loginRouter);

// TODO Create Welcome Page Router

// Server Connection
app.listen(PORT, ()=>{
    console.log(`Factory Management Server is running on port ${PORT}`)
})