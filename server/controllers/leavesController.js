const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
// const { readFile } = require("fs").promises;
const User = require("../models/userModel");
const Leaves = require("../models/leavesModel");

//TODO general leave function
const getLeaves = async (_, res) => {
  try {
    fs.readFile("./assets/leaves.json", "utf-8", (err, jsonString) => {
      if (!err) {
        const data = JSON.parse(jsonString);
        // console.log("\x1b[33madminControl line 22:\x1b[0m ");
        // console.log(data);
        res.status(200).send(data);
      } else {
        console.log(err);
      }
    });
  } catch ({ message }) {
    res.status(404).json({ err: message });
  }
};

const patchLeaves = async ({ body }, res) => {
  // let data;
  fs.readFile("./assets/leaves.json", "utf-8", (err, jsonString) => {
    if (!err) {
      const oldLeaveData = JSON.parse(jsonString);
      // console.log(oldLeaveData);
      const newlist = body.map((leaveObj, index) => {
        if (leaveObj.amount === 0) {
          return oldLeaveData[index];
        } else {
          return leaveObj;
        }
      });
      try {
        fs.writeFile(
          "./assets/leaves.json",
          JSON.stringify(newlist, null, 2),
          (err) => console.log(err)
        );
        res.status(200).send(newlist);
      } catch (err) {
        res.status(404).json({ err: err });
      }
      // console.log(newlist);
    } else {
      console.log(err);
    }
  });
};

//TODO individual leave functions
const leaveRequest = async ({ body, user: { _id } }, res) => {
  console.log(body);
  const { duration, typeofLeave, month, comment, year, start, end } = body;
  try {
    if (duration === 0) {
      throw Error("Duration not defined");
    }
    if (typeofLeave === "") {
      throw Error("Specify type of leave");
    }
    if (comment === "") {
      throw Error("Specify reason");
    }

    const allLeaves = await Leaves.find({ user_id: _id });
    const overlap = allLeaves.filter((currVal) => {
      if (currVal.month === month && currVal.year === year) {
        if (currVal.start <= end && currVal.end >= start) {
          return true;
        }
      }
      return false;
    });
    if (overlap[0]) {
      throw Error("Dates are overlaping with a previous leave");
    }

    const dashData = await addLeavetoUserDashboard({
      duration,
      typeofLeave,
      _id,
    });
    const data = await Leaves.create({ ...body });
    data.save();
    console.log(dashData);
    res.status(200).send({ data, dashData });
  } catch ({ message }) {
    console.log(message);
    res.status(400).json({ error: message });
  }
};

//? Standalone function
const addLeavetoUserDashboard = async ({ duration, typeofLeave, _id }) => {
  console.log(duration, typeofLeave, _id);
  const { leavedata } = await User.findById({ _id });
  console.log(await leavedata, `\x1b[33mline 84\x1b[0m`);
  let newDuration = duration;
  let updatedLeaveData;
  let newAvailable = 12;
  let data;
  let allowedLeaves = [];

  try {
    // fetchData();
    const fileData = await readFile("./assets/leaves.json", "utf8");
    allowedLeaves = JSON.parse(fileData);
    switch (typeofLeave) {
      case "Annual":
        newAvailable = allowedLeaves[0].amount - duration;
        console.log(newAvailable, `\x1b[33mline 116\x1b[0m`);
        if (leavedata.annual[0]) {
          newDuration = leavedata.annual[0] + duration;
          newAvailable = leavedata.annual[1] - duration;
        }
        if (newAvailable < 0) {
          throw Error(`Leaves exceeded, talk to your supervisor`);
        }
        updatedLeaveData = [newDuration, newAvailable];

        data = await User.findByIdAndUpdate(
          { _id },
          { $set: { "leavedata.annual": updatedLeaveData } },
          { new: true }
        );
        break;
      case "Casual":
        newAvailable = allowedLeaves[1].amount - duration;
        console.log(newAvailable);
        if (leavedata.casual[0]) {
          newDuration = leavedata.casual[0] + duration;
          newAvailable = leavedata.casual[1] - duration;
        }
        if (newAvailable < 0) {
          throw Error(`Leaves exceeded, talk to your supervisor`);
        }
        updatedLeaveData = [newDuration, newAvailable];

        data = await User.findByIdAndUpdate(
          { _id },
          { $set: { "leavedata.casual": updatedLeaveData } },
          { new: true }
        );
        break;
      case "Sick":
        newAvailable = allowedLeaves[2].amount - duration;
        console.log(newAvailable);
        if (leavedata.sick[0]) {
          newDuration = leavedata.sick[0] + duration;
          newAvailable = leavedata.sick[1] - duration;
        }
        if (newAvailable < 0) {
          throw Error(`Leaves exceeded, talk to your supervisor`);
        }
        updatedLeaveData = [newDuration, newAvailable];

        data = await User.findByIdAndUpdate(
          { _id },
          { $set: { "leavedata.sick": updatedLeaveData } },
          { new: true }
        );
        break;

      default:
        throw Error("Undefined leavetype");
      // break;
    }

    console.log(data.leavedata);
    return data.leavedata;
  } catch ({ message }) {
    console.log(message);
    throw Error(message);
  }
};

//fetch individual leave
const getIndlLeaveData = async (_, res) => {
  try {
    const data = await Leaves.find();
    // console.log(data);
    res.status(200).send({ data });
  } catch ({ message }) {
    res.status(400).json({ err: message });
  }
};

//TODO some greesy shit

module.exports = { getLeaves, patchLeaves, leaveRequest, getIndlLeaveData };
