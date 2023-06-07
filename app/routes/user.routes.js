const multer = require("multer");
const path = require("path");
const blogController = require("../controllers/blog.controller");
const blogCategoryController = require("../controllers/blogCategory.controller");

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
  app.get("/api/blog/id/:id", blogController.getBlogById);
  app.get("/api/blog/search", blogController.getBlogSearch);

  // Blog Category Api

  app.post("/api/blog/category", blogCategoryController.addBlogCategory);
  app.get("/api/blog/category", blogCategoryController.getBlogCategory);
  app.patch(
    "/api/blog/category/:id",
    blogCategoryController.UpdateBlogCategory
  );
  app.get("/api/blog/category/:id", blogCategoryController.getBlogCategoryById);
};
