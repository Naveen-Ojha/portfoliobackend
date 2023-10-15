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

exports.getAbout = async (req, res) => {
  try {
    const about = await About.find({}).sort({ _id: -1 });
    res.status(200).json({ message: "Data Fetch Successfully!", data: about });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAboutById = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await About.findOne({ _id: _id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.UpdateAbout = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!req.body) {
      res.status(400).send({ message: "No changes to update." });
      return;
    }

    const about = await About.updateOne(
      { _id },
      {
        $set: {
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
          status: req.body.status,
        },
      },
      {
        new: true,
      }
    );

    if (!about) {
      res.status(400).send({
        message: `Cannot update Data with id=${_id}. Maybe Data was not found!`,
      });
    }
    res.status(200).send({ message: "Data Updated Successfully!", data: about });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteData = await About.deleteOne({ _id: id });

    res.status(200).send({ message: "Data Deleted Successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
