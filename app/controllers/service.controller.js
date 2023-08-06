const db = require("../models");
const { service: Service } = db;

exports.addService = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new Service({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
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

exports.getService = async (req, res) => {
  try {
    const service = await Service.find({status:true});
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: service });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
