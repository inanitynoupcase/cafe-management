const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");
const router = require("express").Router();

//GET ALL USERS
router.get("/getAllUsers", verifyToken, userController.getAllUsers);

router.get("/getStaffAccount", verifyToken, userController.getStaffAccount);

router.get("/getStaffInfo", verifyToken, userController.getStaffInfo);

router.get(
  "/getCustomerAccount",
  verifyToken,
  userController.getCustomerAccount
);

router.get("/getCustomerInfo", verifyToken, userController.getCustomerInfo);

router.post("/getCurrentStaffInfo/:user", userController.getCurrentStaffInfo);
// Staff Info
router.post("/createUser", verifyToken, userController.createUser);
router.post("/updateStaffInfo", verifyToken, userController.updateStaffInfo);
router.delete(
  "/deleteUser/:id",
  verifyTokenAndUserAuthorization,
  userController.deleteUser
);
// Staff Account
router.post(
  "/createStaffAccount",
  verifyToken,
  userController.createStaffAccount
);
router.post(
  "/updateStaffAccount",
  verifyToken,
  userController.updateStaffAccount
);
router.delete(
  "/deleteStaffAccount/:id",
  verifyToken,
  userController.deleteStaffAccount
);
// Customer Info
router.post(
  "/createCustomerInfo",
  verifyToken,
  userController.createCustomerInfo
);
router.post(
  "/updateCustomerInfo",
  verifyToken,
  userController.updateCustomerInfo
);
router.delete(
  "/deleteCustomerInfo/:id",
  verifyToken,
  userController.deleteCustomerInfo
);
// Customer Account

router.post(
  "/createCustomerAccount",
  verifyToken,
  userController.createCustomerAccount
);
router.post(
  "/updateCustomerAccount",
  verifyToken,
  userController.updateCustomerAccount
);
router.delete(
  "/deleteCustomerAccount/:id",
  userController.deleteCustomerAccount
);

module.exports = router;
