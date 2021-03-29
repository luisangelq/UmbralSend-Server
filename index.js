const express = require("express");
const connectDB = require("./config/db");

//Create server
const app = express();

//Connect Database
connectDB();

//App Port
const port = process.env.PORT || 4000;

//Enable reading values from a body
app.use( express.json());

//App Routes
app.use("/api/users", require("./routes/users"));

//Run App
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is working on ${port} port`);
})