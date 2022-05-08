const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    timming: {
      type: Number,
    },

    seats: {
      type: Number,
    },
  },
//  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
