require("dotenv").config();
const expr = require("express");
const Routes = require("./cores/routes");
const services = require("./cores/services");
const functions = require("./cores/functions");
const crons = require("./cores/crons");

const app = expr();
const port = process.env.PORT;
// console.log(port, "portttttt");

const farmework = {
  services : services,
  functions : functions,
  crons : crons,
};
global.framework = farmework;

// const moduleServices =
// framework.services.module1.module2Service.moduleService5();
// console.log(moduleServices);

// const framework_function = framework.functions.function1.myfunction1();
// console.log(framework_function);

const startServer = async () => {
  try {
    await Routes(app)

    app.listen(port , () => {
      console.log(`\nserver is running at http://localhost:${port}\n`);
    })
  }
  catch(error) {
    console.error('Error starting the server:' , error )
  }
}

startServer();