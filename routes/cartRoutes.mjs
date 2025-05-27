import express from "express";
import auth from "../middleware/auth.mjs";
import User from "../models/userSchema.mjs";
import Cart from "../models/cartSchema.mjs";

const router = express.Router();

// @route: POST /api/cart/:id
// @desc: changins items in cart
// @access: Private
router.post("/:id", auth, async (req, res) => {
  try {
    const userID = req.user;
    const gameID = req.params.id;

    const user = await User.findById({ _id: userID }).select("cart");

    if (!user) return res.status(400).json({ msg: "User Not Found" });

    const cart = await Cart.findById({ _id: user.cart });

    if (cart.items.length == 0 && req.body.qty > 0) {
      cart.items.push({ game: gameID, qty: req.body.qty });
    } else if (cart.items.length == 0 && req.body.qty < 0) {
      return res.status(400).json({ msg: "Cannot subtract past 0" });
    }

    let indexOf = cart.items.findIndex((obj) => obj.game == gameID);

    if (indexOf == -1) {
      cart.items.push({ game: gameID, qty: req.body.qty });
    } else {
      cart.items[indexOf].qty += req.body.qty;

      if (cart.items[indexOf].qty <= 0) {
        cart.items.splice(indexOf, 1);
      }
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//get items in cart
router.get("/", auth, async (req, res) => {
  try {
    const userID = req.user;
    const user = await User.findById({ _id: userID }).select("cart");

    if (!user) return res.status(400).json({ msg: "User Not Found" });

    const cart = await Cart.findById({ _id: user.cart }).populate(
      "items.game",
      "title price desc"
    );

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;