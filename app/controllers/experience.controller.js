const db = require("../models");
const { experience: Experience } = db;

exports.addExperience = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new Experience({
      designation: req.body.designation,
      companyName: req.body.companyName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      companyUrl: req.body.companyUrl,
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

exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.find({ status: true });
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: experience });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
