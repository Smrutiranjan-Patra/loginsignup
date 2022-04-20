const { UserRegistration, Userlogin, getallusers, generatenewaccessToken } = require('../controller/user.controller');
const router = require('express').Router();


router.post("/register", UserRegistration);
router.post("/login", Userlogin);
router.get("/user", getallusers);
router.get("/newtoken", generatenewaccessToken);

module.exports = router;