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
    const category = await HomeCategory.find({ });
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

exports.getByIdHomeCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await HomeCategory.findById({ _id: id });
    if(!category){
      res.status(400).send({ message: "Please Check entered id " });
      return;
    }
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

exports.updateHomeCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      name: req.body.name,
      url: req.body.url,
      status: req.body.status,
    };
    const category = await HomeCategory.updateOne({ _id: id }, { $set: data });
    res
      .status(200)
      .send({ message: "Data Updated Successfully!" });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
