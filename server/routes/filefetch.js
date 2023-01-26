const express = require("express");

const { getFileController } = require("../controllers/filesController");
const filFilter = require("../middleware/fileFilter");
const router = express.Router();

//middleware
router.use("/doc/:obj", filFilter);

//Files Controller

router.route("/doc/:obj").get(getFileController);
// router.route("/doc/:filename").get(getFileController);
module.exports = router;
