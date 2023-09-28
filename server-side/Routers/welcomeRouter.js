// Main Entry Point: localhost:PORT/welcome

// Imports
const express = require("express");
const welcomeRouter = express.Router();

welcomeRouter.get('/', (req, res) => {
      
      const products = [{ name: 'car' }, { name: 'phone' }];
      res.send(products);

  });
  
module.exports = welcomeRouter;
