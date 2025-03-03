const { Schema, default: mongoose } = require("mongoose");

const accountSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    group: {
      type: String,
    },
    name: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
    },
    accountNum: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.statics.getUserAccounts = async function (userId) {
  try {
    const userAccounts = await Account.find({ owner: userId });
    if (!userAccounts) {
      throw new Error("User has no account");
    }
    return userAccounts;
  } catch (error) {
    throw error;
  }
};

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
