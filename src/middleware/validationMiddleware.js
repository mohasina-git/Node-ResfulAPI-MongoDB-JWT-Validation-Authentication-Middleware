import { param, body, validationResult } from "express-validator";

export const blogIdValidationRules = () => [
  param("id").isMongoId().withMessage("Blog ID provided is in wrong format"),
];

export const registerUserValidationRules = () => [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Invalid Password: Minimum length of 6"),
];

export const loginUserValidationRules = () => [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email").isEmail().withMessage("Invalid Email"),
];

export const updateBlogValidationRules = () => [
  param("id").isMongoId().withMessage("Invalid Blog ID format"),

  body().custom((body) => {
    if (!body.blog_title && !body.blog_content && !body.status) {
      throw new Error(
        "Supply at least one field: blog_title, blog_content, or status"
      );
    }
    return true;
  }),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};
