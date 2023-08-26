const Post = require("../models/postModule");

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        // Create a new Post object
        const newPost = new Post({
            title,
            body,
        });

        const savedPost = await newPost.save();

        res.json({
            post: savedPost,
        });
    } catch (error) {
        return res.status(400).json({
            error: "Error while creating post",
        });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
      
        const posts = await Post.find().populate("comments").exec();
      

        res.json({
            posts,
        });
    } catch (error) {
        return res.status(400).json({
            error: "Error while getching  post",
        });
    }
};
