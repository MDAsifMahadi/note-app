const app = require("./app");
const dbConnect = require("./config/db"); 
const PORT = 4000;



app.listen(PORT, async () => {
    console.log(`server is runing at http://localhost:${PORT}`);
    await dbConnect()
})