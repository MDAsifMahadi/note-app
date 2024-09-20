require("dotenv").config();
module.exports = {
    app : process.env.PORT || 4000,
    DB_URL : process.env.DB_URL
}