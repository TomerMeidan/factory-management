// logger.js

const fs = require("fs");
const jsonFile = require("jsonfile");
const logFile = fs.createWriteStream("./app.log", { flags: "w" });
const initialJson = { actions: [] }
jsonFile.writeFile("actions.json", initialJson, function (err) {
  if (err) console.error(err);
  else console.log("actions.json file is created");
});

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

console.update = (user) => {
  const time = new Date();
  const userActionRow = `id:${user.id}, maxActions:${
    user.maxActions
  }, date:${time.toLocaleDateString()}, actionsAllowed:${user.actionsAllowed}`;
  user["date"] = time.toLocaleDateString();

  // open file and get data
  jsonFile.readFile("actions.json", function (err, obj) {
    // append new data
    obj.actions.push(user);

    // write data back to file
    jsonFile.writeFile("actions.json", obj, function (err) {
      if (err) console.error(err);
      else console.log(`User id ${user.id} action was recorded.`);
    });
  });
};

process.on("exit", () => {
  console.log = originalLog;
});
