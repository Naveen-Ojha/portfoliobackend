const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./adminAuth.model");
db.adminRefreshToken = require("./adminRefreshToken.model");
db.role = require("./role.model");
db.blog = require("./blog.model");
db.blogcategory = require("./blogCategory.model");
db.homecategory = require("./homecategory.model");
db.experience = require("./experience.model");
db.profile = require("./profile.model");
db.about = require("./about.model");
db.contact = require("./contact.model");
db.project = require("./projects.model");
db.service = require("./services.model");
db.testimonial = require("./testimonials.model");
db.skills = require("./skills.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
