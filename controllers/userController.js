const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const { json } = require("express");

const registerUser = asyncHandler(async (req, res) => {
  //check fields
  const { name, email, password, farm, isOwner } = req.body;
  if (!name || !email || !password || !farm || !isOwner) {
    res.status(400);
    throw new Error("Please add necessary details");
  }

  //check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exsists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name: name,
    farm: farm,
    isOwner: isOwner,
    email: email,
    password: hashedPassword,
  });
  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      isOwner: isOwner,
      farm: farm,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
});

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
