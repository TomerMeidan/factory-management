const express = require("express")

const app = express()
const PORT = 3000

// Database Connection

// Middlewares
app.use(express.json())
app.use(cors())

// Routers
// TODO Create Login Page Router
// TODO Create Welcome Page Router

// Server Connection
app.listen(PORT, ()=>{
    console.log(`Factory management server is running on port ${PORT}`)
})