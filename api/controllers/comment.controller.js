import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {

    try {
        const { content, postId, userId } = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to create this comment.'))
        };

        const newComment = new Comment({
            content,
            postId,
            userId,
        });

        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }


};

export const getPostComments = async (req, res, next) => {
    const { postId } = req.params;

    try {
        const comments = await Comment
            .find({ postId })
            .sort({ createdAt: -1 });


        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }

};

export const likeComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found.'))
        };

        const userIndex = comment.likes.indexOf(userId);

        if (userIndex === -1) {
            comment.numberOfLikes++;
            comment.likes.push(userId);
        } else {
            comment.numberOfLikes--;
            comment.likes.splice(userIndex, 1);
        };

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }

};


export const editComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const content = req.body.content;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found.'));
        }

        if (comment.userId !== userId && !isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit this comment'))
        }

        const editedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        );

        res.status(200).json(editedComment);
    } catch (error) {
        next(error);
    }


};


export const delteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return next(errorHandler(404, 'Comment not found.'))
        };

        if (comment.userId !== userId && !isAdmin) {
            return next(errorHandler(404, 'You are not allowed to delete this comment.'))
        };

        await comment.findByIdAndDelete(commentId);
        res.status(200).json('Comment has been deleted!');
    } catch (error) {
        next(error);
    }
};