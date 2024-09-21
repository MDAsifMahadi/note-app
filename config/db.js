const config  = require("./config");
const mongoose = require("mongoose");
const dbConnect = async () => {
    try {
        await mongoose.connect(config.DB_URL);
        console.log("DB connecting succesful");
    } catch (error) {
        console.log("DB connecting failed");
    }
};
module.exports = dbConnect;