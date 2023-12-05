const clientController = require("../controllers/clientController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");
const router = require("express").Router();
router.get("/getCategories", clientController.getCategories);
router.get("/getDrinks", clientController.getDrinks);
router.post("/login", clientController.loginUser);
router.post("/register", clientController.registerUser);
router.post("/createOrder", clientController.createOrder);
router.post("/getOrderByIDKH", clientController.getOrderByIdKhachHang);
router.post(
  "/getOrderDetailByIDDH",
  clientController.getOrderDetailByIdDonHang
);
module.exports = router;
