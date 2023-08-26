const Post = require("../models/postModule");
const Comment = require("../models/commentModule");

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;

    // Create a new comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    // Save the new comment into the database
    const savedComment = await comment.save();

    // Find the post by id and add the new comment's reference to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments") // Populates the comments array with comment documents
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while creating comment",
    });
  }
};
