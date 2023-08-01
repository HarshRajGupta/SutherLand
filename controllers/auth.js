const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
                console.log({ token });
                res.cookie("token", token).json(userDoc);
            }
        );
        res.json(userDoc);
    } catch (e) {
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(422).json("user already exists");
        } else {
            res.status(422).json("Registration failed!")
        }
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
                    res.cookie("token", token)
                    res.json(userDoc);
                }
            );
        } else {
            res.status(422).json("pass not ok");
        }
    } else {
        res.status(422).json("not found");
    }
};

const logoutUser = async (req, res) => {
    res.cookie("token", "").json(true);
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
