const express = require("express");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const adminRoute = require("./routes/admin");
const userRoutes = require("./routes/user");
const fileRoute = require("./routes/filefetch");

const cors = require("cors");

const app = express();

// middleware funcs
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cors({}));

app.use(loggerCon);

function loggerCon({ method, path }, _, next) {
  console.log(`\x1b[33m` + method + `:\x1b[0m`, `\x1b[30m` + path + `\x1b[0m`);
  next();
}

// Main routes
// app.use("/api/", teacRoute);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/files", fileRoute);

// connect to db
mongoose
  .connect(process.env.DATABSE_CONNECT)
  .then(() => {
    console.log("connected to \x1b[34mMongoDb\x1b[0m");

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening to port:\x1b[33m", process.env.PORT + "\x1b[0m");
    });
  })
  .catch((err) => {
    console.log(err);
  });
