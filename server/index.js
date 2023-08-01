const express = require("express");
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const User = require("./models/User");

const apiRouter = require("./routes");

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
app.use(express.json());
app.use(cookieParser());

app.use(express.static("view"));

app.get("/api", (req, res) => {
  const { token } = req.cookies;
  // console.log(token)
  // console.log("DEBUG: /get");
  try {
    // console.log(req);
    // console.log("Signed Cookies: ", req.signedCookies);
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const user = await User.findById(userData.id);
        console.log(user);
        if (
          !user ||
          !user.firstName ||
          !user.lastName ||
          !user.email ||
          !user._id
        )
          return res.json(null);
        const { firstName, lastName, email, _id, isAdmin } = user;
        return res.json({ firstName, lastName, email, _id, isAdmin });
      });
    } else {
      return res.json(null);
    }
  } catch (e) {
    console.error(e);
    return res.json(e.message);
  }
});

app.use("/api", apiRouter);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`DEBUG: Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
