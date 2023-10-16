// logger.js

const fs = require("fs");
const jsonFile = require("jsonfile")
const logFile = fs.createWriteStream("./app.log", { flags: "w" });
const actionFile = fs.createWriteStream("./actions.json", { flags: "w" });

const originalLog = console.log;

console.log = (args) => {
  const time = new Date();
  originalLog(
    `[${time.toLocaleDateString()} ${time.toLocaleTimeString()}]: ${args}`
  );
  logFile.write(
    `[${time.toLocaleDateString()} ${time.toLocaleTimeString()}]: ${args}\n`
  );
};

actionUpdate = (args) => {
  actionFile.write(
    `[${time.toLocaleDateString()} ${time.toLocaleTimeString()}]: ${args}\n`
  );
};

process.on("exit", () => {
  console.log = originalLog;
});
