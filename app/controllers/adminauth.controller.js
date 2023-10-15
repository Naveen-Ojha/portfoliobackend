const config = require("../config/auth.config");
const db = require("../models");
const { user: User, adminRefreshToken: AdminRefreshToken, role: Role } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.addAdminUser = (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    res.status(400).send({ message: "Please fill the required filled." });
    return;
  }

  const user = new User({
    email: req.body.email,
    name: req.body.name,
    status: req.body.status,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),
  });

  if (req.body.password !== req.body.confirmPassword) {
    res
      .status(400)
      .send({ message: "Password and confirm password does not match." });
    return;
  }

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      console.log("req.body.roles", req.body.roles);
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          console.log(roles);
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        console.log("roles", user.roles);
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.AdminSignin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!admin) {
      return res
        .status(404)
        .send({ message: "Email or Passwrod does not match." });
    }

    if (!req.body.password) {
      return res.status(404).send({ message: "Please Enter Your Password." });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const roleId = admin.roles.map((role) => role._id);
    Role.find({ _id: roleId[0] }).then(async (roles) => {
      let token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          status: admin.status,
          name: admin.name,
          role: roles[0].name,
          profie:admin.profilePic
        },
        config.secret,
        {
          expiresIn: config.jwtExpiration,
        }
      );

      let refreshToken = await AdminRefreshToken.createToken(admin);

      res.status(200).send({
        access: token,
        refresh: refreshToken,
        message: "Login Successfully!",
      });
    });
  });
};

exports.AdminAuthRefreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await AdminRefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (AdminRefreshToken.verifyExpiration(refreshToken)) {
      AdminRefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    User.findById(refreshToken.admin._id).exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      let newAccessToken = jwt.sign(
        {
          id: refreshToken.admin._id,
          email: admin.email,
          status: admin.status,
          name: admin.name,
        },
        config.secret,
        {
          expiresIn: config.jwtExpiration,
        }
      );

      return res.status(200).json({
        access: newAccessToken,
        refresh: refreshToken.token,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};
