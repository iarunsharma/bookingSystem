const jwt = require("jsonwebtoken");

//-----------------------------------------------------------------------------//

const mwAdmin = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let decodedToken = jwt.verify(token, "urspayce");
    if (decodedToken) {
      req.adminId = decodedToken.adminId;
      next();
    } else {
      res.send({ status: false, message: "Token not valid" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//=============================================================================================================//

const mwUser = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let decodedToken = jwt.verify(token, "urspayce");
    if (decodedToken) {
      req.userId = decodedToken.userId;
      next();
    } else {
      res.send({ status: false, message: "Token not valid" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//-----------------------------------------------------------------------------//
module.exports = { mwAdmin, mwUser };
