const jwt = require("jsonwebtoken");

const { User }= require("../models/model");

const userVerification = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if(!token) {
            res.status(303).json({
                message  : "please login"
            });
        }else {
            const tokenDecode = await jwt.decode(token, "for my fast web project after learn node js");
            const user = await User.findById(tokenDecode.userID);
            if(!user) {
                res.status(404).json({message : "User not found !"})
            }else {
                req.userID = user._id;
                next();
            }
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "server error"});
    }
}

module.exports = userVerification;