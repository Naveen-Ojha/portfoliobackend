const db = require("../models");
const { profile: Profile } = db;

exports.addProfile = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new Profile({
      name: req.body.name,
      description: req.body.description,
      designation: req.body.designation,
      image: req.body.image,
      experience: req.body.experience,
      resume: req.body.resume,
      fbUrl: req.body.fbUrl,
      twitterUrl: req.body.twitterUrl,
      linkedinUrl: req.body.linkedinUrl,
      youtubeUrl: req.body.youtubeUrl,
      instagramUrl: req.body.instagramUrl,
      logo: req.body.logo,
    });
    const saveData = await data.save();
    res.status(201).send({ message: "Data Saved Successfully!" });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.find({ });
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: profile });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
