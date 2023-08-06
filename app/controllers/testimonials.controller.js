const db = require("../models");
const { testimonial: Testimonial } = db;

exports.addTestimonial = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Please fill all required fields" });
      return;
    }
    const data = new Testimonial({
      title: req.body.title,
      name: req.body.name,
      desgination: req.body.desgination,
      image: req.body.image,
      description: req.body.description,
      rating: req.body.rating,
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

exports.getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.find({ status: true });
    res
      .status(200)
      .send({ message: "Data Fetch Successfully!", data: testimonial });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong please try again after sometime.",
      error,
    });
  }
};
