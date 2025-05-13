import express from "express";
import auth from "../middleware/auth.mjs";
import User from "../models/userSchema.mjs";
import userController from "../controllers/userController.mjs";

const router = express.Router();

// @route: POST /api/user/register
// @desc:  register user route
// @access: Public
router.post("/register", userController.register);

// @route: POST /api/user/login
// @desc:  login user route
// @access: Public
router.post("/login", userController.login);

// @route: GET /api/user
// @desc: get user data
// @access: private
router.get("/", auth, userController.getData);

export default router;