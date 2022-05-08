const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const showSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    theatreId: {
      type: ObjectId,
      ref:"theatre",
      required: true,
    },

    timming: {
      type: Date,
      required: true,
    },

    totalSeats: {
      type: Number,
      default: 100,
    },

    language: {
      type: String,
      required: true,
    },
    unavailableSeats: {
      type: Number,
    },

    availableSeats: {
      type: Number,
    },
  },
 // { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);
