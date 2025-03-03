const { enrollUser, loginUser } = require("../handlers/auth/authHandler");

const { Router } = require("express");

const router = Router();

router.route("/login").post(loginUser);
router.route("/enroll").post(enrollUser);

module.exports = router;
