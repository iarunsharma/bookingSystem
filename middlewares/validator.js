const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const validator = require("email-validator");
const theatreModel = require("../models/theatreModel");

const isvalid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isvalidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const isValidSyntaxOfEmail = function (value) {
  if (!validator.validate(value)) {
    return false;
  }
  return true;
};

const validAge = function isInteger(value) {
  if (value < 0) return false;
  if (value % 1 == 0) return true;
};

//--------------------------------------------------------------------------------------------------------------------//

const checkUser = async (req, res, next) => {
  try {
    let requestBody = req.body;
    if (!isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Data" });
    }
    let { name, age, email, password } = requestBody;

    if (!isvalid(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the name " });
    }

    if (!validAge(age)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the valid age " });
    }

    if (!isvalid(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the email" });
    }

    if (!isValidSyntaxOfEmail(email)) {
      return res
        .status(404)
        .send({ status: false, message: "Please provide a valid Email Id" });
    }
    const isEmailAlreadyUsed = await userModel.findOne({ email });

    if (isEmailAlreadyUsed) {
      return res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
    }

    if (!isvalid(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the password" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

//=================================================================================================================//

const checkShow = async (req, res, next) => {
  try {
    let requestBody = req.body;
    if (!isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Data" });
    }
    let { title, price,theatreId, timming , language } = requestBody;

    if (!isvalid(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the title " });
    }

    if (!isvalid(timming)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the timming " });
    }

    if (!isvalid(language)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the language " });
    }

    if (!validAge(price)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the valid price " });
    }

    if(!isValidObjectId(theatreId)){
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the valid theatreId " });
    }

    let findTheatre = await theatreModel.findOne({_id:theatreId});
    if(!findTheatre) {
      return res.status(400).send({ status: false, msg: "theatre not found " });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

//=================================================================================================================//

const bookingCheck = async (req, res, next) => {
  try {
    let requestBody = req.body;
    if (!isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Data" });
    }
    let { title, name, timming, seats } = requestBody;

    if (!isvalid(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the title " });
    }

    if (!isvalid(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the name " });
    }

    if (!isvalid(timming)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the timming " });
    }

    if (!validAge(seats)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the valid seats " });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

//==================================================================================================================//

const theatreCheck = async (req, res, next) => {
  try {
    let requestBody = req.body;
    if (!isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Data" });
    }
    let { name, address } = requestBody;

    if (!isvalid(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the name " });
    }

    if (!isvalid(address)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the address " });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

//==================================================================================================================//

module.exports = {
  isvalid,
  isvalidRequestBody,
  isValidSyntaxOfEmail,
  isValidObjectId,
  checkUser,
  checkShow,
  bookingCheck,
  theatreCheck,
};
