const {
  createNewTrnx,
  fetchUserTrnx,
  getTrnxByAccount,
  transferFunds,
} = require("../handlers/transaction/trnxHandler");

const { Router } = require("express");

const router = Router();

router.route("/").get(fetchUserTrnx).post(createNewTrnx);
router.route("/:accountNum").get(getTrnxByAccount);
router.route("/transfer").post(transferFunds);

module.exports = router;
