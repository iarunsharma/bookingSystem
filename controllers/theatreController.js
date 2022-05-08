const theatreModel = require("../models/theatreModel");
const adminModel = require('../models/adminModel')
const validator = require('../middlewares/validator')

const createTheatre = async function (req, res) {
  try {
    let adminId = req.params.adminId
    let requestBody = req.body;

    let checkId = validator.isValidObjectId(adminId);
    if (!checkId) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Valid admin Id" });
    }
    

    const searchAdmin = await adminModel.findOne({ _id: adminId });
    if (!searchAdmin) {
      return res
        .status(404)
        .send({ status: false, message: "Admin does not exist" });
    }
    if (req.adminId !== adminId) {
      return res
        .status(401)
        .send({ status: false, msg: "unauthorized access" });
    }
    let { name, address } = requestBody;
    const theatreData = { name, address };
    const theatre = await theatreModel.create(theatreData);
    res.status(201).send({
      status: true,
      message: " theatre created sucessfully",
      data: theatre,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, data: err.message });
  }
};

module.exports = { createTheatre };
