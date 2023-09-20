// This is the main entry point of the authentication stage

// Imports
const express = require("express");
const loginRouter = require("./Routers/loginRouter");
const app = express();
const port = 4000;
const cors = require('cors')

// Middlewares
app.use(express.json());
app.use(cors());

// Login Router
app.use('/login', loginRouter);

// Server Connection
app.listen(port, () => {
  console.log(`Factory Authentication Server is listening on port ${port}...`);
});
