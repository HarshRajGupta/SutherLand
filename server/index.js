const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const User = require("./models/User");
const adminRouter = require("./routes/admin");
const quizRouter = require("./routes/quiz");
const questionsRouter = require("./routes/questions");

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
app.use(express.json());
app.use(cookieParser());
// app.use(
//     cors({
//         credentials: true,
//         origin: "https://sutherland.onrender.com",
//     })
// );
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/quiz", quizRouter);
app.use("/question", questionsRouter);

app.get("/", (req, res) => {
    const { token } = req.cookies;
    console.log('DEBUG: /get')
    try {
        console.log(req.cookies)
        console.log('Signed Cookies: ', req.signedCookies)
        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if (err) throw err;
                const user = await User.findById(
                    userData.id
                );
                // if (!user || !user.firstName || !user.lastName || !user.email || user._id || !user.isAdmin) return res.json(null);
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

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`DEBUG: Server listening on port ${port}`)
        });
    } catch (error) {
        console.log(error);
    }
};

start();
