import express from "express";
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

export default router;