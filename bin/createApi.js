const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");

const addRouteToModule = async (moduleName, options) => {
  const moduleFolderPath = path.join(__dirname, "../api", moduleName);
  const routesJsonFilePath = path.join(moduleFolderPath, "routes.json");
  const routeJsFilePath = path.join(
    moduleFolderPath,
    "/Controllers/controllers.js"
  );

  try {
    const routerJson = JSON.parse(await fs.readFile(routesJsonFilePath));
    const existingRoute = routerJson.find(
      (route) => route.path === options.path && route.method === options.method
    );

    if (existingRoute) {
      console.warn(
        `\x1b[31m[Error]: Route '${options.method}/${options.path}' already exists in module '${moduleName}'\x1b[0m`
      );
      return;
    }

    const action = options.action.split(".").pop();

    const newRoute = {
      path: options.path,
      method: options.method,
      action: options.action,
      public: options.isPublic,
      globalMiddlewares: typeof options.globalMiddlewares === 'string' && options.globalMiddlewares.trim() !== '' 
        ? options.globalMiddlewares.split(",") 
        : [],
      middlewares: typeof options.middlewares === 'string' && options.middlewares.trim() !== '' 
      ? options.middlewares.split(",") 
      : [],
      pathFromRoot: options.isPathFromRoot,
      enabled: true,
    };

    routerJson.push(newRoute);
    await fs.writeFile(routesJsonFilePath, JSON.stringify(routerJson, null, 2));
    console.log(`Route added successfully to module '${moduleName}'.`);
    console.log(`Route details added to ${routesJsonFilePath}`);

    let fileContent = await fs.readFile(routeJsFilePath, "utf-8");
    const dummyFunction = `const  ${action} = () => {
    console.log("${action} action");
}`;

    // Add the dummy function to the file
    if (!fileContent.includes(`function ${action}()`)) {
      fileContent += `\n\n${dummyFunction}`;
    }

    if (fileContent.includes(`module.exports`)) {
      // If module.exports already exists, add the function to it
      const exportsObjectRegex = /module\.exports\s*=\s*{([^}]*)}/s;
      const match = fileContent.match(exportsObjectRegex);

      if (match) {
        const existingExports = match[1].trim();
        if (existingExports) {
          // Append new action to existing exports
          fileContent = fileContent.replace(
            exportsObjectRegex,
            `module.exports = { ${existingExports}, ${action} };`
          );
        } else {
          // If there are no existing exports, just add the new action
          fileContent = fileContent.replace(
            exportsObjectRegex,
            `module.exports = { ${action} };`
          );
        }
      }
    } else {
      // If module.exports does not exist, add it
      fileContent += `\n\nmodule.exports = { ${action} };`;
    }

    await fs.writeFile(routeJsFilePath, fileContent, "utf-8");
    console.log(`Dummy function '${action}' added to ${routeJsFilePath}`);
  } catch (err) {
    console.error("Error:", err);
  }
};

// Function to prompt user for input
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Main function to handle API creation process
const createApi = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const modules = await fs.readdir("api");
    console.log("Available modules: ", modules);
    // for (i=0 ; i<modules.length ; i++){
    //     const module = modules[i];
    //     console.log(i ,":" , module);

    // }
    const moduleName = await askQuestion(rl, "Enter Module Name: ");
    if (!modules.includes(moduleName)) {
      console.error(
        `\x1b[31m[Error]: Module '${moduleName}' is not exist. Please create the module first.\x1b[0m`
      );
      rl.close();
      return;
    }
    const endpointPath = await askQuestion(rl, "Enter endpoint path (/): ");

    const method = await askQuestion(
      rl,
      "Enter method (get , post , patch , put , delete): "
    );
    const action = await askQuestion(rl, "Enter action: ");
    const isPublic =
      (await askQuestion(rl, "Is public (y/N): ")).toLowerCase() === "y";
    const moduleMiddlewaresInput = await askQuestion(
      rl,
      "Enter module middlewares (comma-separated): "
    );
    const globalMiddlewaresInput = await askQuestion(
      rl,
      "Enter global middlewares (comma-separated): "
    );

    const moduleMiddlewares = moduleMiddlewaresInput
      ? moduleMiddlewaresInput.split(",")
      : [];
    const globalMiddlewares = globalMiddlewaresInput
      ? globalMiddlewaresInput.split(",")
      : [];

    const isPathFromRoot =
      (await askQuestion(rl, "Is path from root (y/N): ")).toLowerCase() ===
      "y";

    const options = {
      path: endpointPath,
      method,
      action,
      isPublic,
      moduleMiddlewares: moduleMiddlewares,
      globalMiddlewares: globalMiddlewares,
      isPathFromRoot,
    };

    addRouteToModule(moduleName, options);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
};

module.exports = createApi;
