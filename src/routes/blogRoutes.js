import express from "express";
import {
  getBlogs,
  addBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} from "../controllers/blogController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  blogIdValidationRules,
  updateBlogValidationRules,
  validate,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

// Get all blogs by the logged-in user
router.get("/", authenticateToken, getBlogs);

// Create a new blog for the logged-in user
router.post("/", authenticateToken, addBlog);

// Get Blog By Id
router.get(
  "/:id",
  authenticateToken,
  blogIdValidationRules(),
  validate,
  getBlogById
);

// Update Blog By Id
router.put(
  "/:id",
  authenticateToken,
  updateBlogValidationRules(),
  validate,
  updateBlogById
);

// Delete Blog By Id
router.delete(
  "/:id",
  authenticateToken,
  blogIdValidationRules(),
  validate,
  deleteBlogById
);

export default router;
