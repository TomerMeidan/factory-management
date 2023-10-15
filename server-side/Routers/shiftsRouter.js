const express = require("express");
const shiftsRouter = express.Router();
const shiftsBLL = require("../BLL/shiftsBLL");

// Main Entry Point: localhost:port/shifts

// Action: GET
// Entry Point: localhost:port/shifts
// Info: Get all shifts from mongodb shifts collection
shiftsRouter.get("/", async (req, res) => {
    const response = await shiftsBLL.getAllShifts();
    res.status(201).json(response);
  });

// Action: POST
// Entry Point: localhost:port/shifts/new
// Info: Add a new shift to the shifts collection
shiftsRouter.post("/new", async (req, res) => {
  const responseMessage = await shiftsBLL.addShift(req.body);
  res.status(201).json(responseMessage);
});


// Action: PUT
// Entry Point: localhost:port/shifts/edit/:id
// Info: Edit an existing shift from the shifts collection
shiftsRouter.put('/edit/:id', async (req,res) => {
  const responseMessage = await shiftsBLL.editShift(req.params.id, req.body);
  res.status(201).json(responseMessage);
})

module.exports = shiftsRouter;
