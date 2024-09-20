require('dotenv').config()
const app = require("./app");
const dbConnect = require("./config/db"); 
const PORT = process.env.PORT || 4000;



app.listen(PORT, async () => {
    console.log(`server is runing at http://localhost:${PORT}`);
    await dbConnect()
})