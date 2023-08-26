const Post = require("../models/postModule");
const Like = require("../models/likeModule");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // Create a new like object
    const like = new Like({
      post,
      user,
    });

    // Save the new like into the database
    const savedLike = await like.save();

    // Find the post by id and add the new like's reference to its likes array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while liking post",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    // Find and delete the like document
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    // Update the post collection to remove the reference to the deleted like
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } }, // Use $pull to remove the reference from the array
      { new: true }
    );

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while unliking post",
    });
  }
};

exports.dummyLink = (req, res) => {
  res.send("This is your dummy page");
};
