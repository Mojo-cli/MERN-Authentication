const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const jwt_sec = "kuchbhilikhdo";

const mongourl =
  "mongodb+srv://adwait:adwait123@cluster0.cezw0oi.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((e) => console.log(e));

require("./UserDetailSchema");

const User = mongoose.model("UserInfo");

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ error: "Already have an account with this email." });
    }
    await User.create({
      name,
      email,
      password: encrypt_password,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { loginMail, loginPassword } = req.body;
  const email = loginMail;

  User.findOne({ email }).then((user) => {
    //if user not exist than return status 400
    if (!user) return res.status(400).json({ msg: "User not exist" });
    //if user exist than compare password
    //password comes from the user
    //user.password comes from the database
    bcrypt.compare(loginPassword, user.password, (err, data) => {
      //if error than throw error
      if (err) throw err;
      //if both match than you can do anything
      if (data) {
        return res.status(200).json({ msg: "Login success" });
      } else {
        return res.status(401).json({ msg: "Invalid credencial" });
      }
    });
  });
});

app.listen(5000, () => {
  console.log("Server Connected");
});
