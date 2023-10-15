const mongoose = require("mongoose");

const About = mongoose.model(
  "About",
  new mongoose.Schema({
    title: {
      type: String,
      default: "I am Software Developer & Web Developer",
    },
    email: {
      type: String,
      default: "naveen.ojha.rewa@gmail.com",
    },
    number: {
      type: String,
      default: "+91 8770434284",
    },
    address: {
      type: String,
      default: "New Delhi, India",
    },
    specialty: {
      type: Array,
      default: "Developer",
    },
    freelance: {
      type: String,
      default: "Available",
    },
    footerAbout: {
      type: String,
      default:
        "A Full Stack Developer. If you want to create a website or you have some queries, then feel free to contact me.",
    },
    happyClient: {
      type: Number,
      default: 15,
    },
    projectDone: {
      type: Number,
      default: 50,
    },
    workHours: {
      type: Number,
      default: 8250,
    },
    status: {
      type: Boolean,
      default: true,
    },
  })
);

module.exports = About;
