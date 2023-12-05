const ordersController = require("../controllers/ordersController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");
const router = require("express").Router();

router.get("/getOrders", verifyToken, ordersController.getOrders);
router.post("/createOrders", verifyToken, ordersController.createOrders);
router.post("/updateOrders", verifyToken, ordersController.updateOrders);
router.delete("/deleteOrders/:id", verifyToken, ordersController.deleteOrders);

router.get("/getOrdersDetail", verifyToken, ordersController.getOrdersDetail);
router.post(
  "/createOrdersDetail",
  verifyToken,
  ordersController.createOrdersDetail
);
router.post(
  "/updateOrdersDetail",
  verifyToken,
  ordersController.updateOrdersDetail
);
router.delete(
  "/deleteOrdersDetail/:id",
  verifyToken,
  ordersController.deleteOrdersDetail
);

module.exports = router;
