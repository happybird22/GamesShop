import User from "../models/userSchema.mjs";
import Cart from "../models/cartSchema.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let register = async (req, res) => {
  //Destructure the req.body (opt)
  const { username, email, password } = req.body;

  // Check user submitted all necessary data, if not return
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    // If exists, return with error
    if (user) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // Create a new user, do not save to DB just yet
    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    //Save user to create unique mongoDB _id
    await user.save();

    // Create users cart, pass in userID for user Property
    const cart = new Cart({ user: user._id, items: [] });
    // Save cart to DB, to create unique mongoDB _id for cart
    await cart.save();

    //update user with cart ID reference, and save
    user.cart = cart._id;
    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

let login = async (req, res) => {
  const { email, password } = req.body;

  // make sure req.body has email & password
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // check if user exists in db
    let user = await User.findOne({ email });
    // if they do NOT exist, return with error
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Check to see if password matches, if not return error
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // create our payload - userId
    const payload = {
      user: {
        id: user._id,
      },
    };

    // create a JWT
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;

        // send jwt to FrontEnd
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

let getData = async (req, res) => {
  let user = await User.findById(req.user)
    .select("-password")
    .populate({ path: "cart", populate: {path: 'items', populate: 'game'} });

  res.json(user);
};

export default { register, login, getData };