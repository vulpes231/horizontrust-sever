const { generateAccount } = require("../utils/generateAccount");
const Account = require("./Account");
const { Schema, default: mongoose } = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.loginUser = async function (loginData) {
  try {
    const user = await User.findOne({
      username: loginData.username,
    });

    if (!user) {
      throw new Error("User does not exist!");
    }

    // Ensure password matches
    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password
    );
    if (!passwordMatch) {
      throw new Error("Invalid username or password!");
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { username: user.username, userId: user._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { username: user.username, userId: user._id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    const userData = {
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
    };

    return {
      accessToken,
      refreshToken,
      user: userData,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userSchema.statics.logoutUser = async function (userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exist!");
    }

    user.refreshToken = null;
    await user.save();
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while logging out.");
  }
};

// get user
userSchema.statics.getUser = async function (userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exist!");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// edit user
userSchema.statics.editUser = async function (userId, userData) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exist!");
    }
    if (userData.firstname) {
      user.firstname = userData.firstname;
    }
    if (userData.lastname) {
      user.lastname = userData.lastname;
    }
    if (userData.address) {
      user.address = userData.address;
    }

    if (userData.phone) {
      user.phone = userData.phone;
    }

    await user.save();
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userSchema.statics.registerUser = async function (userData) {
  try {
    const userNameTaken = await User.findOne({
      username: userData.username,
    });
    if (userNameTaken) {
      throw new Error("Username taken!");
    }
    const emailTaken = await User.findOne({
      email: userData.email,
    });
    if (emailTaken) {
      throw new Error("Email registered!");
    }

    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match!");
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      username: userData.username,
      password: hashPassword,
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      address: userData.address,
      phone: userData.phone,
    });

    const checkingAccount = await Account.create({
      owner: newUser._id,
      name: "everyday checking",
      username: newUser.username,
      group: "checking",
      accountNum: generateAccount(),
    });

    const savingsAccount = await Account.create({
      owner: newUser._id,
      name: "elite savings",
      username: newUser.username,
      group: "savings",
      accountNum: generateAccount(),
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userSchema.statics.changePassword = async function (userId, passwordData) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exist!");
    }
    const passwordMatch = await bcrypt.compare(
      passwordData.password,
      user.password
    );
    if (!passwordMatch) {
      throw new Error("Invalid password!");
    }
    const hashPassword = await bcrypt.hash(passwordData.newPassword, 10);
    user.password = hashPassword;
    await user.save();
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
