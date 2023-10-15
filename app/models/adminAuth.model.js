const mongoose = require("mongoose");

const adminUser = mongoose.model(
  "adminUser",
  new mongoose.Schema(
    {
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      confirmPassword: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        max: 100,
      },
      status: {
        type: Boolean,
        default: true,
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
      profilePic: {
        type: String,
        default:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
      },
    },
    { timestamps: true }
  )
);

module.exports = adminUser;
