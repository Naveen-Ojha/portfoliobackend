const { verifySignUp } = require("../middlewares");
const adminController = require("../controllers/adminauth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Admin Auth Routes

  app.post(
    "/api/auth/admin/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    adminController.addAdminUser
  );

  app.post("/api/auth/admin/signin", adminController.AdminSignin);

  app.post(
    "/api/auth/admin/refreshtoken",
    adminController.AdminAuthRefreshToken
  );
};
