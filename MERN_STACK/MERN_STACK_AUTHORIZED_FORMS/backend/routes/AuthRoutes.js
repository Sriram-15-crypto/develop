const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/FORGOTPASSWORD", authController.forgotPassword);
router.post("/RESETPASSWORD/:token", authController.resetPassword);
router.post("/", authController.login);

module.exports = router;
