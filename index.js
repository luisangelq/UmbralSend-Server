const express = require("express");

//Create server
const app = express();

console.log("Starting Server");
//App Port
const port = process.env.PORT || 4000;

//Run App
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is working on ${port} port`);
})