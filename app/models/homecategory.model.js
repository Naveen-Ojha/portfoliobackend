const mongoose = require("mongoose");

const HomeCategory = mongoose.model(
  "HomeCategory",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = HomeCategory;
