const express = require("express");
const userRouter = express.Router();
const usersBLL = require("../BLL/usersBLL");

// Action: GET
// Entry Point: localhost:port/users/updateActions
// Info: Update the current user's actions
userRouter.get('/updateActions/:id/:actionNumber', async (req,res) => {
    const userID = req.params.id
    const currentUserActions = req.params.actionNumber
    await usersBLL.updateUserActions(userID, currentUserActions)
    req.session.destroy();
    res.render("login.html");

  })
  
  // Action: TODO GET
  // Entry Point: localhost:port/users/updateAllUsers
  // Info: Update all users actions to their max actions allowed
  userRouter.get('/updateAllActions/', async (req,res) => {
    try{
    await usersBLL.updateAllUsersActions()
    }catch(err){
      
    }
  })

  // Action: TODO GET
  // Entry Point: localhost:port/users/logout
  // Info: Update all users actions to their max actions allowed
  userRouter.get("/logout", (req, res) => {
    res.redirect(`updateActions/${req.session.user.id}/${req.session.currentActions}`)
  });

  module.exports = userRouter