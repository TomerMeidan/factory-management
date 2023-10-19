const usersDAL = require("../DAL/web-service/usersDAL");
const userModel = require("../model/userModel");

const checkUserCredentials = async (username, email) => {
  const users = await usersDAL.getAllUsers();
  const user = users.find(
    (user) => user.username === username && user.email === email
  );
  if (user === undefined) return false;
  const userActions = await userModel.findOne({ id: user.id });
  if (userActions === undefined) return false;
  user["numOfActions"] = userActions.numOfActions;
  user["currentActions"] = userActions.currentActions;
  return user;
};

module.exports = { checkUserCredentials };
