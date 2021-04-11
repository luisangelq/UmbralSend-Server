const Links = require("../models/Links");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const multer = require("multer");
const multerConfiguration = {
  limits: { fileSize: 100000 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../uploads");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
};

const upload = multer(multerConfiguration).single("file");

exports.uploadFile = async (req, res, next) => {
  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.json({ file: req.file.filename });
    } else {
        console.log(error);
        return next();
    }
  });
};

exports.deleteFile = async (req, res) => {};
