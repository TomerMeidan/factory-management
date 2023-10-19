const mongoose = require("mongoose");

const connectDB = (connectionString) => {
  mongoose
    .connect(connectionString)
    .then(() => console.log(`Database is connected to ${connectionString}`))
    .catch((err) => console.log(` DATABASE CONNECTION ERROR: Message: ${err}`));
    
};

module.exports = { connectDB };
