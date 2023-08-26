const express = require("express");
const router = express.Router();

// Import controllers


const {dummyLink , likePost,unlikePost} = require("../controllers/LikeController")
const { createComment } = require("../controllers/commentController.js");
const { createPost } = require("../controllers/Postcontroller");
const {getAllPosts} = require ("../controllers/Postcontroller")

// Mapping Controller
router.get("/dummyroute", dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
// Define API routes

// Get all todos



module.exports = router;
