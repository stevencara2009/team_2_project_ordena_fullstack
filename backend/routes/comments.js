import { Router } from "express";
import { CommentController } from "../controllers/comments.js";
import { verifyToken } from "../middlewares/auth.js";

export const createCommentRouter = ({ commentModel }) => {
  const commentsRouter = Router();
  const commentController = new CommentController({ commentModel });

  commentsRouter.get("/", commentController.getAll); // público
  commentsRouter.post("/", verifyToken, commentController.create); // solo logueados

  return commentsRouter;
};
