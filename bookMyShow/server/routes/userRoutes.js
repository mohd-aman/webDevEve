const router = require("express").Router();
const { createUser, readUser } = require("../controllers/userController");

router.post("/register", createUser);
router.post('/login',readUser)

module.exports = router;
