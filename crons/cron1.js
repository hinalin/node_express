const cron = require("node-cron");

cron.schedule(" * 5 * * *", () => {
  console.log("Cron1 is running every minute");
});

// cron.schedule(" * * * * * * ", () => {
//   console.log("Cron2 is running every second");
// });

// cron.schedule(" */10 * * * * * ", () => {
//   console.log("Cron3 is running in every 10 seconds");
// });

module.exports = { cron };
