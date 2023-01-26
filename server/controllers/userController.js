const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");

const Notify = require("../models/notifyModel");

// TODO add notifications
// TODO complete user data?

// create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async ({ body: { email, password } }, res) => {
  try {
    const user = await User.login(email, password);

    // creating token
    const token = createToken(user._id);
    const {
      _id,
      username,
      admin,
      approve,
      organization,
      path,
      permissions,
      leavedata,
    } = user;

    let owner_id;

    if (admin !== 1) {
      const { admin_id } = user;
      owner_id = admin_id;
    }

    res.status(200).json({
      _id,
      username,
      email,
      token,
      admin,
      approve,
      organization,
      path,
      permissions,
      leavedata,
      admin_id: owner_id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
  }
};

// check all data
const getAllData = async ({ params }, res) => {
  const id = params.user_id;
  try {
    const data = await User.find({ admin_id: id });
    // console.log("\x1b[33muserControl line 49:\x1b[0m ");
    // console.log(data);
    if (res) {
      res.status(200).send({ data });
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

// // check all notifications
// const getAllNots = async (req, res) => {
//   const user_email = req.params.User;
//   const admin_id = await User.find({ email: user_email }).select("_id");

//   const nots = await Notify.find({ admin_id: admin_id[0]._id.toString() });

//   try {
//     res.status(200).send(nots);
//   } catch (error) {
//     res.status(404).json({ error: "No notifications" });
//   }
// };

// // insert Hierarchy
// const setHier = async (req, res) => {
//   const admin_id = req.params.User;
//   console.log(admin_id);

//   const parent = await User.findById(admin_id);
//   let childPath;
//   console.log(parent.email);
//   if (parent.path) {
//     childPath = parent.path + parent.email + ",";
//   } else {
//     childPath = "Top," + parent.email + ",";
//   }
//   const child_id = await User.find({ email: req.body.email }).select("_id");
//   console.log(child_id);
//   const appr = await User.findByIdAndUpdate(child_id, {
//     path: childPath,
//   });
//   console.log(appr);
//   // const Not1 = await User.findOneAndDelete({ _id: admin_id });

//   if (!appr) {
//     return res.status(400).json({ error: "No such user" });
//   }
//   res.status(200).json(appr);
// };

// // delete a notification
// const delNots = async (req, res) => {
//   const Nots_id = req.params.User;
//   console.log(Nots_id);

//   const reqr = await Notify.findById(Nots_id);
//   console.log(reqr.req_id);
//   const appr = await User.findByIdAndUpdate(reqr.req_id, {
//     approve: true,
//   });
//   const Not1 = await Notify.findOneAndDelete({ _id: Nots_id });

//   if (!Not1) {
//     return res.status(400).json({ error: "No such task" });
//   }
//   res.status(200).json(appr);
// };

// // get juniors only
// const getJuniors = async (req, res) => {
//   const user_email = req.params.User;
//   try {
//     const data1 = await User.find({ email: user_email });
//     const data2 = await User.find({ path: { $regex: user_email } });
//     const data = data1.concat(data2);
//     res.status(200).send({ data });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// };

// // get seniors only
// const getSeniors = async (req, res) => {
//   const user_email = req.params.User;
//   const user_path = await User.find({ email: user_email });
//   const sen_path = user_path[0].path;
//   const user_arr = sen_path?.split(",");
//   // if (user_arr.length > 1) {
//   user_arr.shift();
//   user_arr.pop();
//   console.log(user_arr);
//   try {
//     const data = await User.find({ email: { $in: user_arr } });
//     res.status(200).send({ data });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
//   // } else {
//   //   res.status(200);
//   // }
// };

// signup user

// password generation and assignment

const generatePassword = async () => {
  let length = 10,
    charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&",
    unhashed = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    unhashed += charset.charAt(Math.floor(Math.random() * n));
  }
  unhashed = unhashed + Math.trunc(Math.random() * 1000) + `!`;

  //hash
  const enrate = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(unhashed, enrate);
  const pass = { unhashed, hash };

  return pass;
};

// generate email to send credentials
const sendEmail = async (recipient, sender, password) => {
  console.log("\x1b[33muserControl line 170:\x1b[0m ");
  console.log(
    `Reciever: ` + recipient,
    `\nSender: ` + sender,
    `\nPassword: ` + password,
    `\nzoho password: ` + process.env.EMAIL_TEST_APP_PSWD
  );
  // sending Password
  let transport = nodemailer.createTransport({
    // service: "zoho",
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: sender,
      pass: process.env.EMAIL_TEST_APP_PSWD,
    },
  });

  const message = {
    from: sender, // Sender address
    to: recipient, // List of recipients
    subject: "Your credentials for Employee Managment System (Saas)", // Subject line
    html: `<h2>Email: ${recipient}<br/>Password: ${password}</h2><br/><br/><p>Please don't share this with anyone</p>`, // Plain text body
  };
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};

const signupUser = async ({ body }, res) => {
  approve = false;
  let data = { ...body, approve };
  // console.log(data);
  try {
    if (body.admin_id) {
      const admin = await User.findById({ _id: body.admin_id }).select("email");
      console.log("\x1b[33muserControl line 209:\x1b[0m ");
      console.log(admin);
      if (body.admin !== 1) {
        const { unhashed, hash } = await generatePassword();
        console.log(unhashed, hash);
        await sendEmail(body.email, admin.email, unhashed);
        data = { ...data, password: unhashed };
      }
    }
    const user = await User.signup(data);
    // console.log(user);
    // fetching and notifying all admins
    // const admindata = await User.find({ admin: true, approve: true }).select(
    //   "_id"
    // );
    // // creating notifications
    // for (let id of admindata) {
    //   const notreq = await Notify({
    //     admin_id: id._id,
    //     req_id: user._id,
    //     authapp: "Please approve: " + email,
    //   });
    //   notreq.save();
    // }

    // creating token
    const token = createToken(user._id);
    const {
      _id,
      image,
      username,
      email,
      position,
      admin,
      approve,
      organization,
      permissions,
    } = user;

    res.status(200).json({
      _id,
      image,
      username,
      email,
      position,
      token,
      admin,
      approve,
      organization,
      permissions,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const deleteUser = async ({ params }, res) => {
  const id = params.user_id;

  try {
    const data = await User.findByIdAndDelete({ _id: id });
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const editUser = async ({ params, body }, res) => {
  const id = params.user_id;

  // const { username, age, position, phone, permissions } = body;

  try {
    const data = await User.findByIdAndUpdate({ _id: id }, body, { new: true });
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  getAllData,
  signupUser,
  loginUser,
  deleteUser,
  editUser,
  // getAllNots,
  // delNots,
  // setHier,
  // getJuniors,
  // getSeniors,
};
