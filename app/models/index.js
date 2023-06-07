const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.adminuser = require('./adminAuth.model')
db.adminRefreshToken = require('./adminRefreshToken.model');
db.role = require("./role.model");
db.blog = require('./blog.model');
db.blogcategory = require('./blogCategory.model');

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;