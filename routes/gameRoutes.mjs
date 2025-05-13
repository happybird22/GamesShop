import express from "express";
import auth from "../middleware/auth.mjs";
import adminAuth from "../middleware/adminAuth.mjs";
import Game from "../models/gameSchema.mjs";
import gameController from "../controllers/gameController.mjs";

const router = express.Router();

// @route: POST /api/game
// @desc: create game route
// @access: Admin
router.post("/", auth, adminAuth, gameController.createGame);

// @route: GET /api/game
// @desc: Get All Games
// @access: Public
router.get("/", gameController.readGames);

// @route: PUT /api/game/:id
// @desc: Update Game Information
// @access: Admin

// @route: Delete /api/game/:id
// @desc: Delete Game
// @access: Admin

router
  .route("/:id", auth, adminAuth)
  .put(gameController.updatedGame)
  .delete(gameController.deleteGame);

export default router;