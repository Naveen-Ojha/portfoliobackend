const mongoose = require("mongoose");

const Blog = mongoose.model("Blog",
    new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        images: {
            type: String,
            required: true,
            default:"https://www.digitalvidya.com/blog/wp-content/uploads/2019/03/personal-blog-1024x538.jpg"
        },
        category: {
            type: String,
            required: true
        },
        author: {
            type: String,
            default:"Naveen Ojha"
        }
    }, { timestamps: true })
)

module.exports = Blog;