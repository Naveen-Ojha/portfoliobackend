const db = require("../models");
const { homecategory: HomeCategory } = db;

exports.addHomeCategory = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please enter category name or url" });
      return;
    }
    const data = new HomeCategory({
      name: req.body.name,
      url: req.body.url,
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

exports.getHomeCategory = async (req, res) => {
  try {
    const category = await HomeCategory.find({ status: true });
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: category });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
