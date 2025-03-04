const {
  logoutClient,
  fetchUser,
  updatePassword,
  updateUser,
} = require("../handlers/user/userHandler");

const { Router } = require("express");

const router = Router();

router.route("/").get(fetchUser).put(updateUser);
router.route("/logout").put(logoutClient);
router.route("/changepass").post(updatePassword);

module.exports = router;
