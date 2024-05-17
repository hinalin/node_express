const mg = require("mongoose");
mg.pluralize(null);

const userSchema = new mg.Schema({
  name: { type: String, required: true },
  age: Number,
  status: Boolean,
  date: { type: Date, default: new Date() },
  gender: { type: String },
});

const User = new mg.model("userrrrr", userSchema);

module.exports = { User } ;