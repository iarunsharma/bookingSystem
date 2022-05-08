const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
 // { timestamps: true }
);

module.exports = mongoose.model("theatre", theatreSchema);
