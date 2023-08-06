const db = require("../models");
const { project: Project } = db;

exports.addProject = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new Project({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
      status: req.body.status,
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

exports.getProject = async (req, res) => {
  try {
    const project = await Project.find({status:true});
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: project });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
