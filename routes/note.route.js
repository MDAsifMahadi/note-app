const router = require("express").Router();
const userVerification = require("../middleware/userVerification.js");
const {register, createNote, login, LogOut, updateNote, deleteNote, getNotes} = require("../controllers/notes.controller");


router.post("/create-user/", register);
router.post("/login", login);
router.post("/logout", LogOut);

router.post("/create-note",userVerification, createNote); //ok
router.put("/update-note/:id",userVerification, updateNote); // ok

router.put("/delete-note/:id", userVerification, deleteNote); // ok

router.post("/get-notes", userVerification, getNotes);// ok



module.exports = router;