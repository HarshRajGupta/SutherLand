const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log({ firstName, lastName });
  try {
    const userDoc = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    jwt.sign(
      {
        email: userDoc.email,
        id: userDoc._id,
      },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(userDoc);
      }
    );
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
};

const logoutUser = async (req, res) => {
  res.cookie("token", "").json(true);
};

const changePassword = async (req, res) => {
  console.log(req.user);
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    // Check if current password is correct
    const user = await User.findById(userId);
    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    console.log("updated");
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const changeProfile = async (req, res) => {
  const { firstName, lastName, email, phoneNo } = req.body;
  const userId = req.user.id;

  try {
    await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      phoneNo,
    });
    console.log("updated profile details");
    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  changeProfile,
};
