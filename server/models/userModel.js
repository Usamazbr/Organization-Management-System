const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    image: { type: String, required: false },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // trim: true,
      // maxlength: [50, "Name must be less than 50 Char"],
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Number,
      required: true,
    },
    approve: {
      type: Boolean,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    path: {
      //later
      type: String,
      required: false,
    },
    position: [String],
    permissions: [Number],
    leavedata: { annual: [Number], casual: [Number], sick: [Number] },
    // notifies:[{}],
    admin_id: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// signup
userSchema.statics.signup = async function (body) {
  const { username, email, password, organization } = body;

  // console.log(body);

  // validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  if (!organization) {
    throw Error("Organization is required");
  }
  const already = await this.findOne({ email });
  if (already) {
    throw Error("Email is already in use");
  }

  //hash
  const enrate = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, enrate);

  //creating user
  const user = await this.create({ ...body, password: hash });

  return user;
};

// login
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const already = await this.findOne({ email });
  if (!already) {
    throw Error("Incorrect email");
  }
  const compare = await bcrypt.compare(password, already.password);
  if (!compare) {
    throw Error("Incorrect password");
  }
  return already;
};

module.exports = mongoose.model("Employee", userSchema);
