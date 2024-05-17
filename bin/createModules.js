const fs = require("fs");
const path = require("path");

function createModule(moduleName) {
  const fileContent = `const functionName = (() => {
                          console.log("this is Function");
                      })

                      module.exports = { functionName };`;

  const moduleStructure = {
    services: fileContent,
    middleware: fileContent,
    controllers: fileContent,
  };

  const routesStructure = {
    "routes.json": JSON.stringify(
      [
        {
          path: "/demo",
          method: "post",
          action: "controllers.functionName",
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

  const moduleFolderPath = path.join(__dirname, "../api", moduleName);
  console.log(moduleFolderPath, "pathhhhhhhhh");

  try {
    fs.mkdirSync(moduleFolderPath);

    for (const [file, content] of Object.entries(routesStructure)) {
      fs.writeFileSync(path.join(moduleFolderPath, file), content);
    }

    for (const [folder, content] of Object.entries(moduleStructure)) {
      const folderPath = path.join(moduleFolderPath, folder);
      fs.mkdirSync(folderPath);

      fs.writeFileSync(path.join(folderPath, `${folder}.js`), content);
    }

    console.log(`Module '${moduleName}' created successfully.`);
    console.log(`Folder structure created at ${moduleFolderPath}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = createModule;
