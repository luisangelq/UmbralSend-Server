const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("name", "Name Is Required").not().isEmpty(),
    check("email", "Add a Valid Email").isEmail(),
    check("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  usersController.newUser
);

module.exports = router;
