const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.newUser = async (req, res) => {
  //Show express-validator errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Check if the user was already registered
  const { email, password } = req.body;

  let user = await Users.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User is already registered" });
  }

  users = new Users(req.body);

  //hash for password
  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(password, salt);

  try {
    //Save in database
    await users.save();

    res.json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};
