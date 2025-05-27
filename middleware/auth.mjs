import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req, res, next) {
  // get token from header
  let token = req.header("token");

  // check if token exists, if not respond error
  if (!token) {
    res.status(401).json({ msg: "No Token, Auth Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user.id;

    next(); //go to your route
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Invalid Token" });
  }
}