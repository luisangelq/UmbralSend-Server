const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

  if (authHeader) {
    //get token
    const token = authHeader.split(" ")[1];

    //verify JWT
    try {
      const user = jwt.verify(token, process.env.SECRETKEY);

      req.user = user
      
    } catch (error) {
      console.log(error);
    }
  }

  return next();
}