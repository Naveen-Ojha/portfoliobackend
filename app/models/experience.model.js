const mongoose = require("mongoose");

const Experience = mongoose.model(
  "Experience",
  new mongoose.Schema({
    designation: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyUrl: {
      type: String,
    },
    logo:{
      type:String,
      default:"https://tppwebsolutions.com/wp-content/uploads/logo-demo3.png"
    },
    status: {
      type: Boolean,
      default: true,
    },
  })
);

module.exports = Experience;
