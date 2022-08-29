const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

//@desc       create users
//@route      api/users/register
//@req        name: required, email: required, password: required
const registerUser = asyncHandler(async (req, res) => {
  //check fields
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
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
    email: email,
    role: role,
    password: hashedPassword,
  });
  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//@desc       create users
//@route      api/users/login
//@req        email: required, password: required
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// get user details
const getUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
});

//@desc       generate invite token
//@route      api/users/invite
//@req        name: requireds, email: required, role: optional
const inviteUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, role } = req.body;
  if (!firstName || !lastName || !email) {
    res.status(400);
    throw new Error("Please add necessary details");
  }

  /* const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exsists");
  }
 */
  const invitedUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role ? role : "worker",
  };

  res.status(200).json({
    inviteToken: generateInviteToken(invitedUser),
  });
});

//@desc       register user with invite token
//@route      api/users/register/:invite
//@req        name: optional, email: optional, password: required
const registerInvitedUser = asyncHandler(async (req, res) => {
  // check if invite token is verified with secret
  const decodedUserDetails = jwt.verify(
    req.params.invite,
    process.env.JWT_SECRET
  );

  // check if account exists
  const userExists = await User.findOne({ email: decodedUserDetails.email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exsists");
  }

  // hash password
  const hashedPassword = await hashPassword(req.body.password, 10);

  //create user
  const user = await User.create({
    name: decodedUserDetails.name,
    role: decodedUserDetails.role,
    email: decodedUserDetails.email,
    password: hashedPassword,
  });
  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  res.status(200).json(user);
});

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//generate invite token
const generateInviteToken = (invitedUser) => {
  return jwt.sign(
    {
      firstName: invitedUser.firstName,
      lastName: invitedUser.lastName,
      email: invitedUser.email,
      role: invitedUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const hashPassword = async (password, saltValue) => {
  const salt = await bcrypt.genSalt(saltValue);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  inviteUser,
  registerInvitedUser,
};
