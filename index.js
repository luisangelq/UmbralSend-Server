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
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/files", require("./routes/files"));

//Run App
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is working on ${port} port`);
}) 

//Este es mi comentario a eliminar