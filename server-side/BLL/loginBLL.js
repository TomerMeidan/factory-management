const usersDAL = require('../DAL/web-service/usersDAL')

const checkUserCredentials = async (username,email) => {
    const users = await usersDAL.getAllUsers();
    const user = users.find((user) => user.username === username && user.email === email) 
    if(user === undefined)
        return false;
    return user;
}



module.exports = {checkUserCredentials}