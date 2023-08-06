const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const HomeCategory = db.homecategory;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    number: req.body.number,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

checkDuplicateHomeCategory = (req, res, next) => {
  // HomeCategory
  HomeCategory.findOne({
    name: req.body.name,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res
        .status(400)
        .send({ message: "Failed! category name is already in use!" });
      return;
    }

    // Email
    HomeCategory.findOne({
      url: req.body.url,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! url is already in use!" });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkDuplicateHomeCategory,
};

module.exports = verifySignUp;
