import express from "express";
import commentController from "../controllers/comment.controller";
import auth from "../middlewares/auth";

const router = express.Router();
router.post("/", auth, commentController.createComment);
router.get("/blog/:id", commentController.getComments);
router.post("/reply_comment", auth, commentController.replyComment);
export default router;
