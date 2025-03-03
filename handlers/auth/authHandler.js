const User = require("../../models/User");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please enter both username and password!" });
  }

  try {
    const loginData = { username, password };
    const { accessToken, refreshToken, user } = await User.loginUser(loginData);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const enrollUser = async (req, res) => {
  const {
    username,
    password,
    email,
    firstname,
    lastname,
    address,
    phone,
    confirmPassword,
  } = req.body;
  // console.log("req.body", req.body);
  if (
    !username ||
    !password ||
    !email ||
    !firstname ||
    !lastname ||
    !address ||
    !phone ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "Invalid user data!" });
  }
  try {
    const userData = {
      username,
      password,
      email,
      firstname,
      lastname,
      address,
      phone,
      confirmPassword,
    };

    await User.registerUser(userData);

    res.status(200).json({
      message: `User ${username} account created!`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, enrollUser };
