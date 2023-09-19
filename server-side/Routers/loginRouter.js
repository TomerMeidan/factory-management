const express = require('express')
const loginBLL = require('../BLL/loginBLL')


const loginRouter = express.Router()
// Main Entry Point: localhost:PORT/login

// Entry Level: /root
// Action: Post
// Reason: Check user's credentials with the database
// Req body: Has Two strings of username and password
loginRouter.post('/', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const isValid = loginBLL.checkUserCredentials(username, password);
    if(isValid){
        res.send("User is valid")
    } else {
        res.status(401).send(`User was not found in the system!`)
    }

})

module.exports = loginRouter