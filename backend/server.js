const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config();
const DB_URL = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(DB_URL)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

const User = mongoose.model("User", new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
}));

app.post("/login", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ status: "ok" });
    } catch (err) {
        res.status(500).json({ status: "error" });
    }
});

app.get("/Hello", (req, res) => {
    res.send("<h1 style='font-family:sans-serif; text-align:center; margin-top:50px;'>Login Successful!</h1>");
});

app.listen(PORT, () => console.log(`Server on Port ${PORT}`));