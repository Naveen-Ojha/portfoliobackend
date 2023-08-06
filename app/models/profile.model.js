const mongoose = require("mongoose");

const Profile = mongoose.model(
  "Profile",
  new mongoose.Schema(
    {
      name: {
        type: String,
        default: "Naveen Kant Ojha",
      },
      description: {
        type: String,
      },
      designation: {
        type: String,
        default: "Software Developer",
      },
      image: {
        type: String,
      },
      experience: {
        type: Number,
      },
      resume: {
        type: String,
      },
      fbUrl: {
        type: String,
        default: "https://www.facebook.com/profile.php?id=100006939617509",
      },
      twitterUrl: {
        type: String,
        default: "https://twitter.com/TheNaveenOjha",
      },
      linkedinUrl: {
        type: String,
        default: "https://www.linkedin.com/in/naveen-kant-ojha-13608b189/",
      },
      youtubeUrl: {
        type: String,
        default: "https://www.youtube.com/@naveenojha32",
      },
      instagramUrl: {
        type: String,
        default: "https://www.instagram.com/naveenojha46/",
      },
      logo: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

module.exports = Profile;
