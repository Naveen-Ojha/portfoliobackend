const mongoose = require("mongoose");

const Testimonial = mongoose.model(
  "Testimonial",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      desgination: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 5,
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Testimonial;
