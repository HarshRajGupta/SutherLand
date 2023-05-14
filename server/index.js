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
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { firstName, lastName, email, _id, isAdmin } = await User.findById(
                userData.id
            );
            res.json({ firstName, lastName, email, _id, isAdmin });
        });
    } else {
        res.json(null);
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
