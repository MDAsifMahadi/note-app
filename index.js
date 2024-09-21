const config = require("./config/config");
const app = require("./app");
const dbConnect = require("./config/db"); 
const PORT = config.app;



app.listen(PORT, async () => {
    console.log(`server is runing at http://localhost:${PORT}`);
    await dbConnect()
})