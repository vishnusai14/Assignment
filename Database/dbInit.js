const mongoose = require("mongoose");

const dbInit = (url) => {
  mongoose
    .connect(url)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  dbInit: dbInit,
};
