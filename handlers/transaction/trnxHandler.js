const Transaction = require("../../models/Transactions");

const createNewTrnx = async (req, res) => {
  const { userId, memo, amount, accountNum, type } = req.body;
  if (!userId || !memo || !amount || !accountNum || !type)
    return res.status(400).json({ message: "Incomplete Data" });
  try {
    const trnxData = { memo, amount, accountNum, type };

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
    res.status(201).json({ userTrnxs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNewTrnx, fetchUserTrnx };
