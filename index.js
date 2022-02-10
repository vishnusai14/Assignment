require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./Database/dbInit");

const url = `mongodb+srv://Vishnu_Sai:${process.env.DBPASS}@cluster0.hkghe.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

db.dbInit(url);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9090;

//User Routes
app.use("/api/v1/user", require("./Router/userRouter").Router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server Started");
});
