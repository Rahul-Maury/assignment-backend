const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  text: String,
  replies: [this] // Reference the same schema for nested comments
});

// const CommentModel = mongoose.model('Comment', commentSchema);

const postSchema = new mongoose.Schema({
  title: String,
  comments: [commentSchema] // Array of comments
});

const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel
