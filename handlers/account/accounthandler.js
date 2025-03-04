const Account = require("../../models/Account");

const getAccountByUserId = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(400).json({ message: "Bad request!" });
  try {
    const userAccounts = await Account.getUserAccounts(userId);
    res.status(200).json({ userAccounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAccountInfo = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(400).json({ message: "Bad request!" });
  const { accountNum } = req.params;
  if (!accountNum) return res.status(400).json({ message: "Bad request!" });
  try {
    const account = await Account.getAccountInfoByNo(accountNum);
    res.status(200).json({ account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAccountByUserId, getAccountInfo };
