const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/note.route");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(cookieParser());

app.use("/api/", router);



module.exports = app;