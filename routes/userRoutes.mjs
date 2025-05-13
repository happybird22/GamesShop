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

router.get('/isAdmin', auth, adminAuth, async(req, res)=> {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user.admin) {
            return res.status(403).json({ message: 'Access denied. Admins only.'});
        }

        next();
    } catch (err) {
        console.error('Admin middleware error:', err);
        res.status(500).json({ message: 'Server error in admin check' });
    }
});

export default router;