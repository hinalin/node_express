require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../../middleware/globalMiddleware");
const secret_key = process.env.SECRET_KEY;

const home = (req, res) => {
  console.log("My homepage");
  res.send("This is my Home page!!");
};

const signup = (req, res) => {
  console.log("My signup");
  res.send("This is my signup page!!");
  // const moduleServices =
  //   framework.services.module1.module1Service.moduleService1();
  // console.log(moduleServices);

  // const framework_function = framework.functions.function2.myfunction5();
  // console.log(framework_function);
};

const login =
  (verifyToken,
  (req, res) => {
    const user = {
      id: 1,
      name: "hinali",
      email: "hinali@gmail.com",
    };
    jwt.sign({ user }, secret_key, { expiresIn: "300s" }, (err, token) => {
      res.json({
        token,
      });
    });

    jwt.verify(req.token, secret_key, (err, authData) => {
      if (err) {
        res.send({
          result: "Invalid Token!!",
        });
      } else {
        console.log("My login");
        res.send("This is my login page!!");
        // const framework_function = framework.functions.function1.myfunction3();
        // console.log(framework_function);
      }
    });

    // console.log("My login");
    // res.send("This is my login page!!");
    // const framework_function = framework.functions.function1.myfunction3();
    // console.log(framework_function);
  });

const update = (req, res) => {
  console.log("update");
  res.send("Update!!");
};

const remove = (req, res) => {
  console.log("delete");
  res.send("Delete!!");
};

module.exports = { home, signup, login, update, remove };
