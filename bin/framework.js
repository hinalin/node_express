#!/usr/bin/env node

const createModules = require("./createModules");
const createApi = require("./createApi");
const readline = require("readline");
const createCron = require("./createCrons");

const frameworkMain = () => {
  const args = process.argv.slice(2);
  // console.log(args, "sss");
  const startServer = args.indexOf("start");
  // console.log(startServer);

  if (args[0] === "-c" && args[1] === "module" && args[2] === "--name") {
    const moduleName = args[3];
    createModules(moduleName);
  } else if (args[0] === "-c" && args[1] === "api") {
    createApi();
  } else if (args[0] === "-c" && args[1] === "cron") {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter Your cron file name: " , (fileName) => {
      rl.question("Enter cron Pattern: " , (pattern) => {
        rl.close();
        createCron( fileName , pattern );
      })
    })
  } else if (startServer !== -1) {
    const { initializeApp } = require("../server");
    initializeApp();
  } else {
    console.log("Invalid command!!");
  }
};

frameworkMain();
