const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//======================== Create employee =================================================================================//

const createAdmin = async function (req, res) {
  try {
    let requestBody = req.body;
    let { name, age, email, password } = requestBody;
    password = await bcrypt.hash(password, saltRounds);
    const adminData = { name, age, email, password };
    const admin = await adminModel.create(adminData);
    res.status(201).send({
      status: true,
      message: "admin created sucessfully",
      data: admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, data: err.message });
  }
};

//======================== log in employee =================================================================================//

const login = async (req, res) => {
  try {
    const Email = req.body.email;
    const Password = req.body.password;

    let admin = await adminModel.findOne({ email: Email });
    if (admin) {
      const { _id, password } = admin;
      const validPassword = await bcrypt.compare(Password, password);
      if (!validPassword) {
        return res.status(400).send({ message: "Invalid Password" });
      }
      let payload = { adminId: _id, email: Email };
      const generatedToken = jwt.sign(payload, "urspayce");
      res.header("user-login-key", generatedToken);
      return res.status(200).send({
        status: true,
        data: { adminId: admin._id, token: generatedToken },
      });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createAdmin,
  login,
};
