const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Token not provided or not found");
  }
});

module.exports = { protect };
