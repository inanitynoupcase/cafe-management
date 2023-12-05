const testingController = require("../controllers/testingController");
const router = require("express").Router();

router.get("/getUserTest", testingController.getUserTest);

router.get("/getSPUserTest", testingController.getSPUserTest);

module.exports = router;
