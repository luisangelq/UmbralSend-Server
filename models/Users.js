const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name : {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

})

module.exports = mongoose.model("Users", usersSchema);
