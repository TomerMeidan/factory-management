const express = require("express");
const shiftsRouter = express.Router();
const shiftsBLL = require("../BLL/shiftsBLL");

// Main Entry Point: localhost:port/shifts

// Action: Get
// Entry Point: localhost:port/shifts
// Info: Get all shifts from mongodb shifts collection
shiftsRouter.get("/", async (req, res) => {
    const shifts = await shiftsBLL.getAllShifts();
    res.status(201).json(shifts);
  });

module.exports = shiftsRouter;
