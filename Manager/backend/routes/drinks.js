const drinksController = require("../controllers/drinksController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");
const router = require("express").Router();

//CATEGORIES
router.get("/getCategories", verifyToken, drinksController.getCategories);
router.post(
  "/createCategories",
  verifyToken,
  drinksController.createCategories
);
router.post(
  "/updateCategories",
  verifyToken,
  drinksController.updateCategories
);
router.delete(
  "/deleteCategories/:id",
  verifyToken,
  drinksController.deleteCategories
);

//DRINKS INFO
router.get("/getDrinksInfo", verifyToken, drinksController.getDrinksInfo);
router.post(
  "/createDrinksInfo",
  verifyToken,
  drinksController.createDrinksInfo
);
router.post(
  "/updateDrinksInfo",
  verifyToken,
  drinksController.updateDrinksInfo
);
router.delete(
  "/deleteDrinksInfo/:id",
  verifyToken,
  drinksController.deleteDrinksInfo
);

//DRINKS PRICE
router.get("/getDrinksPrice", verifyToken, drinksController.getDrinksPrice);
router.post(
  "/createDrinksPrice",
  verifyToken,
  drinksController.createDrinksPrice
);
router.post(
  "/updateDrinksPrice",
  verifyToken,
  drinksController.updateDrinksPrice
);
router.delete(
  "/deleteDrinksPrice/:id",
  verifyToken,
  drinksController.deleteDrinksPrice
);

module.exports = router;
