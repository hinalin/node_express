const fs = require("fs");
const path = require("path");

function createModule(moduleName) {
  const moduleStructure = {
    services: `
            const moduleService = (() => {
                console.log("Module Service");
            })
            module.exports = { moduleService };
        `,
    middleware: `
            const moduleMiddleware = ( req , res , next ) => {
                console.log("Success moduleMiddleware");
                next();
            }
            module.exports = { moduleMiddleware };
        `,
    controllers: `
            const home = (req, res) => {
                console.log("My homepage");
                res.send("This is my Home page!!");
            };

            module.exports = { home };

        `,
  };

  const routesStructure = {
    "routes.json": JSON.stringify(
      [
        {
          path: "/demo",
          method: "POST",
          action: "Your route path",
          public: true,
          globalMiddlewares: [],
          middlewares: [],
          pathFromRoot: false,
          enabled: true,
        },
      ],
      null,
      2
    ),
  };

  const apiFolderPath = path.join(__dirname, "../api", moduleName);
  // console.log(apiFolderPath, "pathhhhhhhhh");

  try {
    fs.mkdirSync(apiFolderPath);

    for (const [file, content] of Object.entries(routesStructure)) {
      fs.writeFileSync(path.join(apiFolderPath, file), content);
    }

    for (const [folder, content] of Object.entries(moduleStructure)) {
      const folderPath = path.join(apiFolderPath, folder);
      fs.mkdirSync(folderPath);

      fs.writeFileSync(path.join(folderPath, `${folder}.js`), content);
    }

    console.log(`Module '${moduleName}' created successfully.`);
    console.log(`Folder structure created at ${apiFolderPath}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = createModule;
