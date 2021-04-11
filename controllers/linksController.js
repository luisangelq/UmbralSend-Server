const Links = require("../models/Links");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.newLink = async (req, res, next) => {
  //Show express-validator errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Create a link object
  const { original_name } = req.body;

  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.original_name = original_name;

  //if user is authenticated
  if (req.user) {
    const { password, downloads } = req.body;

    //assing number of downloads
    if (downloads) {
      link.downloads = downloads;
    }

    //assign password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = bcrypt.hashSync(password, salt);
    }

    //asign author
    link.author = req.user.id;
  }

  //Save to DB
  try {
    await link.save();
    return res.json({ msg: `${link.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};
