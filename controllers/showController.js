const showModel = require("../models/showModel");
const bookingModel = require("../models/bookingModel");
const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const validator = require("../middlewares/validator");

//===============================================================================================================//

const createShow = async function (req, res) {
  try {
    let adminId = req.params.adminId;
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

    let { title, price, theatreId, timming, language } = requestBody;

    const showData = { title, price, theatreId, timming, language };
    const show = await showModel.create(showData);
    res.status(201).send({
      status: true,
      message: "show created sucessfully",
      data: show,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, data: err.message });
  }
};

//============================================================================================================================//

const booking = async (req, res) => {
  try {
    let userId = req.params.userId;
    let requestBody = req.body;

    let checkId = validator.isValidObjectId(userId);
    if (!checkId) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Valid admin Id" });
    }

    const searchUser = await userModel.findOne({ _id: userId });
    if (!searchUser) {
      return res
        .status(404)
        .send({ status: false, message: "User does not exist" });
    }
    if (req.userId !== userId) {
      return res
        .status(401)
        .send({ status: false, msg: "unauthorized access" });
    }

    let { title, name, timming, seats } = requestBody;

    let createBody = { title, name, timming, seats };

    const findtitle = await showModel.findOne({ title: title });
    if (!findtitle) {
      return res.status(400).send({ status: false, data: "title not found" });
    }
    let totalSeats = findtitle.totalSeats;

    let availableSeats = totalSeats - seats;
    
    let bookedShow = 100 - availableSeats;
    totalSeats = availableSeats;

    if (availableSeats < 0) {
      return res.status(400).send({ status: false, msg: "HOUSEFULL" });
    }

    let findShow = await showModel.findOneAndUpdate(
      { title: title },
      {
        $set: {
          unavailableSeats: bookedShow,
          availableSeats: availableSeats,
          totalSeats: availableSeats,
        },
        new: true,
      }
    );

    createseat = await bookingModel.create(createBody);
    return res.status(201).send({
      status: true,
      message: "ticket booked successfully",
      data: createseat,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, data: err.message });
  }
};

//===============================================================================================================//

const showSeats = async (req, res) => {
  try {
    let title = req.query.title;

    const findtitle = await showModel.findOne({ title: title });
    if (!findtitle) {
      return res
        .status(400)
        .send({ status: false, msg: "No such movie Present" });
    }

    let find = await showModel
      .find({ title: title })
      .select({ unavailableSeats: 1, availableSeats: 1 });
    return res.status(200).send({ data: find });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, data: err.message });
  }
};

//================================================================================================================//

module.exports = {
  createShow,
  booking,
  showSeats,
};
