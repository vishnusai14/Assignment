const express = require("express");
const Router = express.Router();
const userService = require("../UserServices/userServices");

//Get all the user From the database

Router.get("/getUsers", (req, res) => {
  userService
    .getUsers()
    .then((response) => {
      res.status(200).send({ data: response });
      res.end();
    })
    .catch((err) => {
      res.status(500).send({ err: "Server Error" });
      res.end();
    });
});

//Save a user to the DataBase
Router.post("/addUser", (req, res) => {
  const { name, email, phoneNumber, hobbies } = req.body;
  userService
    .addUser(name, email, phoneNumber, hobbies)
    .then((response) => {
      res.status(200).send({ data: "User Saved Succesfully" });
      res.end();
    })
    .catch((err) => {
      res.status(500).send({ err: "Server Error" });
      res.end();
    });
});

Router.post("/updateUser", (req, res) => {
  const { id, name, email, phoneNumber, hobbies } = req.body;
  userService
    .updateUser(id, name, email, phoneNumber, hobbies)
    .then((result) => {
      res.status(200).send({ data: "User Updated Succesfully" });
      res.end();
    })
    .catch((err) => {
      res.status(500).send({ err: "Server Error" });
      res.end();
    });
});

Router.delete("/deleteUser", (req, res) => {
  const { id } = req.body;
  userService
    .deleteUser(id)
    .then((result) => {
      res.status(200).send({ data: "User Deleted Succesfully" });
      res.end();
    })
    .catch((err) => {
      res.status(500).send({ err: "Server Error" });
      res.end();
    });
});

Router.post("/sendEmail", (req, res) => {
  const { users } = req.body;
  userService
    .sendEmail(users)
    .then((result) => {
      res.status(200).send({ data: "Email Sent Succesfully" });
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ data: "Cannot Sent Mail" });
      res.end();
    });
});

module.exports = {
  Router: Router,
};
