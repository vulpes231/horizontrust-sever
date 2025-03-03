const { Schema, default: mongoose } = require("mongoose");
const User = require("./User");
const Account = require("./Account");

const transactionSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    accountGroup: {
      type: String,
    },
    description: {
      type: String,
    },
    username: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.statics.createTransaction = async function (
  userId,
  trnxData
) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    const parsedAmount = parseFloat(trnxData.amount);

    const recipientAcct = await Account.findOne({
      accountNum: trnxData.accountNum,
    });

    if (trnxData.type === "credit") {
      recipientAcct.balance += parsedAmount;
    } else {
      if (recipientAcct.balance < parsedAmount) {
        throw new Error("Insufficient fund to complete transaction");
      }
      recipientAcct.balance -= parsedAmount;
    }

    const newTrnx = {
      owner: user._id,
      amount: trnxData.amount,
      accountGroup: recipientAcct.group,
      username: user.username,
      status: "completed",
      description: trnxData.memo || "",
    };

    await Transaction.create(newTrnx);

    await recipientAcct.save();

    return newTrnx;
  } catch (error) {
    throw error;
  }
};

transactionSchema.statics.getUserTransactions = async function (userId) {
  try {
    const userTransactions = await Transaction.find({ owner: userId });
    if (!userTransactions) {
      throw new Error("User has no transactions");
    }
    return userTransactions;
  } catch (error) {
    throw error;
  }
};

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
