const fs = require("fs");
const path = require("path");

const createCron = (fileName, pattern) => {
  if (!path.extname(fileName)) {
    fileName += ".js";
  }

  const filePath = path.join("crons", fileName);
  
  if (fs.existsSync(filePath)) {
    console.warn(` File "${filePath}" already exists`);
    return; // Exit function if file already exists
  }

  const Content = 
  `const cron = require('node-cron');

  cron.schedule('${pattern}', () => {
    console.log("Dummy Cron"); 
  }) 
  
  `;

  fs.writeFileSync(filePath, Content);

  console.log(`Cron is created successfully: ${filePath}`);
};

module.exports = createCron;