const multer = require("multer");
const path = require("path");
const blogController = require("../controllers/blog.controller");
const blogCategoryController = require("../controllers/blogCategory.controller");
const homeCategoryController = require("../controllers/homecategory.controller");
const aboutController = require("../controllers/about.controller");
const contactController = require("../controllers/contact.controller");
const experienceController = require("../controllers/experience.controller");
const profileController = require("../controllers/profile.controller");
const projectsController = require("../controllers/projects.controller");
const serviceController = require("../controllers/service.controller");
const testimonialsController = require("../controllers/testimonials.controller");
const skillsController = require("../controllers/skills.controller");
const { verifySignUp } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../upload"),
    filename: function (req, file, cb) {
      // null as first argument means no error
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const storageBlog = multer.diskStorage({
    destination: path.join(__dirname, "../../upload/blog"),
    filename: function (req, file, cb) {
      // null as first argument means no error
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  let uploadBlog = multer({
    storage: storageBlog,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
  });

  // Blog Api

  app.post("/api/blog", uploadBlog.single("images"), blogController.addBlog);
  app.get("/api/blog", blogController.getBlog);
  app.get("/api/blog/pagination", blogController.findBlogPagination);
  app.get("/api/blog/single/:slug", blogController.getBlogBySlug);
  app.patch(
    "/api/blog/:id",
    uploadBlog.single("images"),
    blogController.UpdateBlog
  );
  app.get("/api/blog/:id", blogController.getBlogById);
  app.delete("/api/blog/:id", blogController.deleteBlog);
  app.get("/api/blog/search", blogController.getBlogSearch);

  // Blog Category Api

  app.post("/api/blog/category", blogCategoryController.addBlogCategory);
  app.get("/api/blog/category", blogCategoryController.getBlogCategory);
  app.patch(
    "/api/blog/category/:id",
    blogCategoryController.UpdateBlogCategory
  );
  app.get("/api/blog/category/:id", blogCategoryController.getBlogCategoryById);

  // Home Category Api

  app.post(
    "/api/category",
    [verifySignUp.checkDuplicateHomeCategory],
    homeCategoryController.addHomeCategory
  );
  app.get("/api/category", homeCategoryController.getHomeCategory);
  app.get("/api/category/:id", homeCategoryController.getByIdHomeCategory);
  app.put("/api/category/:id", homeCategoryController.updateHomeCategory);

  // About Api
  app.post("/api/about", aboutController.addAbout);
  app.get("/api/about", aboutController.getAbout);
  app.get("/api/about/:id", aboutController.getAboutById);
  app.delete("/api/about/:id", aboutController.deleteAbout);
  app.patch("/api/about/:id", aboutController.UpdateAbout);

  // Contact Api
  app.post("/api/contact", contactController.addContact);
  app.get("/api/contact", contactController.getContact);

  // Experience Api
  app.post("/api/experience", experienceController.addExperience);
  app.get("/api/experience", experienceController.getExperience);

  // Skills Api
  app.post("/api/skills", skillsController.addSkills);
  app.get("/api/skills", skillsController.getSkills);

  // Profile Api
  app.post("/api/profile", profileController.addProfile);
  app.get("/api/profile", profileController.getProfile);

  // Projects Api
  app.post("/api/projects", projectsController.addProject);
  app.get("/api/projects", projectsController.getProject);

  // Service Api
  app.post("/api/service", serviceController.addService);
  app.get("/api/service", serviceController.getService);

  // Testimonials Api
  app.post("/api/testimonials", testimonialsController.addTestimonial);
  app.get("/api/testimonials", testimonialsController.getTestimonial);
};
