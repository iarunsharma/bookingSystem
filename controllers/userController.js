const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//======================== Create employee =================================================================================//

const createUser = async function (req, res) {
  try {
    let requestBody = req.body;
    let { name, age, email, password } = requestBody;
    password = await bcrypt.hash(password, saltRounds);
    const userData = { name, age, email, password };
    const user = await userModel.create(userData);
    res.status(201).send({
      status: true,
      message: "user created sucessfully",
      data: user,
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

    let user = await userModel.findOne({ email: Email });
    if (user) {
      const { _id, password } = user;
      const validPassword = await bcrypt.compare(Password, password);
      if (!validPassword) {
        return res.status(400).send({ message: "Invalid Password" });
      }
      let payload = { userId: _id, email: Email };
      const generatedToken = jwt.sign(payload, "urspayce");
      res.header("user-login-key", generatedToken);
      return res.status(200).send({
        status: true,
        data: { userId: user._id, token: generatedToken },
      });
    } else {
      return res
        .status(401)
        .send({ status: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createUser,
  login,
};
