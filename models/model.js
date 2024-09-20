const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date: {
         type: Date,
        default: Date.now 
    }
});

const User = new mongoose.model("Users", userSchema);

const noteSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    userID : {
        type : String,
        required : true
    },
    note : {
        type : String,
        required : true
    },
    date: {
        type: Date,
       default: Date.now 
   }
});

const Note = new mongoose.model("Notes", noteSchema);

module.exports = {User, Note};