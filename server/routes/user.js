const express = require("express");
const router = express.Router();

// controller functions
const {
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
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// check user data
router.route("/data/:user_id").get(getAllData);
// router.route("/data/juniors/:User").get(getJuniors);
// router.route("/data/seniors/:User").get(getSeniors);

// edit User
router.route("/data/edit/:user_id").patch(editUser);

// delete User
router.route("/data/delete/:user_id").delete(deleteUser);

// // get notificions
// router.route("/Nots/:User").get(getAllNots).delete(delNots);

// //ID requests
// router.route("/:User");
// router.route("/hier/:User").patch(setHier);

module.exports = router;
