const { readFile } = require("fs");
const Roles = require("../models/roleModel");
// const { getAllData } = require("./userController");

// permissions functions
const getAllpermissions = async (req, res) => {
  readFile("./assets/permissions.json", "utf-8", (err, jsonString) => {
    if (!err) {
      const data = JSON.parse(jsonString);
      try {
        res.status(200).send(data);
      } catch (err) {
        res.status(404).json({ err: err });
      }
    } else {
      console.log(err);
    }
  });
};

//get all roles
const getAllroles = async ({ user }, res) => {
  // console.log("\x1b[33madminControl line 8:\x1b[0m ");
  // console.log(user._id);

  let user_id = user._id;

  if (user.admin_id !== undefined) {
    user_id = user.admin_id;
  }
  try {
    let data = await Roles.find({ user_id }).sort({ updatedAt: 1 });

    res.status(200).send({ data });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

//create roles
const createRole = async ({ body: { Role, Permissions }, user }, res) => {
  try {
    console.log("\x1b[33madminControl line 91:\x1b[0m ");
    console.log(user.admin_id);

    let user_id = user._id;

    if (user.admin_id !== undefined) {
      user_id = user.admin_id;
    }
    if (!Role) {
      throw Error("Bucket name is required");
    }
    if (!Permissions[0]) {
      throw Error("Permissions are required");
    }
    const data = await Roles.create({ user_id, Role, Permissions });
    data.save();
    res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

//delete roles
const deleteRole = async ({ params }, res) => {
  const id = params.permission_id;

  try {
    const data = await Roles.findByIdAndDelete({ _id: id });
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  getAllpermissions,
  createRole,
  getAllroles,
  deleteRole,
};
