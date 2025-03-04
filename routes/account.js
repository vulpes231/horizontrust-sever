const {
  getAccountByUserId,
  getAccountInfo,
} = require("../handlers/account/accounthandler");

const { Router } = require("express");

const router = Router();

router.route("/").get(getAccountByUserId);
router.route("/:accountNum").get(getAccountInfo);

module.exports = router;
