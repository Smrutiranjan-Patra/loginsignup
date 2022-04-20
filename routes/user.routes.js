const { UserRegistration, Userlogin, getallusers } = require('../controller/user.controller');
const router = require('express').Router();


router.post("/register", UserRegistration);
router.post("/login", Userlogin)
router.get("/user", getallusers)

module.exports = router;