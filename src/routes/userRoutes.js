import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import {
  registerUserValidationRules,
  loginUserValidationRules,
  validate,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerUserValidationRules(), validate, registerUser);
router.post("/login", loginUserValidationRules(), validate, loginUser);

export default router;
