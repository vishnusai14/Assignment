const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  hobbies: {
    type: String,
  },
});

const userModel = mongoose.model("User", User);

module.exports = {
  userModel,
};
