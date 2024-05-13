const home = (req, res) => {
  console.log("My homepage");
  res.send("This is my Home page!!");
};

const signup = (req, res) => {
  console.log("My signup");
  res.send("This is my signup page!!");
  const moduleServices =
  framework.services.module1.module1Service.moduleService1();
  console.log(moduleServices);

  const framework_function = framework.functions.function2.myfunction5();
  console.log(framework_function);
};

const login = (req, res) => {
  console.log("My login");
  res.send("This is my login page!!");
  const framework_function = framework.functions.function1.myfunction3();
  console.log(framework_function);
};

const update = (req, res) => {
  console.log("update");
  res.send("Update!!");
};

const remove = (req, res) => {
  console.log("delete");
  res.send("Delete!!");
};

module.exports = { home, signup, login, update, remove };
