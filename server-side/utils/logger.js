// logger.js

const fs = require("fs");
const logFile = fs.createWriteStream("./app.log", { flags: "w" });

const originalLog = console.log;

console.log = (args) => {
  const time = new Date().toISOString();
  originalLog(`[${time}]: ${args}`);
  logFile.write(`[${time}]: ${args}\n`);
};

process.on("exit", () => {
  console.log = originalLog;
});
