import express from "express";
import { createComment, delteComment, editComment, getComments, getPostComments, likeComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.get('/getcomments',verifyToken, getComments);
router.put('/like/:commentId', verifyToken, likeComment);
router.put('/edit/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, delteComment);



export default router;
