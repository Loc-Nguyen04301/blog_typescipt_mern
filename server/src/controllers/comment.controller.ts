import { IReqAuth } from "./../config/interface";
import { Response } from "express";
import Comments from "../models/comment.model";

const commentController = {
  createComment: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ message: "invalid Authentication." });

    try {
      const { content, blog_id, blog_user_id } = req.body;

      const newComment = new Comments({
        user: req.user._id,
        content,
        blog_id,
        blog_user_id,
      });

      await newComment.save();

      return res.json(newComment);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default commentController;
