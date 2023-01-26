const express = require("express");
const multer = require("multer");

//Admin Controller
const {
  getAllroles,
  getAllpermissions,
  createRole,
  //   patchData,
  deleteRole,
} = require("../controllers/adminController");

//Leaves Controller
const {
  getLeaves,
  patchLeaves,
  leaveRequest,
  getIndlLeaveData,
} = require("../controllers/leavesController");

//Files Controller
const {
  createFileObj,
  getFileNames,
  delFiles,
  // getFileController,
} = require("../controllers/filesController");

const adminFilter = require("../middleware/adminFilter");

const router = express.Router();

//middleware
router.use(adminFilter);

// roles and permissions
router.route("/permissions/data").get(getAllpermissions);
router.route("/role/data").get(getAllroles).post(createRole);
router.route("/role/delete/:permission_id").delete(deleteRole);

// files data
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => cb(null, "uploads"),
//   filename: (_, { originalname }, cb) => cb(null, originalname),
// });

const upload = multer({ storage });

router.route("/files/doc").post(upload.array("file"), createFileObj);
router.route("/files/doc/:filearr").delete(delFiles);
// router.get("/files/doc/:filename", getFileController);
router.route("/files/names").get(getFileNames);

// leaves data route
router.route("/leaves/data").get(getLeaves);
router.route("/leaves/record").get(getIndlLeaveData);
router.route("/leaves/data").patch(patchLeaves);
router.route("/leaves/request").post(leaveRequest);

// // patch result
// router.route("/result/:Stu").patch(patchRes);

// // edit and delete data
// router.route("/:Stu").patch(patchData).delete(deleteRole);

module.exports = router;
