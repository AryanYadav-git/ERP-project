require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Admin, validate } = require("../DB/user");
const {authenticateJwt} = require('../middlewares/authenticate')

router.get("/ad", (req, res) => {
  console.log("base route");
  res.status(200).json("hello");
});

router.get("/me", authenticateJwt, async (req, res) => {
  console.log(req.user);
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(401).json({message: "Admin doesnt exist"});
    return;
  }
  res.json({
    name: admin.name,
      username: admin.username,
      department: admin.department
  });
});

router.post("/signup", async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send({ message: error.details[0].message });
    // }
    const { username, password } = req.body;
    console.log(req.body);
    const admin = await Admin.findOne({ username });

    if (admin) {
      res.status(403).send({ message: "Admin already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    await new Admin({ ...req.body, password: hashPassword }).save();
    res.status(200).send({ message: "User created successfully" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    // console.log(req.body);
    if (!admin) {
      res.status(400).send({ message: "User not found" });
      return;
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      res.status(400).send({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign({name: admin.name, username: admin.username, department:`${admin.department}` }, process.env.JWTKEY, {expiresIn:'3h'});
    res.status(200).json({message: "Logged in successfully", token: `Bearer ${token}`, department:`${admin.department}`});

  } catch (e) {
    res.status(500).send({message: "Internal server error"});
  }
});

module.exports = router;
