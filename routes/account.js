const { getAccountByUserId } = require("../handlers/account/accounthandler");

const { Router } = require("express");

const router = Router();

router.route("/").get(getAccountByUserId);

module.exports = router;
