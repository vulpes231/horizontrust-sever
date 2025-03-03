const {
  createNewTrnx,
  fetchUserTrnx,
} = require("../handlers/transaction/trnxHandler");

const { Router } = require("express");

const router = Router();

router.route("/").get(fetchUserTrnx).post(createNewTrnx);

module.exports = router;
