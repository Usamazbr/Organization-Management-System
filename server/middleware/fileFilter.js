const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// User token authentication
const adminFilter = async ({ params }, res, next) => {
  console.log(params);
  const { token } = JSON.parse(params.obj);
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }
  //   const token = authorization.split(" ")[1];

  try {
    // const { _id } = jwt.verify(token, process.env.SECRET);

    // req.user = await User.findOne({ _id });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = adminFilter;
