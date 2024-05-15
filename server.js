require("dotenv").config();
const expr = require("express");
const Routes = require("./cores/routes");
const services = require("./cores/services");
const functions = require("./cores/functions");
const { db, sequelize } = require("./cores/models");
const crons = require("./cores/crons");


const app = expr();
const port = process.env.PORT;
// console.log(port, "portttttt");

// const moduleServices =
// framework.services.module1.module2Service.moduleService5();
// console.log(moduleServices);

// const framework_function = framework.functions.function1.myfunction1();
// console.log(framework_function);

const startServer = async () => {
  try {
    await Routes(app);

    app.listen(port, () => {
      console.log(`\nserver is running at http://localhost:${port}\n`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

const initializeApp = async () => {
  try {
    
    const framework = {
      services: services,
      crons: crons,
      functions: functions,
      models: db,
      connection: sequelize,
    };
    global.framework = framework;
    
    const { checkPendingMigration } = require("./cores/migration");

    await checkPendingMigration();
    await startServer();
  } catch (error) {
    console.error("App initialization error:", error);
  }
};

initializeApp();
// module.exports = { initializeApp }
