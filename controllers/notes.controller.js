const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { User, Note }= require("../models/model");


// =============== regster =================== 

const register = (req, res) => {

    const {id, name , email, password } = req.body;

    if( !id || !name || !email || !password ) {
        res.status(422).json({error : "Fill the fields properly"});
    }else {
        try {
            User.findOne({email : email})
            .then(async existUser => {
                if(existUser){
                    res.status(423).json({error : "Email is already Exist"});
                }else {
                    const hasePassword =  await bcrypt.hashSync(password); 
                    const newUser = new User({id, name , email, password : hasePassword});
                    newUser.save()
                    .then(()=>{
                        res.status(201).json({message : "User created succesful"});
                        console.log("user saved");
                    })
                }
            })
        } catch (error) {
            res.status(500).json({message : "server error"})
        }
    };
    }


//================= Log in =======================

const login = async (req, res) => {

    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(422).json({error : "Fill the fields properly."});
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(422).json({error : "Invalid email and password."});
        }else{
            const chackPassword = await bcrypt.compare(password, user.password);
            if(!chackPassword){
                res.status(422).json({error : "Your password is wrong."});
            }else{
                const token = await jwt.sign({userID : user._id}, process.env.secteateKey, {expiresIn : "3d"});
                res.cookie("token", token, {
                    httpOnly : true,
                    secure : false,
                    maxAge : 3 * 24 * 3600 * 1000
                })
                res.status(200).json({message : "Logein succes", user});
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "server error"});
    }
  
};

// ==================== log out ======================

const LogOut = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({message : "Logout succes"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "server error"});
    }
    
};

// ================== Create Note ===========================

const createNote = async (req,res) => {
    try {
        const userID = req.userID;
        const {title, note} = req.body;
        if(!title || !note) {
            res.status(303).json({
                message : "please write a title and note !"
            });
        }else {
            const newNote = new Note({
                title,
                note,
                userID
            });
            await newNote.save();
            res.status(200).json({
                newNote,
                message : "Note created succsesful"
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "server error"});
    }
};

// ================= update notes ========================

const updateNote = async (req, res) => {
    try {
        const userID = req.userID.toString();
        const noteID = req.params.id;

        const {title, note} = req.body;

        const findNote = await Note.findById({_id: noteID});
        
        if(!findNote) {
            res.status(404).json({message : "Note not found"});
        } else {
            if(userID !== findNote.userID){
                res.status(404).json({message : "unauthorised user"});
            } else {
                const updateNote = await Note.findByIdAndUpdate({_id: noteID},
                    {title, note},
                    {new: true}
                );
                res.status(200).json({message : "Edit succsful"});
            };
        };

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "server error"});
    }
};


// ====================== delete note =======================

const deleteNote = async (req, res) => {
    try {
        const userID = req.userID.toString();
        const noteID = req.params.id;

        const findNote = await Note.findById({_id: noteID});
        if(!findNote) {
            res.status(404).json({message : "Note not found"});
        } else {
            if(userID !== findNote.userID){
                res.status(404).json({message : "unauthorised user"});
            } else {
                const updateNote = await Note.findByIdAndDelete({_id: noteID});
                res.status(200).json({message : "Delete succsful"});
            };
        };

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "server error"});
    };
};

//==================== get notes ======================


const getNotes = async (req, res) =>{
    try {
        const userID = req.userID;
        const notes = await Note.find({userID});
        if(!notes){
            res.status(404).json({message : "Notes not found"});
        }else {
            res.status(200).json(notes);
        }
        

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "server error"});
    }
}

module.exports = {register, login, LogOut, createNote, updateNote, deleteNote, getNotes};