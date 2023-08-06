const db = require("../models");
const { contact: Contact } = db;

exports.addContact = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new Contact({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      subject: req.body.subject,
      message: req.body.message,
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

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: contact });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
