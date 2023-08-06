const mongoose = require("mongoose");

const Skills = mongoose.model(
  "Skills",
  new mongoose.Schema({
    language: {
      type: Array,
      required: true,
      unique: true,
    },
    languageImg: {
      type: Array,
    },
    languagePercentage: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  })
);

module.exports = Skills;
