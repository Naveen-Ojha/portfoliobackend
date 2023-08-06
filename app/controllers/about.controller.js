const db = require("../models");
const { about: About } = db;

exports.addAbout = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new About({
      title: req.body.title,
      email: req.body.email,
      number: req.body.number,
      address: req.body.address,
      specialty: req.body.specialty,
      freelance: req.body.freelance,
      footerAbout: req.body.footerAbout,
      happyClient: req.body.happyClient,
      projectDone: req.body.projectDone,
      workHours: req.body.workHours,
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

exports.getAbout = async (req, res) => {
  try {
    const about = await About.find();
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: about });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
