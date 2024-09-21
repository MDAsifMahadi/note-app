const router = require("express").Router();
const userVerification = require("../middleware/userVerification.js");
const {register, createNote, login, LogOut, updateNote, deleteNote, getNotes} = require("../controllers/notes.controller");


router.post("/create-user/", register);
router.post("/login", login);
router.post("/logout", LogOut);

router.post("/create-note",userVerification, createNote);
router.put("/update-note/:id",userVerification, updateNote);

router.delete("/delete-note/:id", userVerification, deleteNote);

router.get("/get-notes", userVerification, getNotes);



module.exports = router;