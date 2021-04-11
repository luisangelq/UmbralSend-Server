const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post("/",
    [
        check("email", "Add A Valid Email").isEmail(),
        check("password", "Password Cannot Be Empty").not().isEmpty()
    ],
    authController.authUser
);

router.get("/",
    auth,
    authController.authenticatedUser
);

module.exports = router;