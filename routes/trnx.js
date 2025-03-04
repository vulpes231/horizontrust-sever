const {
  createNewTrnx,
  fetchUserTrnx,
  getTrnxByAccount,
} = require("../handlers/transaction/trnxHandler");

const { Router } = require("express");

const router = Router();

router.route("/").get(fetchUserTrnx).post(createNewTrnx);
router.route("/:accountNum").get(getTrnxByAccount);

module.exports = router;
