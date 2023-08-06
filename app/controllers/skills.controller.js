const db = require("../models");
const { skills: Skills } = db;

exports.addSkills = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new Skills({
      language: req.body.language,
      languageImg: req.body.languageImg,
      languagePercentage: req.body.languagePercentage,
      status: req.body.status,
    });
    const saveData = await data.save();
    res.status(201).send({ message: "Data Saved Successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skills.find({ status: true });
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: skills });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
