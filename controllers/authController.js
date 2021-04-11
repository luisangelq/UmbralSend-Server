const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

require("dotenv").config({ path: "variables.env" });

exports.authUser = async (req, res, next) => {
  //Show express-validator errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //look for registered user
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  console.log(user);

  if (!user) {
    res.status(401).json({ msg: "User Doesn't Exist" });

    return next();
  }

  //check password and auth the user

  console.log("User exist");
  if (bcrypt.compareSync(password, user.password)) {
    //Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRETKEY,
      {
        expiresIn: "2h",
      }
    );

    res.json({ token });
  } else {
    res.status(401).json({ msg: "Incorrect password" });
    return next();
  }
};

exports.authenticatedUser = (req, res) => {
  res.json({ user: req.user });
};
