const Transaction = require("../../models/Transactions");

const createNewTrnx = async (req, res) => {
  const { userId, memo, amount, accountNum, type, customDate } = req.body;
  if (!userId || !memo || !amount || !accountNum || !type || !customDate)
    return res.status(400).json({ message: "Incomplete Data" });
  try {
    const trnxData = { memo, amount, accountNum, type, customDate };

    await Transaction.createTransaction(userId, trnxData);
    res.status(201).json({ message: "Transaction created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const fetchUserTrnx = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(400).json({ message: "Bad request!" });
  try {
    const userTrnxs = await Transaction.getUserTransactions(userId);
    res.status(200).json({ userTrnxs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getTrnxByAccount = async (req, res) => {
  const userId = req.userId;

  if (!userId) return res.status(400).json({ message: "Bad request!" });

  const { accountNum } = req.params;
  if (!accountNum) return res.status(400).json({ message: "Bad request!" });
  try {
    const acctTrnxs = await Transaction.find({ accountNum });
    res.status(200).json({ acctTrnxs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNewTrnx, fetchUserTrnx, getTrnxByAccount };
