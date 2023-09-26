// Main Entry Point: localhost:PORT/welcome

// Imports
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const welcomeRouter = express.Router();

welcomeRouter.get('/', (req, res) => {
  
      const products = [{ name: 'car' }, { name: 'phone' }];
      res.send(products);

  });
  
module.exports = welcomeRouter;
