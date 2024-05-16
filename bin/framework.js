#!/usr/bin/env node

const createModules = require("./createModules");

const frameworkMain = () => {
  const args = process.argv.slice(2);
  console.log(args, "sss");
  const startServercmd = args.indexOf("start");
  console.log(startServercmd);

  if (args[0] === "-c" && args[1] === "module" && args[2] === "--name") {
    const moduleName = args[3];
    createModules(moduleName);
  } else if (startServercmd !== -1) {
    const { initializeApp } = require("../server");
    initializeApp();
  } else {
    console.log("Invalid command");
  }
};

frameworkMain();
